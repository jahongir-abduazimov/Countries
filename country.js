"use strict";

let darkMode = $('#dark-btn');
let body = $('body');
let title = $('title')

let countryWrapper = $('.country-wrapper')
let country_name = localStorage.getItem('data-country')

let URL = "https://restcountries.com/v2"

async function fetchCountry(URL, name) {
    try {
        let response = await fetch(`${URL}/name/${name}?fullText=true`);
        let result = await response.json();
        renderCountry(result[0])
    } catch (err) {
        console.log(err);
    }
}
fetchCountry(URL, country_name)

function renderCountry(el) {
    title.innerHTML = `${el.name}`
    countryWrapper.innerHTML = `
    <div class="mb-[30px] flex justify-center items-center">
        <img class="w-full md:max-w-[560px]" src="${el.flag}" alt="img">
    </div>
    <div class="w-full md:w-[550px]">
        <p class="font-extrabold text-[32px] pb-5">${el.name}</p>
        <div class="md:flex md:justify-between">
            <div class="flex flex-col gap-2 mb-5">
                <p>Native Name: <span class="font-light">${el.nativeName}</span></p>
                <p>Population: <span class="font-light">${el.population}</span></p>
                <p>Region: <span class="font-light">${el.region}</span></p>
                <p>Sub Region: <span class="font-light">${el.subregion}</span></p>
                <p>Capital: <span class="font-light">${el.capital}</span></p>
            </div>
            <div class="flex flex-col gap-2">
                <p>Top Level Domain: <span class="font-light">${el.topLevelDomain}</span></p>
                <p>Currencies: <span class="font-light">${el.currencies[0].name}</span></p>
                <p>Languages: <span class="font-light">${el.languages[0].nativeName}</span></p>
            </div>
        </div>
    </div>
    `
}



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