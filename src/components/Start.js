// CSS
import "./Start.css";

const Start = ({ start }) => {
	return (
		<div className="start">
			<h1>Secret Word</h1>
			<p>Clique no botão abaixo para começar a jogar!</p>
			<button onClick={start}>Iniciar</button>
            {/* Temporário */}
		</div>
	);
};

export default Start;
