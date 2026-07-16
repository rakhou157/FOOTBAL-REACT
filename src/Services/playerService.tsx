import { Player, PlayerFormData } from '../Types/Player';
import initialPlayers from '../Data/players';

const STORAGE_KEY = 'lions-du-senegal-players';

function readStorage(): Player[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialPlayers));
    return initialPlayers;
  }
  try {
    return JSON.parse(raw) as Player[];
  } catch {
    return initialPlayers;
  }
}

function writeStorage(players: Player[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
}

export function getPlayers(): Player[] {
  return readStorage();
}

export function getPlayerById(id: number): Player | undefined {
  return readStorage().find((p) => p.id === id);
}

export function addPlayer(data: PlayerFormData): Player {
  const players = readStorage();
  const nextId = players.length > 0 ? Math.max(...players.map((p) => p.id)) + 1 : 1;
  const newPlayer: Player = { id: nextId, photo: '', ...data };
  const updated = [...players, newPlayer];
  writeStorage(updated);
  return newPlayer;
}

export function updatePlayer(id: number, data: PlayerFormData): void {
  const players = readStorage();
  const updated = players.map((p) => (p.id === id ? { ...p, ...data } : p));
  writeStorage(updated);
}

export function deletePlayer(id: number): void {
  const players = readStorage();
  writeStorage(players.filter((p) => p.id !== id));
}
