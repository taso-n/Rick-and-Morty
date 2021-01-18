import { isFavoriteCharacter, handleFavCharacterClick } from '../../helpers/favorites.js'

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
        <div class="oneCharacterInfo">
            <div class="oneCharacterTableWrapper">
                <table class="oneCharacterTableRoot">
                    <thead class="oneCharacterThead">
                        <tr class="oneCharacterTableHead">
                            <th>ID</th>
                            <th>Name</th>
                            <th>Code</th>
                            <th class="episodeDate">Air Date</th>
                            <th class="episodeDate">Created</th>
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

export function OneCharacter({id}) {
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
    favIcon.innerHTML = `<span id="characters/${data.id}" class="${isFav ? 'markedAsFavCharacter' : 'starIconCharacter'}">&#9733;</span>`
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
            `<tr class="oneCharacterEpisode">
                <td class="episodeName">${episodeData.id}</td>
                <td class="episodeName">${episodeData.name}</td>
                <td class="episodeName">${episodeData.episode}</td>
                <td class="episodeName episodeDate">${episodeData.air_date}</td>
                <td class="episodeName episodeDate">${episodeData.created}</td>
                <td class="episodeName">
                    <a href="/#/episode/${episodeData.id}">
                        <img class="actionIcons" src="./src/images/link.svg" />
                    </a>
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
})
