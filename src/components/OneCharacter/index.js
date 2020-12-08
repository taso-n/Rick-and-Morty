import { isFavoriteCharacter, handleFavCharacterClick } from '/src/helpers/favorites.js';

var characterWrapper = `
        <div class="oneCharacterHeader">
            <div id='stars'></div>
            <div id='stars2'></div>
            <div id='stars3'></div>
            <div class="avatar">
                <div id="imageSource" class="oneCharacterImageWrapper">
                </div>
                <div class="icon-wrapper">
                    
                </div>
            </div>
            <div id="headerInfo" class="information">
            </div>
        </div>
        <div class="info">
            <div class="oneCharacterTableWrapper">
                <table class="oneCharacterTableRoot">
                    <thead class="oneCharacterThead">
                        <tr class="oneCharacterTableHead">
                            <th>ID</th>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Air Date</th>
                            <th>Created</th>
                            <th>Actions</th>
                        </tr>
        
                    </thead>
                    <tbody id="episodesTable">
        
                    </tbody>
                </table>
            </div>
        </div>
`
let currCharacter;

export function OneCharacter(id) {
    console.log(id);
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then(response => response.json())
    .then(data => makeCharacter(data))
}

function makeCharacter(data){
    currCharacter = data
    const characterRoot = document.querySelector('#root')
    characterRoot.innerHTML = characterWrapper
    const episodesTable = document.querySelector('#episodesTable')
    const header = document.querySelector('#headerInfo')
    const image = document.querySelector('#imageSource')
    const favIcon = document.querySelector('.icon-wrapper')

    const isFav = isFavoriteCharacter(data)
    console.log(isFav, 22);
    favIcon.innerHTML = `<img id="characters/${data.id}" class="favoriteIcon" src="./src/images/${isFav ? `redHeart` : `heart`}.svg" />`
    image.innerHTML = `
    <img class="oneCharacterImage" src="${data.image}" />
    `
    header.innerHTML = `
    <span class="oneCharacterName">${data.name}</span>
    <span class="oneCharacterTitle">${data.gender}</span>
    `
    data.episode.forEach(element => {
        fetch(element)
            .then(response => response.json())
            .then(episodeData =>
            episodesTable.innerHTML = episodesTable.innerHTML +
            `<tr class="oneEpisode">
                <td class="episodeName">${episodeData.id}</td>
                <td class="episodeName">${episodeData.name}</td>
                <td class="episodeName">${episodeData.episode}</td>
                <td class="episodeName">${episodeData.air_date}</td>
                <td class="episodeName">${episodeData.created}</td>
                <td class="episodeName">
                    <a href="/#/episode/${episodeData.id}">
                        <img class="actionIcons" src="./src/images/link.svg" />
                    </a>
                    <img id="episodes/${episodeData.id}" class="actionIcons" src="./src/images/heart.svg" />
                </td>
            </tr>
            `
        )
    });
}


document.addEventListener('click', function (e) {
    if(e.target.id === `characters/${currCharacter?.id}`){
        handleFavCharacterClick(currCharacter)
    }
    if(e.target?.id?.toString().includes('episodes/')){
        // handleFavEpisodeClick()
    }
})
