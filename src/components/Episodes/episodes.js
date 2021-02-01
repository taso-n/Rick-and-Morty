let nextPage = ""
let prevPage = ""
let curPage = 1

var episodesTable = `
<div class="episodesTableWrapper">
        <table id="episodesTableRoot" class="episodesTableRoot">
            <thead class="episodesThead">
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
    } else {
        epsiodes.innerHTML = `<div class="loading"></div>`
    }
}

function fetchPage(page) {
    fetch(page)
    .then(response => response.json())
    .then(data => Episodes(data))
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
})