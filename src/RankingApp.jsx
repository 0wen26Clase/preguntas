import { useState, useEffect } from "react";

const RankingApp = () => {
	const [data, setData] = useState([]);

	// recibir get
	useEffect(() => {
		fetch("http://localhost:3000/getData")
			.then((res) => res.json())
			.then((data) => {
				setData(data);
			});
	}, []);

	return (
		<div>
			{data.map((item, index) => (
				<div key={index}>
					{index + 1}. {item.playername} - {item.correctas}-
					{item.incorrectas}
				</div>
			))}
		</div>
	);
};

export default RankingApp;
