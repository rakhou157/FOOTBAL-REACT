import { useEffect, useMemo, useState } from 'react';
import { Player, Position } from '../Types/Player';
import { getPlayers, deletePlayer as removePlayer } from '../Services/playerService';

// Hook personnalisé : centralise le chargement, la recherche et le filtrage des joueurs
export function usePlayers() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [query, setQuery] = useState<string>('');
  const [position, setPosition] = useState<Position | 'Tous'>('Tous');

  useEffect(() => {
    setPlayers(getPlayers());
  }, []);

  function refresh() {
    setPlayers(getPlayers());
  }

  function deletePlayer(id: number) {
    removePlayer(id);
    refresh();
  }

  const filteredPlayers = useMemo(() => {
    return players.filter((p) => {
      const matchesQuery =
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.club.toLowerCase().includes(query.toLowerCase());
      const matchesPosition = position === 'Tous' || p.position === position;
      return matchesQuery && matchesPosition;
    });
  }, [players, query, position]);

  return { players, filteredPlayers, query, setQuery, position, setPosition, refresh, deletePlayer };
}