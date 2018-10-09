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
        $("#resultsTableContainer").html("<table><tbody id='bodyTable'></tbody></table>");
        response.Search.map((element) =>
            $("#bodyTable").append(`
            <tr>
                <td>${element.Poster}</td>
                <td>${element.Title}</td>
                <td>${element.Year}</td>
                <td>${element.Type}</td>
                <td>${element.imdbID}</td>
            </tr>`))
        
    } else{
        $("#resultsTableContainer").html("");
        $("#resultsTextContainer").html(`<span>${response.Error}</span>`)
    }
}

const showTypeMovie = () => {
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
