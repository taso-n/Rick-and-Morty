
export const getFavCharactersList = () => {
  var favorites = JSON.parse(localStorage.getItem('favoriteCharacters')) || [];
  return favorites
}

export const isFavoriteCharacter = (character) => {
  var favorites = JSON.parse(localStorage.getItem('favoriteCharacters')) || [];
  if(favorites.find((el) => el.id === character.id)){
    return true
  }
  return false
}

export const handleFavCharacterClick = (character) => {
  var favorites = JSON.parse(localStorage.getItem('favoriteCharacters')) || [];
  if(isFavoriteCharacter(character)){
    favorites = favorites.filter((el) => el.id !== character.id)
    localStorage.setItem('favoriteCharacters', JSON.stringify(favorites))
  } else {
    favorites.push(character)
    localStorage.setItem('favoriteCharacters', JSON.stringify(favorites))
  }
}



export const getFavEpisodesList = () => {
  var favorites = JSON.parse(localStorage.getItem('favoriteEpisodes')) || [];
  return favorites
}

export const isFavoriteEpisode = (episode) => {
  var favorites = JSON.parse(localStorage.getItem('favoriteEpisodes')) || [];
  if(favorites.find((el) => el.id === episode.id)){
    return true
  }
  return false
}

export const handleFavEpisodeClick = (episode) => {
  var favorites = JSON.parse(localStorage.getItem('favoriteEpisodes')) || [];
  if(isFavoriteEpisode(episode)){
    favorites = favorites.filter((el) => el.id !== episode.id)
    localStorage.setItem('favoriteEpisodes', JSON.stringify(favorites))
  } else {
    favorites.push(episode)
    localStorage.setItem('favoriteEpisodes', JSON.stringify(favorites))
  }
}

