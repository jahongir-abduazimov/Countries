"use strict"

let flagsWrapper = $('.flags-wrapper');
let inputSearch = $('#search-input')
let regions = $('#region');
let darkMode = $('#dark-btn');
let body = $('body');


let baseURL = "https://restcountries.com/v2"


const getPosts = async () => {
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


// ---------------- Search Input Function ---------------------------

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


// --------------- Filter Regions Function ------------------

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


// ------------- Dark Mode Function--------------------

function darkLightMode() {
    body.classList.toggle('dark-mode')

    if (body.classList.contains('dark-mode')) {
        darkMode.innerHTML = "<i class='bi bi-brightness-high'></i><span>Light Mode</span>"
        localStorage.setItem('dark-mode', true)
    } else {
        darkMode.innerHTML = "<i class='bi bi-moon'></i><span>Dark Mode</span>"
        localStorage.setItem('dark-mode', false)
    }
}

function localDarkMode() {
    
    let isDark = localStorage.getItem('dark-mode')

    if (isDark == 'true') {
        darkMode.innerHTML = "<i class='bi bi-brightness-high'></i><span>Light Mode</span>"
        body.classList.add('dark-mode')
    } else {
        darkMode.innerHTML = "<i class='bi bi-moon'></i><span>Dark Mode</span>"
        body.classList.remove('dark-mode')
    }
}

localDarkMode()

darkMode.addEventListener('click', () => {
    darkLightMode()
})
