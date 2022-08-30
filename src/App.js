// Hooks
import { useState, useCallback, useEffect } from "react";

// components
import Start from "./components/Start";
import Game from "./components/Playing";
import End from "./components/End";

// Style
import "./App.css";

// Data
import { wordsList } from "./data/words";

const stages = [
	{ id: 1, name: "start" },
	{ id: 2, name: "game" },
	{ id: 3, name: "end" },
];

function App() {
	const [gameStage, setGameStage] = useState(stages[0].name);
	const [words] = useState(wordsList);
	const [pickedWord, setPickedWord] = useState("");
	const [pickedCategory, setPickedCategory] = useState("");
	const [letters, setLetters] = useState([]);
	const [guessedLetters, setGuessedLetters] = useState([]);
	const [wrongLetters, setWrongLetters] = useState([]);
	const [guesses, setGuesses] = useState(3);
	const [score, setScore] = useState(0);

	const pickWordAndCategory = useCallback(() => {
		// Pick a random category
		const categories = Object.keys(words);
		const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

		// Pick a random word
		const word = words[category][Math.floor(Math.random() * words[category].length)];

		return { category, word };
	}, [words]);

	// start the game
	const start = useCallback(() => {
		// Clear all letters
		clearLettersStates();

		// Choose a word
		const { category, word } = pickWordAndCategory();

		let wordLetters = word.toLowerCase().split("");

		setPickedCategory(category);
		setPickedWord(word);
		setLetters(wordLetters);

		setGameStage(stages[1].name);
	}, [pickWordAndCategory]);

	// process letter input
	const verifyLetter = (letter) => {
		const normalizedLetter = letter.toLowerCase();

		// check if letter has already been utilized
		if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
			return;
		}

		// push guessed letter or remove a chance
		if (letters.includes(normalizedLetter)) {
			setGuessedLetters((actualGuessedLetters) => [...actualGuessedLetters, letter]);
		} else {
			setWrongLetters((actualWrongLetters) => [...actualWrongLetters, normalizedLetter]);

			setGuesses((actualGuesses) => actualGuesses - 1);
		}
	};

	console.log(wrongLetters);

	// restart the game
	const reset = () => {
		setScore(0);
		setGuesses(3);
		setGameStage(stages[0].name);
	};

	// clear letters state
	const clearLettersStates = () => {
		setGuessedLetters([]);
		setWrongLetters([]);
	};

	// check if guesses ended
	useEffect(() => {
		if (guesses === 0) {
			// game over and reset all states
			clearLettersStates();

			setGameStage(stages[2].name);
		}
	}, [guesses]);

	// check win condition
	useEffect(() => {
		const uniqueLetters = [...new Set(letters)];

		console.log(uniqueLetters);
		console.log(guessedLetters);

		// win condition
		if (guessedLetters.length === uniqueLetters.length) {
			// add score
			setScore((actualScore) => (actualScore += 100));

			// restart game with new word
			start();
		}
	}, [guessedLetters, letters, start]);

	return (
		<div className="App">
			{gameStage === "start" && <Start start={start} />}
			{gameStage === "game" && <Game verifyLetter={verifyLetter} pickedWord={pickedWord} pickedCategory={pickedCategory} letters={letters} guessedLetters={guessedLetters} wrongLetters={wrongLetters} guesses={guesses} score={score} />}
			{gameStage === "end" && <End reset={reset} score={score} />}
		</div>
	);
}

export default App;
