import { useState } from "react";
import {
	Box,
	Button,
	Card,
	CardContent,
	TextField,
	Typography,
} from "@mui/material";
import questions from "./preguntas.json";
import axios from "axios";

const shuffleArray = (array) => {
	const shuffledArray = [...array];
	for (let i = shuffledArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffledArray[i], shuffledArray[j]] = [
			shuffledArray[j],
			shuffledArray[i],
		];
	}
	return shuffledArray;
};

const PreguntasApp = () => {
	const [shuffledQuestions] = useState(shuffleArray(questions));
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
	const [correctCount, setCorrectCount] = useState(0);
	const [incorrectCount, setIncorrectCount] = useState(0);
	const [playerName, setPlayerName] = useState("");
	const [gameStarted, setGameStarted] = useState(false);

	const handleAnswer = (answer) => {
		if (selectedAnswer === null) {
			setSelectedAnswer(answer);
			setShowCorrectAnswer(true);

			// Aquí puedes agregar lógica adicional para manejar la respuesta del usuario
			if (answer === correctAnswer) {
				setCorrectCount((prevCount) => prevCount + 1);
			} else {
				setIncorrectCount((prevCount) => prevCount + 1);
			}
		}
	};

	const handleNextQuestion = () => {
		if (
			currentQuestionIndex < shuffledQuestions.length - 1 &&
			currentQuestionIndex < 99
		) {
			setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
			setSelectedAnswer(null);
			setShowCorrectAnswer(false);
		} else {
			handleEndGame();
		}
	};

	const handleEndGame = () => {
		setCurrentQuestionIndex(0);
		setSelectedAnswer(null);
		setShowCorrectAnswer(false);
		setCorrectCount(0);
		setIncorrectCount(0);
		setPlayerName("");
		setGameStarted(false);
		hanldeClick();
	};

	const handleStartGame = () => {
		if (playerName.trim() !== "") {
			setGameStarted(true);
		}
	};

	const currentQuestion = shuffledQuestions[currentQuestionIndex];
	const questionText = currentQuestion?.pregunta;
	const answers = Object.values(currentQuestion?.opciones || {}).slice(0, -1);
	const correctAnswerLetter = currentQuestion?.opciones?.respuesta;
	const correctAnswer =
		currentQuestion?.opciones?.[correctAnswerLetter] || null;

	const hanldeClick = (e) => {
		// e.preventDefault();
		const player = playerName;
		const correctas = correctCount;
		const incorrectas = incorrectCount;
		axios
			.post(`https://serverpreguntas.onrender.com/getData`, {
				correctas: correctas,
				incorrectas: incorrectas,
				playerName: player,
			})

			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<Box display='flex'>
			<Card
				sx={{
					flexGrow: 1,
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					minHeight: "50vh",
				}}
			>
				<CardContent>
					{!gameStarted ? (
						<>
							<TextField
								label='Nombre'
								value={playerName}
								onChange={(e) => setPlayerName(e.target.value)}
							/>
							<Button onClick={handleStartGame}>Empezar</Button>
						</>
					) : (
						<>
							<Typography variant='h5'>{questionText}</Typography>
							{answers.map((answer, index) => (
								<Button
									sx={{
										width: "100%",
										marginBottom: "8px",
									}}
									key={index}
									onClick={() => handleAnswer(answer)}
									variant={
										answer === selectedAnswer
											? "contained"
											: showCorrectAnswer &&
											  answer === correctAnswer
											? "contained"
											: "outlined"
									}
									color={
										showCorrectAnswer
											? answer === correctAnswer
												? "success"
												: answer === selectedAnswer
												? "error"
												: undefined
											: undefined
									}
								>
									{answer}
								</Button>
							))}
							<Button onClick={handleNextQuestion}>
								Siguiente pregunta
							</Button>
							<Typography variant='h6'>
								Correctas: {correctCount}
							</Typography>
							<Typography variant='h6'>
								Incorrectas: {incorrectCount}
							</Typography>
						</>
					)}
				</CardContent>
				<Button onClick={hanldeClick}>Guardar</Button>
			</Card>
		</Box>
	);
};

export default PreguntasApp;
