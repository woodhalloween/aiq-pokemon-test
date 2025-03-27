import { Pokemon, PokemonListResponse } from '../types/pokemon';

// PokemonSpecies型がないのにエラーにならない理由の検証
// TypeScriptコンパイル時のチェックとランタイムでの挙動の違いを確認

const BASE_URL = 'https://pokeapi.co/api/v2';

// 実際のPokemonSpeciesデータ構造を調査
async function getPokemonSpeciesData(id: number): Promise<any> {
  try {
    const speciesUrl = `${BASE_URL}/pokemon-species/${id}`;
    const response = await fetch(speciesUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Pokemon species:', error);
    return null;
  }
}

// Pokemonデータ構造を調査
async function getPokemonData(id: number): Promise<any> {
  try {
    const pokemonUrl = `${BASE_URL}/pokemon/${id}`;
    const response = await fetch(pokemonUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Pokemon data:', error);
    return null;
  }
}

// 検証用の実行関数
export async function testPokemonAPI(): Promise<void> {
  console.log('=== PokemonAPI検証開始 ===');
  
  // 1. PokemonSpecies型がなくても実行時にエラーにならない理由
  console.log('1. PokemonSpecies型の検証:');
  console.log('TypeScriptはコンパイル時に型チェックを行いますが、実行時には型情報は消去されます（型消去）');
  console.log('そのため、コンパイル時に型定義がなくエラーになっても、実行時にはその型情報は使われません');
  console.log('fetch後のresponse.json()の戻り値は実行時にはany型として扱われます');
  
  // 2. 実際のAPIから返されるデータ構造の検証
  console.log('\n2. 実際のAPIデータ構造:');
  
  // Pokemonデータの取得
  const pokemonData = await getPokemonData(1);
  console.log('Pokemon APIレスポンス (一部):');
  console.log(JSON.stringify({
    id: pokemonData.id,
    name: pokemonData.name,
    sprites: pokemonData.sprites,
    types: pokemonData.types
  }, null, 2));
  
  // PokemonSpeciesデータの取得
  const speciesData = await getPokemonSpeciesData(1);
  console.log('\nPokemonSpecies APIレスポンス (一部):');
  console.log(JSON.stringify({
    id: speciesData.id,
    name: speciesData.name,
    names: speciesData.names,
    // 他に利用可能なプロパティも表示
    color: speciesData.color,
    genera: speciesData.genera
  }, null, 2));
  
  // 3. PokemonSpecies型の本来あるべき定義
  console.log('\n3. PokemonSpecies型の推定される定義:');
  console.log(`
interface PokemonSpecies {
  id: number;
  name: string;
  names: {
    name: string;
    language: {
      name: string;
      url: string;
    }
  }[];
  // 他のプロパティも多数...
}`);
  
  // 4. マウント時のTypeScriptコンパイルとランタイムでの挙動の違い
  console.log('\n4. TypeScriptコンパイルとランタイム挙動の違い:');
  console.log('- コンパイル時: 型チェックが行われ、型が存在しない場合はエラー');
  console.log('- ランタイム時: 型情報は消去され、オブジェクトの実際の構造のみが重要');
  console.log('- 型のないオブジェクトのプロパティアクセス: data.names?.find()のようなオプショナルチェーンが安全');
  
  console.log('\n=== PokemonAPI検証終了 ===');
}

// 即時実行するための関数呼び出し
if (typeof window !== 'undefined') {
  // ブラウザ環境でのみ実行
  setTimeout(() => {
    testPokemonAPI();
  }, 1000);
} 