const post = (params, before, success, extraData) => {
    let url = `${API_URL}?apikey=${API_KEY}`
    Object.entries(params).forEach(([key, value]) => {
        url += `&${key}=${value}`
    });
    $.ajax({
        url: url,
        type: "POST",
        beforeSend: () => before,
        success:  (response) => success(response, extraData)
    });
}
