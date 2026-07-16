import { useEffect, useMemo, useState } from 'react';
import { Users, Target, Handshake, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import StatsCard from '../Components/StatsCard';
import { Player } from '../Types/Player';
import { getPlayers } from '../Services/playerService';
import { useTheme } from '../Context/ThemeContext';

const COLORS = ['#FDEF42', '#00853F', '#3B82F6', '#E31B23'];

function Dashboard() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    setPlayers(getPlayers());
  }, []);

  const totalGoals = useMemo(() => players.reduce((sum, p) => sum + p.goals, 0), [players]);
  const totalAssists = useMemo(() => players.reduce((sum, p) => sum + p.assists, 0), [players]);
  const totalMatches = useMemo(() => players.reduce((sum, p) => sum + p.matches, 0), [players]);

  const positionData = useMemo(() => {
    const counts: Record<string, number> = { Gardien: 0, Défenseur: 0, Milieu: 0, Attaquant: 0 };
    players.forEach((p) => {
      counts[p.position] += 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [players]);

  const topScorers = useMemo(
    () => [...players].sort((a, b) => b.goals - a.goals).slice(0, 6),
    [players]
  );

  const barData = topScorers.map((p) => ({ name: p.name.split(' ').slice(-1)[0], buts: p.goals, passes: p.assists }));
  const gridColor = theme === 'dark' ? '#374151' : '#f0f0f0';
  const tickColor = theme === 'dark' ? '#9CA3AF' : '#6B7280';

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-1">Dashboard</h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
        Vue d'ensemble de l'équipe des Lions du Sénégal
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatsCard label="Joueurs" value={players.length} icon={Users} accent="green" delay={0} />
        <StatsCard label="Buts marqués" value={totalGoals} icon={Target} accent="red" delay={0.05} />
        <StatsCard label="Passes décisives" value={totalAssists} icon={Handshake} accent="yellow" delay={0.1} />
        <StatsCard label="Matchs joués" value={totalMatches} icon={Trophy} accent="green" delay={0.15} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 transition-colors"
        >
          <h2 className="font-display font-semibold text-gray-900 dark:text-white mb-1">Répartition par poste</h2>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
            Cliquez sur une part pour la mettre en évidence
          </p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={positionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  onClick={(_, index) => setActiveIndex(activeIndex === index ? null : index)}
                >
                  {positionData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke={theme === 'dark' ? '#111827' : '#fff'}
                      strokeWidth={activeIndex === index ? 3 : 1}
                      style={{
                        opacity: activeIndex === null || activeIndex === index ? 1 : 0.4,
                        cursor: 'pointer',
                        transition: 'opacity 0.2s ease',
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 transition-colors"
        >
          <h2 className="font-display font-semibold text-gray-900 dark:text-white mb-4">
            Buts &amp; passes — top buteurs
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="name" tick={{ fill: tickColor, fontSize: 12 }} />
                <YAxis tick={{ fill: tickColor, fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#1F2937' : '#fff',
                    border: 'none',
                    borderRadius: 8,
                    color: theme === 'dark' ? '#fff' : '#111827',
                  }}
                />
                <Legend />
                <Bar dataKey="buts" fill="#00853F" radius={[4, 4, 0, 0]} />
                <Bar dataKey="passes" fill="#FDEF42" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;