const search = (searchedValue, selectedValue, cleanHTML = true) => {
    searchedValue = !searchedValue ?
        $("#search-title").val() : searchedValue
    selectedValue = !selectedValue ? 
        getTypeSearch($("#search-select option:selected").text()) : selectedValue
    const page = cleanHTML ? 1 : $("#page").val()
    post({
        s: searchedValue,
        type: selectedValue,
        page: page
    }, beforeSearch, successSearch, {
            searchedValue: searchedValue,
            selectedValue: selectedValue,
            page: page,
            cleanHTML: cleanHTML
        })
}

const showElement = (id, index) => {
    changeRowColor(index)
    post({
        i: id
    }, beforeDetails, successDetails)
}