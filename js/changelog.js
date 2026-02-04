// Changelog - Stand van zaken
// Bij elke wijziging aan de site: voeg een entry toe aan changelog hieronder

const changelog = [
    {
        datum: "2026-02-04",
        wijzigingen: [
            "Schuldhulpverlening (Stratech Perspectief Cloud) toegevoegd aan de roadmap",
            "Stand van zaken met wijzigingsgeschiedenis toegevoegd aan de footer"
        ]
    },
    {
        datum: "2026-01-30",
        wijzigingen: [
            "Stappenplan voor omzetten formulieren naar zaaksysteem toegevoegd",
            "Word overdrachtsdocument sjabloon beschikbaar als download",
            "PIP pagina: credentials geblurred met notitie",
            "Intro sectie opgeschoond (iconen verwijderd, kop kleiner)",
            "Diverse tekstuele verbeteringen"
        ]
    },
    {
        datum: "2026-01-29",
        wijzigingen: [
            "Website gelanceerd",
            "Overzichtspagina met interactieve ketenvisualisatie",
            "Perspectief pagina's: Behandelaar, Aanvrager, KCC",
            "De 7 Vinkjes (Ketenafstemming) pagina",
            "PIP pagina met testomgeving informatie",
            "Systemen overzicht pagina",
            "Roadmap Optimalisatie Dienstverlening"
        ]
    }
];

// Format datum naar leesbaar Nederlands
function formatDatum(dateStr) {
    const maanden = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
    const d = new Date(dateStr + 'T00:00:00');
    return d.getDate() + ' ' + maanden[d.getMonth()] + ' ' + d.getFullYear();
}

// Maak de footer "Stand van zaken" link en overlay
function initChangelog() {
    const footer = document.querySelector('footer p');
    if (!footer) return;

    const laatsteDatum = formatDatum(changelog[0].datum);

    // Voeg link toe aan footer
    const standLink = document.createElement('span');
    standLink.id = 'stand-van-zaken';
    standLink.innerHTML = ' &middot; Bijgewerkt: ' + laatsteDatum;
    standLink.style.cssText = 'cursor:pointer; text-decoration:underline; text-decoration-style:dotted; opacity:0.85;';
    standLink.title = 'Bekijk wijzigingsgeschiedenis';
    footer.appendChild(standLink);

    // Maak overlay
    const overlay = document.createElement('div');
    overlay.id = 'changelog-overlay';
    overlay.style.cssText = 'display:none; position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:2000; justify-content:center; align-items:center;';

    let html = '<div style="background:white; border-radius:12px; max-width:600px; width:90%; max-height:80vh; overflow-y:auto; padding:2rem; position:relative;">';
    html += '<button id="changelog-close" style="position:absolute; top:1rem; right:1rem; background:none; border:none; font-size:1.5rem; cursor:pointer; color:#666;">&times;</button>';
    html += '<h3 style="color:#44772C; margin-bottom:0.5rem; font-size:1.1rem;">Wijzigingsgeschiedenis</h3>';
    html += '<p style="color:#666; font-size:0.85rem; margin-bottom:1.5rem;">Alle aanpassingen aan deze website</p>';

    changelog.forEach(function(entry, i) {
        const isLaatste = i === 0;
        html += '<div style="margin-bottom:1.5rem; padding-left:1.5rem; border-left:3px solid ' + (isLaatste ? '#74B943' : '#e9ecef') + ';">';
        html += '<div style="font-weight:600; color:' + (isLaatste ? '#44772C' : '#333') + '; margin-bottom:0.5rem; font-size:0.95rem;">';
        html += formatDatum(entry.datum);
        if (isLaatste) html += ' <span style="background:#f0f7ed; color:#44772C; padding:0.15rem 0.5rem; border-radius:3px; font-size:0.75rem; font-weight:500;">Laatste</span>';
        html += '</div>';
        html += '<ul style="margin:0; padding-left:1.25rem;">';
        entry.wijzigingen.forEach(function(w) {
            html += '<li style="color:#555; font-size:0.875rem; margin-bottom:0.35rem;">' + w + '</li>';
        });
        html += '</ul></div>';
    });

    html += '</div>';
    overlay.innerHTML = html;
    document.body.appendChild(overlay);

    // Event handlers
    standLink.addEventListener('click', function() {
        overlay.style.display = 'flex';
    });

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) overlay.style.display = 'none';
    });

    document.getElementById('changelog-close').addEventListener('click', function() {
        overlay.style.display = 'none';
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') overlay.style.display = 'none';
    });
}

document.addEventListener('DOMContentLoaded', initChangelog);
