let searchInputEl = document.getElementById("searchInput");
let searchResultsCont = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

function createAndAppendSearchResult(searchResult) {
    let {
        title,
        link,
        description
    } = searchResult;

    let resultCont = document.createElement("div");
    resultCont.classList.add("result-item", "col-10", "col-lg-5", "shadow", "mr-auto", "ml-auto");
    
    searchResultsCont.appendChild(resultCont);

    let titleEl = document.createElement("h1");
    titleEl.classList.add("result-title");
    titleEl.textContent = title;
    resultCont.appendChild(titleEl);

    let urlEl = document.createElement("a");
    urlEl.textContent = link;
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.classList.add("result-url");
    resultCont.appendChild(urlEl);

    let descriptionEl = document.createElement("p");
    descriptionEl.textContent = description;
    descriptionEl.classList.add("link-description");
    resultCont.appendChild(descriptionEl);

}

function displaySearchResults(searchResults) {
    for (let searchResult of searchResults) {
        createAndAppendSearchResult(searchResult);
    }
    spinner.classList.add("d-none");
}


function search(event) {
    if (event.key === "Enter") {
        spinner.classList.remove("d-none");
        searchResultsCont.textContent = '';
        let options = {
            method: "GET"
        };
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                console.log(jsonData);
                let {
                    search_results
                } = jsonData;
                displaySearchResults(search_results);
            });

    }
}
searchInputEl.addEventListener("keydown", search);