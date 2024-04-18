// Import des modules nécessaires depuis React et ReactDOM
import React from "react";
import ReactDOM from "react-dom";

// Import du composant CalendarHeatmap et ReactTooltip ainsi que les fichiers CSS associés
import CalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";
import "./styles.css";
import "./react-calendar-heatmap.css";

// Création d'une instance de date représentant aujourd'hui
const today = new Date();

// Définition du composant principal de l'application
function App() {
  // Détermination de la date exactement à mi-chemin entre aujourd'hui et 182 jours avant et après aujourd'hui
  const halfYearBefore = shiftDate(today, -182); // 182 jours avant aujourd'hui
  const halfYearAfter = shiftDate(today, 182); // 182 jours après aujourd'hui

  // Définition des valeurs à afficher dans le heatmap (modifiable)
  const myValues = [
    { date: new Date("2024-01-01"), count: 0 },
    { date: new Date("2024-01-10"), count: 1 },
    { date: new Date("2024-02-15"), count: 1 },
    // Vous pouvez ajouter vos propres valeurs ici
  ];

  // Rendu du composant avec les valeurs et les propriétés spécifiées
  return (
    <div>
      <h1>Période de réservation</h1>
      <div className="container">
        <CalendarHeatmap
          startDate={halfYearBefore}
          endDate={halfYearAfter}
          values={myValues} // Utilisation des valeurs définies ci-dessus
          classForValue={(value) => {
            if (!value) {
              return "green";
            }
            if (value.count === 0) {
              return "empty";
            }
            if (value.count === 1) {
              return "red";
            }
          }}
          tooltipDataAttrs={(value) => {
            // Formatage de la date en mode "DD-MM-YYYY" ou affichage d'un message si la date n'est pas disponible
            const formattedDate = value && value.date ? value.date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }) : "Date disponible";
            // Définition du message personnalisé pour value.count
            let countMessage;
            if (value && value.count === 0) {
              countMessage = "Indisponible";
            } else if (value && value.count === 1) {
              countMessage = "Réservée";
            } else if (value) {
              countMessage = `Réservable`;
            }
            // Retourne l'objet d'attributs pour le tooltip
            return {
              "data-tip": `${formattedDate} - ${countMessage}`,
            };
          }}
          
          showWeekdayLabels={true}
        />
        <ReactTooltip />
      </div>
    </div>
  );
}

// Fonction utilitaire pour déplacer une date de n jours
function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

// Fonction utilitaire pour générer un tableau de nombres de 0 à count
function getRange(count) {
  return Array.from({ length: count }, (_, i) => i);
}

// Fonction utilitaire pour générer un entier aléatoire entre min et max inclus
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Rendu de l'application dans l'élément avec l'ID "root"
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
