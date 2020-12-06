export const getPokemon = async (id) => {
  //function that makes the API call and fetches our pokemon

  let pokemon = { name: "", image: "" };
  try {
    const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await result.json();
    pokemon.name = data.name;
    pokemon.image = data.sprites.other["official-artwork"].front_default;
    return pokemon;
  } catch (err) {
    console.error("The API is down");
  }
};
