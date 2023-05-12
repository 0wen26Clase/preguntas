import { useEffect, useState } from "react";
import axios from "axios";

const ConexionApp = () => {
	const [data, setData] = useState(null);

	const hanldeClick = (e) => {
		e.preventDefault();
		const nombre = document.getElementById("nombre").value;
		const apellido = document.getElementById("apellido").value;
		axios
			.post(`http://localhost:3000/getData`)
			.then((res) => {
				setData(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			<form id='formulario'>
				<label htmlFor='nombre'>Nombre:</label>
				<input type='text' id='nombre' name='nombre' />
				<label htmlFor='apellido'>Apellido:</label>
				<input type='text' id='apellido' name='apellido' />
				<button onClick={hanldeClick}>Enviar</button>
			</form>
		</div>
	);
};

export default ConexionApp;
