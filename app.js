import Router from './router.js';
import { Characters } from './src/components/CharacterCards/index.js'
import { Episodes } from './src/components/Episodes/episodes.js'
import { OneCharacter } from './src/components/OneCharacter/index.js'
import { OneEpisode } from './src/components/OneEpisode/index.js'
import { FavoriteCharacters } from './src/components/FavoriteCharacters/index.js'
import { FavoriteEpisodes } from './src/components/FavoriteEpisodes/index.js'


const router = new Router({
  mode: 'hash',
  root: '/characters'
});

var characterData;
var episodesData;


fetch("https://rickandmortyapi.com/api/character")
  .then(response => response.json())
  .then(data => characterData = data)

fetch("https://rickandmortyapi.com/api/episode")
  .then(response => response.json())
  .then(data => episodesData = data)

router
  .add(/characters/, () => {
    new Characters(characterData);
  })
  .add(/episodes/, () => {
    new Episodes(episodesData);
  })
  .add(/favoriteCharacters/, () => {
    new FavoriteCharacters();
  })
  .add(/favoriteEpisodes/, () => {
    new FavoriteEpisodes();
  })
  .add(/character\/(.*)/, (id) => {
    new OneCharacter(id)
  })
  .add(/episode\/(.*)/, (id) => {
    new OneEpisode(id)
  })
  .add('', () => {
    // general controller
    console.log('welcome in catch all controller');
  });