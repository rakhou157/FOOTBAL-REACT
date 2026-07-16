import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PlayerList from '../Components/PlayerList';
import SearchBar from '../Components/SearchBar';
import PlayerForm from '../Components/PlayerForm';
import { Player, PlayerFormData } from '../Types/Player';
import { updatePlayer } from '../Services/playerService';
import { usePlayers } from '../hooks/usePlayers';

function Players() {
  const { filteredPlayers, query, setQuery, position, setPosition, refresh, deletePlayer } = usePlayers();
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);

  function handleUpdate(data: PlayerFormData) {
    if (!editingPlayer) return;
    updatePlayer(editingPlayer.id, data);
    refresh();
    setEditingPlayer(null);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">Effectif</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{filteredPlayers.length} joueur(s) affiché(s)</p>
        </div>
        <Link
          to="/ajouter"
          className="inline-flex items-center gap-2 bg-senegal-green text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-senegal-green/90 hover:scale-[1.02] active:scale-[0.98] transition-all w-fit"
        >
          <Plus className="w-4 h-4" />
          Ajouter un joueur
        </Link>
      </div>

      <AnimatePresence>
        {editingPlayer && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mb-8 overflow-hidden"
          >
            <h2 className="font-display font-semibold text-gray-900 dark:text-white mb-3">
              Modifier {editingPlayer.name}
            </h2>
            <PlayerForm initialData={editingPlayer} onSubmit={handleUpdate} submitLabel="Mettre à jour" />
            <button
              onClick={() => setEditingPlayer(null)}
              className="mt-3 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              Annuler la modification
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchBar query={query} onQueryChange={setQuery} position={position} onPositionChange={setPosition} />

      <PlayerList players={filteredPlayers} onEdit={setEditingPlayer} onDelete={deletePlayer} />
    </div>
  );
}

export default Players;