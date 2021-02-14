var nextPage = "";
var prevPage = "";
var curPage = 1;

export function Characters (data) {
    const characters = document.querySelector('#root')
    if(data) {
        nextPage = data.info.next
        prevPage = data.info.prev
        characters.innerHTML = `
            <div id="cardsContainer" class='cards-container'></div>
        `
        const container = document.getElementById('cardsContainer')
        data.results.forEach(element => {
            container.innerHTML = container.innerHTML +
                `
                <a href="#/character/${element.id}/" data-navigo>
                    <div class="one-character">
                        <div class="image-wrapper">
                            <img class="image" src=${element.image} alt="characterImage" />
                        </div>
                        <div class="info">
                            <span class="name">${element.name}</span>
                            <span class="species">${element.species} ${element.gender}</span>
                            <span class="title">Origin</span>
                            <span class="location">${element.origin.name}</span>
                            <span class="title">Current location</span>
                            <span class="location">
                                <img class="locationIcon" src="./src/images/location.svg" alt="location" />
                                ${element.location.name}
                            </span>
                        </div>
                    </div>
                </a>
                `
        });
        container.innerHTML = container.innerHTML + `
        <div class="paginationWrapper">
            <div class="paginationContainer">
                <button id="characterPrev" href="#" class="paginationArrow">&laquo;</button>
                ${curPage} / ${data.info.pages}
                <button id="characterNext" href="#" class="paginationArrow">&raquo;</button>
            </div>
        </div>
        `
        const footer = document.getElementById('footer')
        footer.style.marginTop = '4.375rem'
    } else {
        characters.innerHTML = `<div class="loading"></div>`
    }
}

fetch("https://rickandmortyapi.com/api/character")
  .then(response => response.json())
  .then(data => Characters(data))

function fetchPage(page) {
    fetch(page)
    .then(response => response.json())
    .then(data => Characters(data))
}

document.addEventListener('click', function (e) {
    if(e.target.id === 'characterNext') {
        if(nextPage) {
            fetchPage(nextPage)
            curPage += 1
        }
    }
    if(e.target.id === 'characterPrev') {
        if(prevPage) {
            fetchPage(prevPage)
            curPage -= 1
        }
    }
    if(e.target.className === 'link') {
        nextPage = ""
        prevPage = ""
        curPage = 1
    }
})