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
    { date: new Date("2024-01-10"), count: 0 },
    { date: new Date("2024-01-15"), count: 0 },
    { date: new Date("2024-02-13"), count: 1 },
    { date: new Date("2024-02-14"), count: 1 },
    { date: new Date("2024-02-29"), count: 2 },
    { date: new Date("2024-03-10"), count: 2 },
    { date: new Date("2024-04-15"), count: 3 },
    { date: new Date("2024-04-21"), count: 3 },
    { date: new Date("2024-05-08"), count: 4 },
    { date: new Date("2024-05-30"), count: 5 },
    { date: new Date("2024-05-31"), count: 5 },
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

          weekdayLabels={['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']}
          monthLabels={['Janv', 'Fév', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc']}

          values={myValues} // Utilisation des valeurs définies ci-dessus
          classForValue={(value) => {
            if (!value) {
              return "empty";
            }
            if (value.count === 0) {
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
            if (value && value.count === 0) {
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
              
              countMessage = `Indisponible`;
            }
            // Retourne l'objet d'attribut pour le tooltip
            return {
              "data-tip": `${formattedDate} - ${countMessage}`,
            };
          }}
          
          //Afficher les jours de la semaine
          showWeekdayLabels={true}
        />
        <ReactTooltip />
      </div>
      <div className="legend">
        <span className="legend-item" style={{ backgroundColor: '#d6e685' }}>0</span>
        <span className="legend-item" style={{ backgroundColor: '#8cc665' }}>1</span>
        <span className="legend-item" style={{ backgroundColor: '#44a340' }}>2</span>
        <span className="legend-item" style={{ backgroundColor: '#488645' }}>3</span>
        <span className="legend-item" style={{ backgroundColor: '#1e6823' }}>4</span>
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

// Rendu de l'application dans l'élément avec l'ID "root"
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
