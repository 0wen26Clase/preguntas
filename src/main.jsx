import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import PreguntasApp from "./PreguntasApp.jsx";
import RankingApp from "./RankingApp";
// import ConexionApp from "./ConexionApp";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<PreguntasApp />
		<RankingApp />
	</React.StrictMode>
);
