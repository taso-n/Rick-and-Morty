import { getFavEpisodesList } from '/src/helpers/favorites.js';

var episodesTable = `
<div class="episodesTableWrapper">
        <table class="episodesTableRoot">
            <thead class="episodesThead">
                <tr class="episodesTableHead">
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
                        <td class="episodeName">${element.air_date}</td>
                        <td class="episodeName">${element.created}</td>
                        <td class="episodeName">
                            <a href="/#/episode/${element.id}">
                                <img class="actionIcons" src="./src/images/link.svg" />
                            </a>
                            <img class="actionIcons" src="./src/images/redHeart.svg" />
                        </td>
                </tr>
                `
        });
    } else {
        epsiodes.innerHTML = 
        `<div class="noData">You don't have any favorite episodes yet</div>`
    }
}
