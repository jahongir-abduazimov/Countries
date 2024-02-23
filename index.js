"use strict"

let flagsWrapper = $('.flags-wrapper');
let inputSearch = $('#search-input')
let regions = $('#region');


let baseURL = "https://restcountries.com/v2"


const getPosts = async (reqURL) => {
    flagsWrapper.innerHTML = "<span class='loader'></span>";
    try {
        const response = await fetch(`${baseURL}/all`);
        if (response.status === 200) {
            const result = await response.json();
            flagsWrapper.innerHTML = "";
            renderAllFlags(result);
        }

    } catch (err) {
        flagsWrapper.innerHTML = `<h1 class="text-red-600 text-3xl">${err.message}</h1>`
    }
}

getPosts(baseURL);

function renderAllFlags(flagsList) {

    if (flagsList.length) {

        flagsList.forEach((el) => {

            const card = createElement('div', 'card w-[264px] rounded-xl overflow-hidden shadow-[0px_2px_5px_1px_silver] hover:shadow-[0px_5px_15px_1px_silver] duration-200 cursor-pointer', `
            
                <div class="h-[160px] flex items-center justify-center bg-[url(${el.flag})] bg-center bg-no-repeat bg-cover">
                    
                </div>
                <div class="h-[176px] p-6">
                    <h3 class="font-extrabold text-[18px] mb-3">${el.name}</h3>
                    <p class=""><strong>Population:</strong> ${el.population}</p>
                    <p><strong>Region:</strong> ${el.region}</p>
                    <p><strong>Capital:</strong> ${el.capital}</p>
                </div>
          
            `
            );
            flagsWrapper.appendChild(card);
        })
    } else {
        flagsWrapper.innerHTML = "NOT FOUND";
    }
}




async function searchCountries(searchTerm) {
    flagsWrapper.innerHTML = "<span class='loader'></span>";
    try {
        const response = await fetch(`${baseURL}/name/${searchTerm}`);
        const result = await response.json();
        flagsWrapper.innerHTML = ""
        renderAllFlags(result);
    } catch (e) {
        flagsWrapper.innerHTML = `<h1>${e.message}</h1>`;
    }
}




inputSearch.addEventListener('keyup', (e) => {

    if (e.keyCode == 13 && e.target.value.trim().length) {
        searchCountries(e.target.value.trim().toLowerCase());
    }

})


async function filterRegions(searchTerm) {
    flagsWrapper.innerHTML = "<span class='loader'></span>";
    try {
        const response = await fetch(`${baseURL}/region/${searchTerm}`);
        const result = await response.json();
        flagsWrapper.innerHTML = ""
        renderAllFlags(result);
    } catch (e) {
        flagsWrapper.innerHTML = `<h1>${e.message}</h1>`;
    }
}

regions.addEventListener('change', (e) => {
    filterRegions(e.target.value)
})

