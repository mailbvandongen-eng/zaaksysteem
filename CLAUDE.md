# Zaaksysteem Ketenvisualisatie - Gemeente Westland

## Changelog bijwerken (VERPLICHT)

Bij **elke wijziging** aan de website moet de changelog worden bijgewerkt in `js/changelog.js`.

### Hoe:
1. Open `js/changelog.js`
2. Voeg bovenaan de `changelog` array een nieuwe entry toe voor de datum van vandaag (of voeg toe aan de bestaande entry als er al een is voor vandaag)
3. Beschrijf in gewoon Nederlands wat er is veranderd

### Voorbeeld:
```js
{
    datum: "2026-02-04",
    wijzigingen: [
        "Schuldhulpverlening (Stratech Perspectief Cloud) toegevoegd aan de roadmap"
    ]
},
```

### Regels:
- Datum formaat: `YYYY-MM-DD`
- De nieuwste datum staat altijd bovenaan
- Beschrijvingen in B1 Nederlands
- De "Stand van zaken" link in de footer toont automatisch de laatste datum
- Bij klikken opent een overlay met de volledige geschiedenis
