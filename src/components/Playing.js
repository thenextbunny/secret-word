// CSS
import "./Playing.css";

// Hooks
import { useState, useRef } from "react";

const Playing = ({ verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score, AAA }) => {
	const [letter, setLetter] = useState("");
	const letterInputRef = useRef(null);
	const handleSubmit = (event) => {
		event.preventDefault();

		verifyLetter(letter);

		setLetter("");

		letterInputRef.current.focus();
	};

	return (
		<div className="game">
			<p className="points">
				<span>Pontos: {score}</span>
			</p>
			<h1>Advinhe a palavra</h1>
			<h2 className="tip">Dica: {pickedCategory}</h2>
			<p>Você tem {guesses} </p>
			<div className="word-container">
				{letters.map((letter, index) =>
					guessedLetters.includes(letter) ? (
						<span key={index} className="word-letter">
							{letter}
						</span>
					) : (
						<span key={index} className="word-blank-square"></span>
					)
				)}
			</div>
			<div className="letter-container">
				<p>Tente advinhar uma letra da palavra</p>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						name="letter"
						id="letter"
						maxLength={1}
						required
						onChange={(event) => {
							setLetter(event.target.value);
						}}
						value={letter}
						ref={letterInputRef}
					/>
					<button type="submit">Enviar</button>
				</form>
			</div>
			<div className="wrong-letter-container">
				<p>Letras já utilizadas: </p>
				{wrongLetters.map((letter, index) => (
					<span key={index} className="wrong-letter">
						{letter},
					</span>
				))}
			</div>

			<button onClick={AAA}>a</button>
		</div>
	);
};

export default Playing;
