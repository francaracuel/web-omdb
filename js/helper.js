// Search
const beforeSearch = () => {
    $("#resultsTableContainer").html("Please wait...");
    $("#resultsTextContainer").html("")
}

const successSearch = (response, extraData) => {
    if(response && response.Response && response.Response === "True"){
        // Total results
        const resultsText = response.totalResults === 1 ? "Result" : "Results"
        $("#resultsTextContainer").html(`<span>${response.totalResults} ${resultsText} 
            for "${extraData.searchedValue}".</span>`)

        // Table
        $("#resultsTableContainer").html(`
        <table class="resultsTable" cellspacing="0" cellpadding="5">
            <tbody id='bodyTable'>
            </tbody>
        </table>`);
        response.Search.map((element, index) =>
            $("#bodyTable").append(`
            <tr class="rowResultTable">
                <td>
                    <input type="hidden" value="${element.imdbID}"/>
                    <a href="#" onclick="showElement('${element.imdbID}', ${index})">
                        <img
                            class="resultsImg"
                            src="${element.Poster}"
                            alt="${element.Title}"
                            height="42"
                            width="42"
                        />
                    </a>
                </td>
                <td>
                    <a href="#" onclick="showElement('${element.imdbID}', ${index})">
                        ${element.Title} (${element.Year})
                    </a>
                </td>
                <td>
                    <a href="#" onclick="showElement('${element.imdbID}', ${index})">
                        (${showResultTypeElement(element.Type)})
                    </a>
                </td>
            </tr>`))
        
    } else{
        $("#resultsTableContainer").html("");
        $("#resultsTextContainer").html(`<span>${response.Error}</span>`)
    }
}

const showSearchTypeElement = () => {
    typeSearch.forEach(element => 
        $("#search-select").append(`<option>${element}</option>`))
}

const getTypeSearch = (selectedValue) => {
    switch(selectedValue){
        case "Movies":
            return "movie"
        case "Episodes":
            return "episode"
        case "Series":
            return "series"
        default:
            return ""
    }
    // Another option
    /*
    let type = ""
    switch(selectedValue){
        case "Movies":
            type = "movie"
        case "Episodes":
            type = "episode"
        case "Series":
            type = "series"
    }
    return type
    */
}

const showResultTypeElement = (element) => {
    switch(element){
        case "movie":
            return "Movie"
        case "episodes":
            return "Episodes"
        case "series":
            return "Serie"
        default:
            return "NA"
    }
}

const changeRowColor = (index) => {
    $(`.rowResultTable`).css("background-color", "white")
    $(`.rowResultTable:nth-child(${index+1})`).css("background-color", "#d1e8ff")
}