"use strict"

let flagsWrapper = $('.flags-wrapper');
let inputSearch = $('#search-input')


let renderURL = "https://restcountries.com/v2/all"

function getPosts(reqURL) {
    fetch(reqURL)
    .then((response => response.json()))
    .then((result => renderAllFlags(result)))
    .catch((err => console.log(err)))
}
getPosts(renderURL)

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
            flagsWrapper.appendChild(card)
        })
    } else {
        flagsWrapper.innerHtml('Not found')
    }
}

