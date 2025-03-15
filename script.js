let pokedex = [];
const button = document.querySelector('button');
const result = document.getElementById('result');

// Função para carregar o banco de dados
async function loadDatabase() {
	try {
		const response = await fetch('pokemon-database.json');
		
		if (!response.ok) {
			throw new Error(`Erro HTTP: ${response.status}`);
		}
		
		const data = await response.json();
		return data.pokemons;
		
	} catch (error) {
		result.textContent = 'Erro ao carregar banco de dados!';
		console.error('Erro:', error);
		return [];
	}
}

// Inicialização
loadDatabase().then(pokemons => {
	pokedex = pokemons;
	button.disabled = false;
	result.textContent = 'Clique no botão para encontrar um Pokémon';
});

function procurarPokemon() {
	if (pokedex.length === 0) {
		alert('Banco de dados não carregado!');
		return;
	}

	const randomPokemon = pokedex[Math.floor(Math.random() * pokedex.length)];
	const nomeFormatado = randomPokemon.name.charAt(0).toUpperCase() + randomPokemon.name.slice(1);

	document.getElementById('pokemonSprite').src = randomPokemon.sprites.default;
	result.textContent = `Você encontrou um ${nomeFormatado}!`;
}