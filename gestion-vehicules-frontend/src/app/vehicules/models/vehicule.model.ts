export interface Vehicule {
  id?: number;
  marque: string;
  modele: string;
  immatriculation: string;
  annee: number;
  date_achat?: string;
  kilometrage?: number;
  carburant_type?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
  type: string;          // Champ obligatoire
  customType?: string;   // Optionnel - seulement si type = 'autre'
}
