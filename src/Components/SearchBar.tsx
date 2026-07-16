import { Search } from 'lucide-react';
import { Position } from '../Types/Player';

interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  position: Position | 'Tous';
  onPositionChange: (value: Position | 'Tous') => void;
}

const positions: (Position | 'Tous')[] = ['Tous', 'Gardien', 'Défenseur', 'Milieu', 'Attaquant'];

function SearchBar({ query, onQueryChange, position, onPositionChange }: SearchBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Rechercher un joueur par nom ou club..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-senegal-green/50 focus:border-senegal-green text-sm transition-colors"
        />
      </div>
      <select
        value={position}
        onChange={(e) => onPositionChange(e.target.value as Position | 'Tous')}
        className="px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-senegal-green/50 focus:border-senegal-green text-sm transition-colors"
      >
        {positions.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SearchBar;