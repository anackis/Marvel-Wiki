import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
// import MarvelService from './services/MarvelService';
import './style/style.scss';

// const marvelService = new MarvelService();
// marvelService.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item.name )));
// marvelService.getCharacter(1011052).then(res => res.data.results);
// console.log(marvelService.getCharacter(1011052).then(res => res.data.results));


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

