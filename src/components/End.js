import "./End.css";

const End = ({ reset, score }) => {
	return (
		<div className="end">
			<h1>Fim de jogo!</h1>
			<h2>
				A sua pontuação foi: <span>{score}</span>!
			</h2>
			<button onClick={reset}>Reiniciar</button>
		</div>
	);
};

export default End;
