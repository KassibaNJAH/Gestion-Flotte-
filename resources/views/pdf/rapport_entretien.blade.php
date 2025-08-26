<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Rapport d'entretien</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; }
        .header { text-align: center; margin-bottom: 20px; }
        h1 { font-size: 18px; }
        .table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        .table th, .table td { border: 1px solid #ddd; padding: 8px; }
        .table th { background-color: #f2f2f2; }
        .text-right { text-align: right; }
        .footer { margin-top: 30px; font-size: 12px; text-align: right; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Rapport des coûts d'entretien</h1>
        <p>Période du {{ $filtres['date_debut'] ?? '-' }} au {{ $filtres['date_fin'] ?? '-' }}</p>
    </div>

    <table class="table">
        <thead>
            <tr>
                <th>Véhicule</th>
                <th>Type entretien</th>
                <th>Date</th>
                <th class="text-right">Coût (TND)</th>
                <th>Statut</th>
            </tr>
        </thead>
        <tbody>
            @foreach($entretiens as $entretien)
            <tr>
                <td>{{ $entretien->vehicule->marque }} {{ $entretien->vehicule->modele }}</td>
                <td>{{ $entretien->type_entretien }}</td>
                <td>{{ date('d/m/Y', strtotime($entretien->date_reelle)) }}</td>
                <td class="text-right">{{ number_format($entretien->cout, 2, ',', ' ') }}</td>
                <td>{{ ucfirst($entretien->statut) }}</td>
            </tr>
            @endforeach
        </tbody>
        <tfoot>
            <tr>
                <td colspan="3"><strong>Total</strong></td>
                <td class="text-right"><strong>{{ number_format($total_cout, 2, ',', ' ') }} €</strong></td>
                <td></td>
            </tr>
        </tfoot>
    </table>

    <div class="footer">
        Généré le {{ $date_generation }}
    </div>
</body>
</html>