export interface ControleTechnique {
  id?: number;
  vehicule_id: number;
  date_controle: string;
  date_prochaine_controle: string;
  resultat: 'favorable' | 'défavorable';
  centre_controle: string;
  notes?: string;
  vehicule?: {
    id: number;
    marque: string;
    modele: string;
    immatriculation: string;
  };
}