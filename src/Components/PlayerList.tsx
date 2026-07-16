import { AnimatePresence } from 'framer-motion';
import { Player } from '../Types/Player';
import PlayerCard from './PlayerCard';
// @ts-ignore: import of CSS module for side-effects (no type declarations)

interface PlayerListProps {
  players: Player[];
  onEdit: (player: Player) => void;
  onDelete: (id: number) => void;
}

function PlayerList({ players, onEdit, onDelete }: PlayerListProps) {
  if (players.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400 dark:text-gray-600">
        <p className="font-medium">Aucun joueur ne correspond à votre recherche.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <AnimatePresence>
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </AnimatePresence>
    </div>
  );
}

export default PlayerList;