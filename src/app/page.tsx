'use client';

import { useEffect, useState } from 'react';
import { Pokemon } from '../types/pokemon';
import { getOriginalPokemon } from '../utils/api';
import * as wanakana from 'wanakana';

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

  const convertToAllForms = (text: string): string[] => {
    // 入力された文字列をひらがな、カタカナ、ローマ字に変換
    const hiragana = wanakana.toHiragana(text);
    const katakana = wanakana.toKatakana(text);
    const romaji = wanakana.toRomaji(text);
    
    return [text, hiragana, katakana, romaji].filter(Boolean);
  };

  const filteredPokemon = pokemon.filter((p) => {
    if (searchTerm === '') return true;

    // 検索語を全ての形式に変換
    const searchForms = convertToAllForms(searchTerm.toLowerCase());
    
    // ポケモンの名前を全ての形式に変換
    const pokemonNameForms = convertToAllForms(p.japaneseName.toLowerCase());
    const englishName = p.name.toLowerCase();
    
    // いずれかの形式でマッチするかチェック
    return searchForms.some(searchForm => 
      pokemonNameForms.some(nameForm => nameForm.includes(searchForm)) ||
      englishName.includes(searchForm)
    );
  });

  const typeTranslations: { [key: string]: string } = {
    normal: 'ノーマル',
    fire: 'ほのお',
    water: 'みず',
    electric: 'でんき',
    grass: 'くさ',
    ice: 'こおり',
    fighting: 'かくとう',
    poison: 'どく',
    ground: 'じめん',
    flying: 'ひこう',
    psychic: 'エスパー',
    bug: 'むし',
    rock: 'いわ',
    ghost: 'ゴースト',
    dragon: 'ドラゴン',
    dark: 'あく',
    steel: 'はがね',
    fairy: 'フェアリー',
  };

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          初代ポケモン図鑑
        </h1>
        
        <div className="mb-8">
          <input
            type="text"
            placeholder="ポケモンを検索... (ひらがな・カタカナ・英語)"
            className="w-full max-w-md mx-auto block px-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="text-center">ポケモンデータを読み込み中...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPokemon.map((p) => (
              <div
                key={p.id}
                className="border rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition-shadow"
              >
                <img
                  src={p.sprites.front_default}
                  alt={p.japaneseName}
                  className="w-32 h-32"
                />
                <h2 className="text-lg font-semibold">
                  {p.japaneseName}
                  <span className="text-sm text-gray-500 ml-2">#{String(p.id).padStart(3, '0')}</span>
                </h2>
                <div className="flex gap-2 mt-2">
                  {p.types.map((type) => (
                    <span
                      key={type.type.name}
                      className="px-2 py-1 bg-gray-200 rounded-full text-sm"
                    >
                      {typeTranslations[type.type.name] || type.type.name}
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
