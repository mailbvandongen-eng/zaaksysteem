// Zaaksysteem Flow Visualisatie - Interactiviteit
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initFlowDiagram();
    initPerspectiveSwitcher();
    initVinkjes();
    initToggles();
});

// Navigation active state
function initNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Flow diagram interactivity
function initFlowDiagram() {
    const nodes = document.querySelectorAll('.flow-diagram .node');
    const detailPanel = document.getElementById('system-detail');

    nodes.forEach(node => {
        node.addEventListener('click', function() {
            const systemId = this.dataset.system;
            showSystemDetail(systemId);

            // Highlight selected node
            nodes.forEach(n => n.classList.remove('highlight'));
            this.classList.add('highlight');
        });

        // Tooltip on hover
        node.addEventListener('mouseenter', function(e) {
            const tooltip = this.dataset.tooltip;
            if (tooltip) {
                showTooltip(e, tooltip);
            }
        });

        node.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });
}

// System detail panel
function showSystemDetail(systemId) {
    const detailPanel = document.getElementById('system-detail');
    if (!detailPanel) return;

    const systems = {
        'rx-enterprise': {
            title: 'Rx.Enterprise',
            description: 'Het centrale zaaksysteem van Roxit. Hier worden alle zaken aangemaakt, beheerd en gearchiveerd.',
            details: [
                'Zaakregistratie en -beheer',
                'Documentenmagazijn (vervangt Corsa)',
                'Werkvoorraad voor behandelaars',
                'Koppeling met afhandelsystemen via ZS-DMS'
            ]
        },
        'rx-front': {
            title: 'Rx.Front (KCC)',
            description: 'Het KCC systeem voor klantcontact. Medewerkers zien hier het integrale klantbeeld.',
            details: [
                'Zoeken op BSN',
                'Alle lopende en gesloten zaken zichtbaar',
                'Status en behandelaar direct inzichtelijk',
                'Terugbelverzoeken kunnen worden ingepland'
            ]
        },
        'enable-u': {
            title: 'Enable-U (API Gateway)',
            description: 'De integratielaag tussen Rx.Enterprise en de afhandelsystemen.',
            details: [
                'Filter per zaaktype (niks ingericht = niks zichtbaar)',
                'Filter per documenttype',
                'Bepaalt wat zichtbaar is op de PIP',
                'Toekomst: geneste configuratie per zaaktype'
            ]
        },
        'pip': {
            title: 'PIP (Persoonlijke Internet Pagina)',
            description: 'De portal waar burgers hun aanvragen kunnen volgen.',
            details: [
                'Inloggen met DigiD (burgers) of eHerkenning (bedrijven)',
                'Status van aanvragen volgen',
                'Documenten downloaden en uploaden',
                'Notificaties ontvangen bij statuswijzigingen'
            ]
        },
        'simform': {
            title: 'SIMform',
            description: 'De formulierengenerator voor zaakgerichte formulieren.',
            details: [
                'Maakt digitale aanvraagformulieren',
                'Koppeling met DigiD/eHerkenning',
                'Levert direct aan Rx.Enterprise',
                'Vervangt e-mailformulieren'
            ]
        },
        'centric-bz': {
            title: 'Centric Burgerzaken',
            description: 'Het afhandelsysteem voor burgerzaken producten.',
            details: [
                'Paspoorten en ID-kaarten',
                'Rijbewijzen',
                'Uittreksels burgerlijke stand',
                'Gekoppeld via Centric Cloud Adapter'
            ]
        },
        's4sd': {
            title: 'Suite4Sociaal Domein',
            description: 'Het afhandelsysteem voor het sociaal domein.',
            details: [
                'WMO aanvragen',
                'Gehandicaptenparkeerkaart (GPK) - Live!',
                'Jeugdzorg',
                'Gekoppeld via ZS-DMS'
            ]
        },
        'stratech': {
            title: 'Stratech',
            description: 'Het afhandelsysteem voor schuldhulpverlening.',
            details: [
                'SHV processen',
                'Gaat naar de cloud (over half jaar)',
                'Nieuwe processen worden zaakgericht ingericht'
            ]
        },
        'corsa': {
            title: 'Corsa (Legacy)',
            description: 'Het oude DMS dat wordt uitgefaseerd.',
            details: [
                'Wordt vervangen door Rx.Enterprise',
                'Per zaaktype dat overgaat niet meer nodig',
                'Kofax scanner wordt ook uitgefaseerd'
            ],
            warning: true
        }
    };

    const system = systems[systemId];
    if (!system) return;

    let html = `
        <h4>${system.title}</h4>
        <p>${system.description}</p>
        <ul>
            ${system.details.map(d => `<li>${d}</li>`).join('')}
        </ul>
    `;

    if (system.warning) {
        html = `<div class="info-box warning">${html}</div>`;
    }

    detailPanel.innerHTML = html;
    detailPanel.classList.add('visible');
}

// Tooltip
let tooltipEl = null;

function showTooltip(e, text) {
    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.className = 'tooltip';
        tooltipEl.style.cssText = `
            position: fixed;
            background: var(--text);
            color: var(--white);
            padding: 0.5rem 0.75rem;
            border-radius: 4px;
            font-size: 0.85rem;
            z-index: 1000;
            pointer-events: none;
            max-width: 250px;
        `;
        document.body.appendChild(tooltipEl);
    }

    tooltipEl.textContent = text;
    tooltipEl.style.display = 'block';
    tooltipEl.style.left = (e.clientX + 10) + 'px';
    tooltipEl.style.top = (e.clientY + 10) + 'px';
}

