export interface AlerteAssurance {
  id: number;
  vehicule: string;
  immatriculation: string;
  date_fin: string;
  jours_restants: number;
  assureur: string;
  type: 'expiring_soon' | 'expired';
}