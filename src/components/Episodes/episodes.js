let nextPage = ""
let prevPage = ""
let curPage = 1

var episodesTable = `
<div class="episodesTableWrapper">
        <table id="episodesTableRoot" class="episodesTableRoot">
            <thead class="episodesThead">
                <tr class="searchEpisodeHeader">
                    <th class="searchWrapper">
                        <div class="searchBox">
                            <input id="episodeByNameInput" class="searchInput" type="text" placeholder="Search episode by name" />
                            <button id="episodeByName" class="searchButton">
                                <span id="episodeByNameIcon" class="searchIcon">
                                &#9906
                                </span>
                            </button>
                        </div>
                    </th>
                </tr>
                <tr class="episodesTableHead">
                    <th>ID</th>
                    <th>Name</th>
                    <th>Code</th>
                    <th class="episodeDate">Air Date</th>
                    <th class="episodeDate">Created</th>
                    <th>View episode</th>
                </tr>

            </thead>
            <tbody id="episodesTable">

            </tbody>
        </table>
    </div>
`

export function Episodes (data) {
    const epsiodes = document.querySelector('#root')
    if(data) {
        nextPage = data.info.next
        prevPage = data.info.prev
        epsiodes.innerHTML = episodesTable
        const tableBody = document.querySelector('#episodesTable')
        data.results.forEach(element => {
            tableBody.innerHTML = tableBody.innerHTML +
                `
                <tr class="oneEpisode">
                        <td class="episodeName">${element.id}</td>
                        <td class="episodeName">${element.name}</td>
                        <td class="episodeName">${element.episode}</td>
                        <td class="episodeName episodeDate">${element.air_date}</td>
                        <td class="episodeName episodeDate">${element.created}</td>
                        <td class="episodeName">
                            <a href="#/episode/${element.id}" data-navigo>
                                <img class="actionIcons" src="./src/images/link.svg" alt="linkIcon" />
                            </a>
                        </td>
                </tr>
                `
        });
        const tableContainer = document.querySelector("#episodesTableRoot")

        tableContainer.innerHTML = tableContainer.innerHTML + `
        <div class="paginationWrapperEpisodes">
            <div class="paginationContainer">
                <button id="epsiodePrev" href="#" class="paginationArrow">&laquo;</button>
                ${curPage} / ${data.info.pages}
                <button id="epsiodeNext" href="#" class="paginationArrow">&raquo;</button>
            </div>
        </div>
        `
        const footer = document.getElementById('footer')
        if(data.results.length <= 4) {
            const size = data.results.length * 70 + "px"
            footer.style.marginTop = `calc(50vh - 8.125rem - ${size})`
        } else {
            footer.style.marginTop = '4.375rem'
        }
    } else {
        epsiodes.innerHTML = `<div class="loading"></div>`
    }
}

function NoEpisodeFound () {
    const epsiodes = document.querySelector('#root')
    epsiodes.innerHTML = `
    <div class="noData">No episode found</div>`
    const footer = document.getElementById('footer')
    footer.style.marginTop = 'calc(50vh -  16.9375rem)'
}

function fetchPage(page) {
    fetch(page)
    .then(response => response.json())
    .then(data => Episodes(data))
}

function findEpisode(episodeName) {
    fetch(`https://rickandmortyapi.com/api/episode/?name=${episodeName}&`)
        .then(async(response) => {
            if(response.ok) {
                let res = await response.json()
                Episodes(res)
            } else {
                NoEpisodeFound()
            }
        })
}

document.addEventListener('click', function (e) {
    if(e.target.id === 'epsiodeNext') {
        if(nextPage) {
            fetchPage(nextPage)
            curPage += 1
        }
    }
    if(e.target.id === 'epsiodePrev') {
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
    if(e.target.id === 'episodeByName' || e.target.id === 'episodeByNameIcon') {
        const inputValue = document.getElementById('episodeByNameInput').value
        if(inputValue) {
            findEpisode(inputValue)
        }
    }
})