// Search
const beforeSearch = () => {
    $("#resultsTableContainer").html("Please wait...");
    $("#resultsTextContainer").html("")
}

const successSearch = (response, extraData) => {
    cleanDetailHTML()
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
                    <a onclick="showElement('${element.imdbID}', ${index})">
                        <img
                            class="resultsImg"
                            src="${element.Poster}"
                            alt="${element.Title}"
                            width="50"
                        />
                    </a>
                </td>
                <td>
                    <a onclick="showElement('${element.imdbID}', ${index})">
                        ${element.Title} (${element.Year})
                    </a>
                </td>
                <td>
                    <a onclick="showElement('${element.imdbID}', ${index})">
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

// Details
const beforeDetails = () => {
    $("#detailContainer").html("Please wait...");
}

const successDetails = (response, extraData) => {
    if(response && response.Response && response.Response === "True"){
        $("#detailContainer").css("border", "solid 1px black")
        $("#detailContainer").html(`
        <img
            class="resultsImg"
            src="${response.Poster}"
            alt="${response.Title}"
            width="200"
        />
        <div id="contentDetailContainer">
            <div>
                <span>${response.Title} (${response.Year})</span>
            </div>
            <div>
                <span>${response.Runtime} | ${response.Genre} | ${response.Released}</span>
            </div>
            <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
        </div>
        <div>
            <span>${response.imdbRating}</span>/10
        </div>
        `)
    } else{
        $("#detailContainer").html(`<span>${response.Error}</span>`)
    }
}

const cleanDetailHTML = () => {
    $("#detailContainer").html("")
    $("#detailContainer").css("border", "0px")
}
