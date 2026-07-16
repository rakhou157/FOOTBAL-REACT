import { Trash2, Pencil, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Player } from '../Types/Player';
// @ts-ignore: CSS import without module declarations

interface PlayerCardProps {
  player: Player;
  onEdit: (player: Player) => void;
  onDelete: (id: number) => void;
}

const positionColors: Record<string, string> = {
  Gardien: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-400/10 dark:text-yellow-400',
  Défenseur: 'bg-blue-100 text-blue-700 dark:bg-blue-400/10 dark:text-blue-400',
  Milieu: 'bg-senegal-green/10 text-senegal-green',
  Attaquant: 'bg-senegal-red/10 text-senegal-red',
};

function PlayerCard({ player, onEdit, onDelete }: PlayerCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-5 flex flex-col gap-3 hover:shadow-md transition-colors"
    >
      <div className="flex items-start justify-between">
        <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 overflow-hidden">
          {player.photo ? (
            <img
              src={player.photo}
              alt={player.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <User className={`w-7 h-7 ${player.photo ? 'hidden' : ''}`} />
        </div>
        <span className="text-3xl font-display font-bold text-gray-200 dark:text-gray-700">#{player.number}</span>
      </div>

      <div>
        <h3 className="font-display font-semibold text-gray-900 dark:text-white">{player.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{player.club}</p>
      </div>

      <span className={`self-start text-xs font-medium px-2.5 py-1 rounded-full ${positionColors[player.position]}`}>
        {player.position}
      </span>

      <div className="grid grid-cols-3 gap-2 text-center border-t border-gray-100 dark:border-gray-800 pt-3">
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{player.matches}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Matchs</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{player.goals}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Buts</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{player.assists}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Passes</p>
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          onClick={() => onEdit(player)}
          className="flex-1 flex items-center justify-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <Pencil className="w-4 h-4" />
          Modifier
        </button>
        <button
          onClick={() => onDelete(player.id)}
          className="flex-1 flex items-center justify-center gap-1.5 text-sm font-medium text-senegal-red border border-senegal-red/30 rounded-lg py-2 hover:bg-senegal-red/5 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Supprimer
        </button>
      </div>
    </motion.div>
  );
}

export default PlayerCard;