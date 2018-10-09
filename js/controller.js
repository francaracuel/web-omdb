const search = () => {
    const searchedValue = $("#search-title").val()
    const selectedValue = getTypeSearch($("#search-select option:selected").text())
    post({
        s: searchedValue,
        type: selectedValue
    }, beforeSearch, successSearch, { searchedValue: searchedValue})
}
