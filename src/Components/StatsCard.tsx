import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  accent?: 'green' | 'yellow' | 'red';
  delay?: number;
}

const accentStyles: Record<string, string> = {
  green: 'bg-senegal-green/10 text-senegal-green',
  yellow: 'bg-yellow-400/20 text-yellow-600 dark:text-yellow-400',
  red: 'bg-senegal-red/10 text-senegal-red',
};

function StatsCard({ label, value, icon: Icon, accent = 'green', delay = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      whileHover={{ y: -3 }}
      className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-5 flex items-center gap-4 transition-colors"
    >
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${accentStyles[accent]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-2xl font-display font-bold text-gray-900 dark:text-white">{value}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      </div>
    </motion.div>
  );
}

export default StatsCard;