export function Characters (data) {
    const characters = document.querySelector('#root')
    if(data) {
        characters.innerHTML = `
            <div id="#cardsContainer" class='cards-container'></div>
        `
        const container = document.getElementById('#cardsContainer')
        data.results.forEach(element => {
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
        characters.innerHTML = `<div class="loading"></div>`
    }
}


fetch("https://rickandmortyapi.com/api/character")
  .then(response => response.json())
  .then(data => Characters(data))