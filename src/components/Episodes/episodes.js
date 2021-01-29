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

export function Episodes (data) {
    const epsiodes = document.querySelector('#root')
    if(data) {
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
    } else {
        epsiodes.innerHTML = `<div class="loading"></div>`
    }
}
