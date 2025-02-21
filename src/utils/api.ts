import { Pokemon, PokemonListResponse, PokemonSpecies } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

async function getJapaneseName(speciesUrl: string): Promise<string> {
  try {
    const response = await fetch(speciesUrl);
    const data: PokemonSpecies = await response.json();
    const japaneseName = data.names.find(
      (name) => name.language.name === 'ja'
    )?.name || '';
    return japaneseName;
  } catch (error) {
    console.error('Error fetching Japanese name:', error);
    return '';
  }
}

export async function getOriginalPokemon(): Promise<Pokemon[]> {
  try {
    // Get the first 151 Pokemon
    const response = await fetch(`${BASE_URL}/pokemon?limit=151`);
    const data: PokemonListResponse = await response.json();

    // Fetch detailed information for each Pokemon
    const pokemonDetails = await Promise.all(
      data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        const pokemonData: Pokemon = await res.json();
        
        // Get the Japanese name from the species endpoint
        const speciesUrl = `${BASE_URL}/pokemon-species/${pokemonData.id}`;
        const japaneseName = await getJapaneseName(speciesUrl);
        
        return {
          ...pokemonData,
          japaneseName,
        };
      })
    );

    return pokemonDetails;
  } catch (error) {
    console.error('Error fetching Pokemon:', error);
    return [];
  }
}
