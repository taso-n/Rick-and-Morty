import { isFavoriteEpisode, handleFavEpisodeClick } from '../../helpers/favorites.js'

var episodeWrapper = `
<div class="oneEpisodeWrapper">
    <div class="oneEpisodeRoot">
        <div id="oneEpisodeHeaderRoot">
        </div>
        <div id="oneEpisodeCharacterList">
        </div>
    </div>
</div>
`

export function OneEpisode({id}) {
    fetch(`https://rickandmortyapi.com/api/episode/${id}`)
    .then(response => response.json())
    .then(data => makeEpisode(data))
}

let currEpisode;

function makeEpisode(data){
    currEpisode = data
    const episodeRoot = document.querySelector('#root')
    episodeRoot.innerHTML = episodeWrapper
    const header = document.querySelector("#oneEpisodeHeaderRoot")
    const list = document.querySelector("#oneEpisodeCharacterList")
    let isFav = isFavoriteEpisode(data)

    header.innerHTML =`
        <div class="oneEpsiodeDetails">
            <span>Name: ${data.name}</span>
            <span>Air: ${data.air_date}</span>
            <span>Code: ${data.episode}</span>
            <span>Created: ${data.created}</span>
        </div>
        <span id="episodes/${data.id}" class="${isFav? 'markedAsFav' : 'starIcon'}">&#9733;</span>
    `
    
    data.characters.forEach(element => {
        fetch(element)
            .then(response => response.json())
            .then(characterData =>
                list.innerHTML = list.innerHTML +
            `
        <div class="oneEpisodeCharacter">
            <div class="oneEpisodeUpper">
                <div>
                    <p>id - ${characterData.id}</p>
                    <p>status - ${characterData.status}</p>
                    <p>species - ${characterData.species}</p>
                    <p>gender - ${characterData.gender}</p>
                    <div class="oneEpisodeCharacterActions">
                        <a href="#/character/${characterData.id}" data-navigo>
                            <img class="linkIcon" src="./src/images/link.svg" alt="linkIcon" />
                        </a>
                    </div>
                </div>
                <div class="oneEpisodeCharacterLeftSide">
                    <p>${characterData.name}</p>
                    <img src="${characterData.image}" alt="characterImage" />
                </div>
            </div>
            <div class="oneEpisodeCharacterFooter">
                <p>${characterData.created}</p>
            </div>
        </div>
        `
        )
    });
}

document.addEventListener('click', function (e) {
    if(e.target.id === `episodes/${currEpisode?.id}`){
        handleFavEpisodeClick(currEpisode)
    }
})


