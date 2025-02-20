import { Pokemon, PokemonListResponse } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

export async function getOriginalPokemon(): Promise<Pokemon[]> {
  try {
    // Get the first 151 Pokemon
    const response = await fetch(`${BASE_URL}/pokemon?limit=151`);
    const data: PokemonListResponse = await response.json();

    // Fetch detailed information for each Pokemon
    const pokemonDetails = await Promise.all(
      data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        return res.json();
      })
    );

    return pokemonDetails;
  } catch (error) {
    console.error('Error fetching Pokemon:', error);
    return [];
  }
}
