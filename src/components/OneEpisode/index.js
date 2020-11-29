import { isFavoriteEpisode, handleFavEpisodeClick } from '/src/helpers/favorites.js';

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

export function OneEpisode(id) {
    console.log(id);
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
        <img id="episodes/${data.id}" class="favoriteIcon" src="./src/images/${isFav ? `redHeart` : `heart`}.svg" />
    `
    
    data.characters.forEach(element => {
        fetch(element)
            .then(response => response.json())
            .then(characterData =>
                list.innerHTML = list.innerHTML +
            `
        <div class="oneEpisodeCharacter">
            <div>
                <p>id - ${characterData.id}</p>
                <p>status - ${characterData.status}</p>
                <p>species - ${characterData.species}</p>
                <p>gender - ${characterData.gender}</p>
                <div class="oneEpisodeCharacterActions">
                    <a href="/#/character/${characterData.id}">
                        <img class="favoriteIcon" src="./src/images/link.svg" />
                    </a>
                    <img class="favoriteIcon" src="./src/images/heart.svg" />
                </div>
            </div>
            <div class="oneEpisodeCharacterLeftSide">
                <p>${characterData.name}</p>
                <img src="${characterData.image}"/>
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


