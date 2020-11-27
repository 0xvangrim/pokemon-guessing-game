const randomId = () => Math.floor(Math.random() * 151 + 1);

const pokemonApiUrl = `https://pokeapi.co/api/v2/pokemon/`;

export const getPokemon = async () => {
  //function that makes the API call and fetches our pokemon
  const id = randomId();
  let pokemon = { name: "", image: "" };
  try {
    const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    console.log(result)
    const data = await result.json();
    pokemon.name = data.name;
    pokemon.image = data.sprites.other["official-artwork"].front_default;
    return pokemon;
  } catch (err) {
    console.error(err);
  }
};
