'use client';

import { useEffect, useState } from 'react';
import { Pokemon } from '../types/pokemon';
import { getOriginalPokemon } from '../utils/api';

export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      const data = await getOriginalPokemon();
      setPokemon(data);
      setIsLoading(false);
    };

    fetchPokemon();
  }, []);

  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Original 151 Pokémon
        </h1>
        
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search Pokémon..."
            className="w-full max-w-md mx-auto block px-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="text-center">Loading Pokémon...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPokemon.map((p) => (
              <div
                key={p.id}
                className="border rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition-shadow"
              >
                <img
                  src={p.sprites.front_default}
                  alt={p.name}
                  className="w-32 h-32"
                />
                <h2 className="text-lg font-semibold capitalize">{p.name}</h2>
                <div className="flex gap-2 mt-2">
                  {p.types.map((type) => (
                    <span
                      key={type.type.name}
                      className="px-2 py-1 bg-gray-200 rounded-full text-sm capitalize"
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
