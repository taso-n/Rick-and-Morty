var characterWrapper = `
        <div class="oneCharacterHeader">
            <div id='stars'></div>
            <div id='stars2'></div>
            <div id='stars3'></div>
            <div class="avatar">
                <div id="imageSource" class="oneCharacterImageWrapper">
                </div>
                <div class="icon-wrapper">
                    <img class="favoriteIcon" src="./src/images/heart.svg" />
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

export function OneCharacter(id) {
    console.log(id);
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then(response => response.json())
    .then(data => makeCharacter(data))
}

function makeCharacter(data){
    const characterRoot = document.querySelector('#root')
    characterRoot.innerHTML = characterWrapper
    const episodesTable = document.querySelector('#episodesTable')
    const header = document.querySelector('#headerInfo')
    const image = document.querySelector('#imageSource')
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
                <td class="episodeName">act</td>
            </tr>
            `
        )
    });
}

