import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PlayerForm from '../Components/PlayerForm';
import { addPlayer } from '../Services/playerService';
import { PlayerFormData } from '../Types/Player';

function AddPlayer() {
  const navigate = useNavigate();

  function handleSubmit(data: PlayerFormData) {
    addPlayer(data);
    navigate('/joueurs');
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto px-4 py-12"
    >
      <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-1">Ajouter un joueur</h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
        Renseignez les informations du joueur pour l'ajouter à l'effectif.
      </p>
      <PlayerForm onSubmit={handleSubmit} submitLabel="Ajouter le joueur" />
    </motion.div>
  );
}

export default AddPlayer;