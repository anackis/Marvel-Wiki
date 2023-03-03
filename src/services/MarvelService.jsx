
import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const {loading, error, request, clearError} = useHttp();

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = 'apikey=0261b2502426a3f547666f20ae1027dc';
  const _baseOffset = 210;
  const _comicsOffset = 20000;

  /// New version in http.hook.js
  // getResource = async (url) => {
  //   let res = await fetch(url);
  //   if (!res.ok) {
  //     throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  //   }
  //   return await res.json();
  // }

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  }
  const getCharacter = async (id) => {
		const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
		return _transformCharacter(res.data.results[0]);
	};
  const getCharacterByName = async (name) => {
		const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
		return res.data.results.map(_transformCharacter);
	};

  const getAllComics = async (comicsOffset = _comicsOffset) => {
    const res = await request(`${_apiBase}comics?orderBy=onsaleDate&limit=8&offset=${comicsOffset}&${_apiKey}`);
    return res.data.results.map(_transformComics);
  }
  const getComic = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    console.log(res);
		return _transformComics(res.data.results[0]);
	};

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items
    }
  }

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      price: comics.prices[0].price === 0 ? 'NOT AVAILABLE' : comics.prices[0].price + '$',
      thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,

      description: comics.description || 'There is no description',
      pageCount: comics.pageCount ? `${comics.pageCount} pages.` : 'No inforamtion about the number of pages',
      language: comics.textObjects.language || 'en-us'
    }
  }

  return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComic, getCharacterByName}
}



export default useMarvelService;