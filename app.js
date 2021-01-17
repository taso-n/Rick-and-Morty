import { Characters } from './src/components/CharacterCards/index.js'
import { Episodes } from './src/components/Episodes/episodes.js'
import { OneCharacter } from './src/components/OneCharacter/index.js'
import { OneEpisode } from './src/components/OneEpisode/index.js'
import { FavoriteCharacters } from './src/components/FavoriteCharacters/index.js'
import { FavoriteEpisodes } from './src/components/FavoriteEpisodes/index.js'

var characterData;
var episodesData;


fetch("https://rickandmortyapi.com/api/character")
  .then(response => response.json())
  .then(data => characterData = data)

fetch("https://rickandmortyapi.com/api/episode")
  .then(response => response.json())
  .then(data => episodesData = data)

const myRoutes = {
  '/characters': () => {
    new Characters(characterData);
  },
  '/episodes': () => {
    new Episodes(episodesData);
  },
  '/favoriteCharacters': () => {
    new FavoriteCharacters();
  },
  '/favoriteEpisodes': () => {
    new FavoriteEpisodes();
  },
  '/character/:id/': (id) => {
    new OneCharacter(id)
  },
  '/episode/:id/': (id) => {
    new OneEpisode(id)
  }
}

var root = null;
var useHash = true;
var hash = 'Rick-and-Morty/#'

window.addEventListener("load", () => {
  var router = new Navigo(root, useHash, hash);
  router.on(myRoutes).resolve();
})