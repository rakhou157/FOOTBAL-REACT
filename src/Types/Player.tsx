export type Position = 'Gardien' | 'Défenseur' | 'Milieu' | 'Attaquant';

export interface Player {
  id: number;
  name: string;
  position: Position;
  number: number;
  age: number;
  club: string;
  nationality: string;
  goals: number;
  assists: number;
  matches: number;
  photo: string;
}

export interface PlayerFormData {
  name: string;
  position: Position;
  number: number;
  age: number;
  club: string;
  nationality: string;
  goals: number;
  assists: number;
  matches: number;
}
