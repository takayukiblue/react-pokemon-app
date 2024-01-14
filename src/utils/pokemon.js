// ポケモン一覧の取得
export const getAllPokemon = async (url, offset = 0) => {
  try {
    const response = await fetch(`${url}?offset=${offset}&limit=20`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// ポケモンの詳細データ取得
export const getPokemon = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
