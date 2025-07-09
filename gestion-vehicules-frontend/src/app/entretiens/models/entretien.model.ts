export interface Entretien {
  id?: number;
  vehicule_id: number;
  type_entretien: string;
  description?: string;
  date_prevue: string;
  date_reelle?: string;
  cout?: number;
  kilometrage?: number;
  statut: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
  vehicule?: {
    id: number;
    marque: string;
    modele: string;
    immatriculation: string;
  };
}