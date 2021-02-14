import { getFavEpisodesList } from '../../helpers/favorites.js'

var episodesTable = `
<div class="episodesTableWrapper">
        <table class="episodesTableRoot">
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

export function FavoriteEpisodes () {
    const data = getFavEpisodesList()
    const epsiodes = document.querySelector('#root')
    if(data.length > 0) {
        epsiodes.innerHTML = episodesTable
        const tableBody = document.querySelector('#episodesTable')
        data.forEach(element => {
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
                            <span class="'markedAsFav'">&#9733;</span>
                        </td>
                </tr>
                `
        });
        const footer = document.getElementById('footer')
        if(data.length <= 4) {
            const size = data.length * 70 + "px"
            footer.style.marginTop = `calc(50vh - 8.125rem - ${size})`
        } else {
            footer.style.marginTop = '4.375rem'
        }
    } else {
        epsiodes.innerHTML = 
        `<div class="noData">You don't have any favorite episodes yet</div>`
        const footer = document.getElementById('footer')
        footer.style.marginTop = 'calc(50vh -  16.9375rem)'
    }
}
