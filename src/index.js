// Import des modules
import React from "react";
import ReactDOM from "react-dom";

// Import du composant CalendarHeatmap et ReactTooltip
import CalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";
import "./styles.css";
import "./react-calendar-heatmap.css";

// Création d'une instance de date
const today = new Date();


// Définition du composant principal
function App() {
  // Détermination de la date entre aujourd'hui avant et après aujourd'hui
  const halfYearBefore = shiftDate(today, -182); // 182 jours avant aujourd'hui
  const halfYearAfter = shiftDate(today, 182); // 182 jours après aujourd'hui
  

  // Définition des valeurs à afficher dans le heatmap
  const myValues = [
    // Les valeurs générées par getRange et shiftDate
    ...getRange(1000).map(index => {
      return {
        date: shiftDate('2023', index),
        count: 0,
      };
    }),
    // La date spécifique que vous voulez ajouter
    { date: new Date("2024-01-01"), count: 6 },
    { date: new Date("2024-01-10"), count: 6 },
    { date: new Date("2024-01-15"), count: 6 },
    { date: new Date("2024-02-13"), count: 1 },
    { date: new Date("2024-02-14"), count: 1 },
    { date: new Date("2024-02-29"), count: 2 },
    { date: new Date("2024-03-10"), count: 2 },
    { date: new Date("2024-04-15"), count: 3 },
    { date: new Date("2024-04-21"), count: 3 },
    { date: new Date("2024-05-08"), count: 4 },
    { date: new Date("2024-05-30"), count: 5 },
    { date: new Date("2024-05-31"), count: 5 },
  ];
    

  // Rendu du composant avec les valeurs et les propriétés
  return (
    <div>
      <h1>Période de réservation</h1>
      <div className="container">
        <CalendarHeatmap
          startDate={halfYearBefore}
          endDate={halfYearAfter}

          // Modification des dates en français
          weekdayLabels={['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']}
          monthLabels={['Janv', 'Fév', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc']}

          values={myValues} // Utilisation des valeurs définies
          // Attribution des couleurs en fonction des counts
          classForValue={(value) => {
            if (!value) {
              return "empty";
            }
            if (value.count === 0) {
              return "empty";
            }
            if (value.count === 6) {
              return "red";
            }
            if (value.count === 1) {
              return "green1";
            }
            if (value.count === 2) {
              return "green2";
            }
            if (value.count === 3) {
              return "green3";
            }
            if (value.count === 4) {
              return "green4";
            }
            if (value.count === 5) {
              return "green5";
            }
          }}
          tooltipDataAttrs={(value) => {
            // Formatage de la date en mode "DD-MM-YYYY" ou affichage d'un message si la date n'est pas disponible
            const formattedDate = value && value.date ? value.date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }) : "Date";
            // Définition du message personnalisé pour value.count
            let countMessage;
            if (value && value.count === 6) {
              countMessage = "Réservée";
            } else if (value && value.count === 1) {
              countMessage = "20%";
            } else if (value && value.count === 2) {
              countMessage = "40%";
            } else if (value && value.count === 3) {
              countMessage = "60%";
            } else if (value && value.count === 4) {
              countMessage = "80%";
            } else if (value && value.count === 5) {
              countMessage = "100%";
            } else if (value) {
              
              countMessage = `Vide`;
            }
            // Retourne l'objet d'attribut pour le tooltip
            return {
              "data-tip": `${formattedDate} - ${countMessage}`,
            };
          }}
          
          // Affiche les jours de la semaine
          showWeekdayLabels={true}
          // Rempli les coins du calendrier
          showOutOfRangeDays={true}
        />
        <ReactTooltip />
      </div>
      <div className="legend">
        <span className="legend-item">Moins</span>
        <span className="legend-item" style={{ backgroundColor: '#f57b7b' }}>Réservée</span>
        <span className="legend-item" style={{ backgroundColor: '#d6e685' }}>20%</span>
        <span className="legend-item" style={{ backgroundColor: '#8cc665' }}>40%</span>
        <span className="legend-item" style={{ backgroundColor: '#44a340' }}>60%</span>
        <span className="legend-item" style={{ backgroundColor: '#488645' }}>80%</span>
        <span className="legend-item" style={{ backgroundColor: '#1e6823' }}>100%</span>
        <span className="legend-item">Plus</span>
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

// Attribut un count à tout les events
function getRange(count) {
  return Array.from({ length: count }, (_, i) => i);
}

// Rendu de l'application dans l'élément avec l'ID "root"
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
