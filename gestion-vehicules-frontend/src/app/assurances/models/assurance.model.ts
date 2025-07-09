export interface Assurance {
  id?: number;
  vehicule_id: number;
  numero_contrat: string;
  assureur: string;
  date_debut: string;
  date_fin: string;
  prix: number;
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