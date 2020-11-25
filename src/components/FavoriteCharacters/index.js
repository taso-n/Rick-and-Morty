import { getFavCharactersList } from '/src/helpers/favorites.js';


export function FavoriteCharacters () {
    const data = getFavCharactersList()
    console.log(data);
    const characters = document.querySelector('#root')
    if(data.length > 0) {
        characters.innerHTML = `
        <div id="#cardsContainer" class='cards-container'></div>
        `
        const container = document.getElementById('#cardsContainer')
            data.forEach(element => {
                container.innerHTML = container.innerHTML +
                `
                <a href="/#/character/${element.id}">
                <div class="one-character">
                    <div class="image-wrapper">
                        <img class="image" src=${element.image} />
                    </div>
                    <div class="info">
                        <span class="name">${element.name}</span>
                        <span class="species">${element.species} ${element.gender}</span>
                        <span class="title">Origin</span>
                        <span class="location">${element.origin.name}</span>
                        <span class="title">Current location</span>
                        <span class="location">
                            <img class="locationIcon" src="./src/images/location.svg"/>
                            ${element.location.name}
                        </span>
                    </div>
                </div>
                </a>
                `
            });
    } else {
        characters.innerHTML =
        `<div class="noData">You don't have any favorite characters yet</div>`
    }

}