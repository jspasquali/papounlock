// Attend que le contenu de la page soit entièrement chargé
document.addEventListener('DOMContentLoaded', () => {

    // Récupère les éléments importants de la page
    const searchButton = document.getElementById('search-button');
    const cardNumberInput = document.getElementById('card-number');
    const resultContainer = document.getElementById('result-container');
    let enigmesData = []; // Variable pour stocker les données des énigmes

    // 1. Charger les données des énigmes depuis le fichier JSON
    // On utilise fetch() pour faire une requête et récupérer le fichier
    async function loadEnigmes() {
        try {
            const response = await fetch('enigmes.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            enigmesData = await response.json();
        } catch (error) {
            console.error("Impossible de charger le fichier d'énigmes:", error);
            resultContainer.innerHTML = `<p class="error-message">Erreur : Impossible de charger les données du jeu.</p>`;
        }
    }

    // 2. Fonction pour afficher les indices d'une carte
    function displayCard(cardId) {
        // Cherche la carte correspondant à l'ID dans nos données
        // On convertit l'ID en nombre pour être sûr de la comparaison
        const card = enigmesData.find(e => e.id === parseInt(cardId));

        // Vide les anciens résultats
        resultContainer.innerHTML = '';

        if (!card) {
            resultContainer.innerHTML = `<p class="error-message">Aucune carte trouvée pour le numéro ${cardId}.</p>`;
            return;
        }

        // Crée le titre de l'énigme
        const title = document.createElement('h2');
        title.textContent = `${card.id} - ${card.titre}`;
        resultContainer.appendChild(title);

        // Crée et affiche chaque indice dans un élément <details>
        card.indices.forEach((indiceText, index) => {
            const details = document.createElement('details');
            const summary = document.createElement('summary');
            summary.textContent = `Indice ${index + 1}`;
            
            const content = document.createElement('div');
            content.className = 'hint-content';
            content.textContent = indiceText;

            details.appendChild(summary);
            details.appendChild(content);
            resultContainer.appendChild(details);
        });

        // Crée et affiche la solution, également dans un <details>
        if (card.solution) {
            const solutionDetails = document.createElement('details');
            solutionDetails.className = 'solution-card';
            const solutionSummary = document.createElement('summary');
            solutionSummary.textContent = 'Solution';
            
            const solutionContent = document.createElement('div');
            solutionContent.className = 'solution-content';
            solutionContent.textContent = card.solution;
            solutionDetails.appendChild(solutionSummary);
            solutionDetails.appendChild(solutionContent);
            resultContainer.appendChild(solutionDetails);
        }
    }

    // 3. Écoute l'événement "click" sur le bouton de recherche
    searchButton.addEventListener('click', () => {
        const cardNumber = cardNumberInput.value;
        if (cardNumber) {
            displayCard(cardNumber);
            cardNumberInput.value = ''; 
        }
    });
        
    // Permet aussi de valider avec la touche "Entrée" dans le champ de saisie
    cardNumberInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            searchButton.click();
        }
    });
    
    // Permet aussi de valider avec la touche "Entrée" dans le champ de saisie
    cardNumberInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            searchButton.click();
        }
    });

    // 4. Lance le chargement des données au démarrage
    loadEnigmes();
});