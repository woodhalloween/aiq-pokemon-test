'use client';

import { useEffect, useState } from 'react';
import { testPokemonAPI } from '../../utils/test-pokemon-api';

export default function TestPage() {
  const [testStarted, setTestStarted] = useState(false);
  const [testComplete, setTestComplete] = useState(false);

  const runTest = async () => {
    setTestStarted(true);
    await testPokemonAPI();
    setTestComplete(true);
  };

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          ポケモンAPI検証テスト
        </h1>
        
        <div className="mb-8 text-center">
          <button 
            onClick={runTest} 
            disabled={testStarted}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
          >
            {testStarted ? 'テスト実行中...' : 'テストを実行する'}
          </button>
          
          {testComplete && (
            <p className="mt-4 text-green-600">
              テスト完了！コンソールを確認してください。
            </p>
          )}
        </div>

        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">検証内容</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>PokemonSpecies型がなくても実行時にエラーにならない理由</li>
            <li>実際にAPIから返されるデータ構造</li>
            <li>TypeScriptコンパイルとランタイムでの挙動の違い</li>
            <li>型消去と実行時の動作</li>
          </ul>
          
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
            <p className="font-semibold text-yellow-700">注意事項:</p>
            <p className="text-sm">
              結果は開発者コンソールに表示されます。F12またはブラウザの検証ツールを開いてご確認ください。
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 