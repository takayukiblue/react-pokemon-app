import { useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import Card from './components/Card';
import { useQuery } from '@tanstack/react-query';

function App() {
  const initialURL = 'https://pokeapi.co/api/v2/pokemon/';
  const [offset, setOffset] = useState(0);

  // 前ページ
  const handlePrevPage = () => {
    if (offset === 0) {
      return;
    }
    setOffset((prev) => prev - 20);
  };

  // 次ページ
  const handleNextPage = () => {
    setOffset((prev) => prev + 20);
  };

  // ポケモン一覧を取得するuseQuery
  const { data: pokemonList, isLoading: isLoading1 } = useQuery({
    queryKey: ['pokemonList', offset],
    queryFn: () => getAllPokemon(initialURL, offset),
  });

  // ポケモンの詳細データ取得ラッパー
  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    return _pokemonData;
  };

  // ポケモンの詳細データを取得するuseQuery
  const { data: pokemonData, isLoading: isLoading2 } = useQuery({
    queryKey: ['pokemonData', pokemonList],
    queryFn: () => loadPokemon(pokemonList.results),
    enabled: !!pokemonList, // ポケモン一覧取得が完了している場合に動作させる
  });

  // ポケモンデータの表示
  return (
    <div className="App">
      {isLoading1 || isLoading2 ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {/* 各ポケモンの表示 */}
          <div className="pokemonCardContainer">
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon} />;
            })}
          </div>

          {/* PrevボタンとNextボタン */}
          <div style={{ margin: '50px' }}>
            <button onClick={handlePrevPage}>Prev</button>
            <button onClick={handleNextPage}>Next</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
