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

export function Episodes (data) {
    const epsiodes = document.querySelector('#root')
    epsiodes.innerHTML = episodesTable
    const tableBody = document.querySelector('#episodesTable')
    data.results.forEach(element => {
        tableBody.innerHTML = tableBody.innerHTML +
            `<tr class="oneEpisode">
                <td class="episodeName">${element.id}</td>
                <td class="episodeName">${element.name}</td>
                <td class="episodeName">${element.episode}</td>
                <td class="episodeName">${element.air_date}</td>
                <td class="episodeName">${element.created}</td>
                <td class="episodeName">act</td>
            </tr>
            `
    });
}
