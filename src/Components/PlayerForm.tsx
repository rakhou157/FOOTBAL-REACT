import { useState, FormEvent } from 'react';
import { Player, PlayerFormData, Position } from '../Types/Player';

interface PlayerFormProps {
  initialData?: Player;
  onSubmit: (data: PlayerFormData) => void;
  submitLabel?: string;
}

const positions: Position[] = ['Gardien', 'Défenseur', 'Milieu', 'Attaquant'];

const emptyForm: PlayerFormData = {
  name: '',
  position: 'Milieu',
  number: 1,
  age: 18,
  club: '',
  nationality: 'Sénégal',
  goals: 0,
  assists: 0,
  matches: 0,
};

function PlayerForm({ initialData, onSubmit, submitLabel = 'Enregistrer' }: PlayerFormProps) {
  const [form, setForm] = useState<PlayerFormData>(
    initialData
      ? {
          name: initialData.name,
          position: initialData.position,
          number: initialData.number,
          age: initialData.age,
          club: initialData.club,
          nationality: initialData.nationality,
          goals: initialData.goals,
          assists: initialData.assists,
          matches: initialData.matches,
        }
      : emptyForm
  );

  function handleChange(field: keyof PlayerFormData, value: string | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  const inputClasses =
    'w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-senegal-green/50 focus:border-senegal-green text-sm transition-colors';
  const labelClasses = 'text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block';

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 space-y-5 transition-colors">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClasses}>Nom complet</label>
          <input
            required
            type="text"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={inputClasses}
            placeholder="Ex : Sadio Mané"
          />
        </div>

        <div>
          <label className={labelClasses}>Club</label>
          <input
            required
            type="text"
            value={form.club}
            onChange={(e) => handleChange('club', e.target.value)}
            className={inputClasses}
            placeholder="Ex : Al-Nassr"
          />
        </div>

        <div>
          <label className={labelClasses}>Poste</label>
          <select
            value={form.position}
            onChange={(e) => handleChange('position', e.target.value)}
            className={inputClasses}
          >
            {positions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClasses}>Nationalité</label>
          <input
            required
            type="text"
            value={form.nationality}
            onChange={(e) => handleChange('nationality', e.target.value)}
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>Numéro de maillot</label>
          <input
            required
            type="number"
            min={1}
            max={99}
            value={form.number}
            onChange={(e) => handleChange('number', Number(e.target.value))}
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>Âge</label>
          <input
            required
            type="number"
            min={15}
            max={45}
            value={form.age}
            onChange={(e) => handleChange('age', Number(e.target.value))}
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>Matchs joués</label>
          <input
            type="number"
            min={0}
            value={form.matches}
            onChange={(e) => handleChange('matches', Number(e.target.value))}
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>Buts</label>
          <input
            type="number"
            min={0}
            value={form.goals}
            onChange={(e) => handleChange('goals', Number(e.target.value))}
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>Passes décisives</label>
          <input
            type="number"
            min={0}
            value={form.assists}
            onChange={(e) => handleChange('assists', Number(e.target.value))}
            className={inputClasses}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto px-6 py-2.5 bg-senegal-green text-white font-medium rounded-lg hover:bg-senegal-green/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
      >
        {submitLabel}
      </button>
    </form>
  );
}

export default PlayerForm;