function hideTooltip() {
    if (tooltipEl) {
        tooltipEl.style.display = 'none';
    }
}

// Perspective switcher
function initPerspectiveSwitcher() {
    const cards = document.querySelectorAll('.perspective-card');
    const flowLayers = document.querySelectorAll('.flow-layer');

    cards.forEach(card => {
        card.addEventListener('click', function() {
            const perspective = this.dataset.perspective;

            // Update active state
            cards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');

            // Show relevant flow elements
            highlightPerspective(perspective);
        });
    });
}

function highlightPerspective(perspective) {
    const allNodes = document.querySelectorAll('.flow-diagram .node');

    const perspectiveNodes = {
        'aanvrager': ['gemeentewestland', 'formulier', 'digid', 'pip', 'notificatie'],
        'behandelaar': ['rx-enterprise', 'afhandelsysteem', 'werkvoorraad', 'dossier'],
        'kcc': ['rx-front', 'rx-enterprise', 'klantbeeld'],
        'registratie': ['scanner', 'rx-enterprise', 'werkvoorraad', 'dossier'],
        'fb': ['rx-enterprise', 'afhandelsysteem', 'enable-u', 'zaaktype'],
        'ib': ['i-navigator', 'zaaktype', 'proces']
    };

    const relevantNodes = perspectiveNodes[perspective] || [];

    allNodes.forEach(node => {
        const nodeId = node.dataset.system;
        if (relevantNodes.includes(nodeId) || relevantNodes.length === 0) {
            node.style.opacity = '1';
        } else {
            node.style.opacity = '0.3';
        }
    });
}

// 7 Vinkjes animation
function initVinkjes() {
    const vinkjes = document.querySelectorAll('.vinkje');
    let currentIndex = 0;

    const playBtn = document.getElementById('play-vinkjes');
    if (!playBtn) return;

    playBtn.addEventListener('click', function() {
        // Reset
        vinkjes.forEach(v => {
            v.classList.remove('active', 'completed');
        });
        currentIndex = 0;

        // Animate through vinkjes
        animateVinkje();
    });

    function animateVinkje() {
        if (currentIndex >= vinkjes.length) return;

        // Mark previous as completed
        if (currentIndex > 0) {
            vinkjes[currentIndex - 1].classList.remove('active');
            vinkjes[currentIndex - 1].classList.add('completed');
        }

        // Mark current as active
        vinkjes[currentIndex].classList.add('active');
        vinkjes[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });

        currentIndex++;

        if (currentIndex < vinkjes.length) {
            setTimeout(animateVinkje, 1500);
        } else {
            setTimeout(() => {
                vinkjes[vinkjes.length - 1].classList.remove('active');
                vinkjes[vinkjes.length - 1].classList.add('completed');
            }, 1500);
        }
    }
}

// Toggle switches
function initToggles() {
    const toggles = document.querySelectorAll('.toggle');

    toggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            this.classList.toggle('active');

            const target = this.dataset.target;
            if (target) {
                const element = document.getElementById(target);
                if (element) {
                    element.classList.toggle('visible');
                }
            }
        });
    });
}

// "Volg de zaak" animation
function startZaakAnimation(flowType = 'simform') {
    const svg = document.querySelector('.flow-diagram svg');
    if (!svg) return;

    // Define paths for different flow types
    const paths = {
        'simform': [
            { x: 100, y: 100 },  // Start: gemeentewestland.nl
            { x: 250, y: 100 },  // SIMform
            { x: 400, y: 100 },  // DigiD
            { x: 550, y: 100 },  // Rx.Enterprise
            { x: 550, y: 200 },  // ZS-DMS
            { x: 700, y: 200 },  // Afhandelsysteem
            { x: 700, y: 300 },  // Enable-U
            { x: 550, y: 300 },  // PIP
            { x: 400, y: 300 }   // Notificatie
        ],
        'burgerzaken': [
            { x: 100, y: 100 },  // gemeentewestland.nl
            { x: 250, y: 100 },  // eDiensten
            { x: 400, y: 100 },  // Cloud Adapter
            { x: 550, y: 100 },  // Centric BZ
            { x: 550, y: 200 },  // ZS-DMS
            { x: 700, y: 200 },  // Rx.Enterprise
            { x: 700, y: 300 },  // PIP
        ]
    };

    const pathPoints = paths[flowType] || paths['simform'];

    // Create or get the moving dot
    let dot = svg.querySelector('.zaak-dot');
    if (!dot) {
        dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.classList.add('zaak-dot');
        svg.appendChild(dot);
    }

    // Animate along path
    let currentPoint = 0;
    dot.classList.add('moving');

    function moveToNext() {
        if (currentPoint >= pathPoints.length) {
            dot.classList.remove('moving');
            return;
        }

        const point = pathPoints[currentPoint];
        dot.setAttribute('cx', point.x);
        dot.setAttribute('cy', point.y);

        currentPoint++;
        setTimeout(moveToNext, 800);
    }

    moveToNext();
}

// Export for use in HTML
window.showSystemDetail = showSystemDetail;
window.highlightPerspective = highlightPerspective;
window.startZaakAnimation = startZaakAnimation;
