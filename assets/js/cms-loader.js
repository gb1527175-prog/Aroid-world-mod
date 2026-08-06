"use strict";

/*==================================
 APK World CMS Loader
==================================*/

document.addEventListener("DOMContentLoaded", () => {
    loadGames();
});

async function loadGames() {

    const grid = document.getElementById("latest-grid");
    const loader = document.getElementById("latest-loader");

    if (!grid) return;

    try {

        const response = await fetch("games/games/index.json");

        if (!response.ok) {
            throw new Error("Unable to load games.");
        }

        const games = await response.json();

        loader.style.display = "none";

        if (!games.length) {

            grid.innerHTML = `
                <p class="no-posts">
                    No Games Found
                </p>
            `;

            return;
        }

        grid.innerHTML = "";

        games.forEach(game => {

            grid.innerHTML += createCard(game);

        });

    }

    catch (error) {

        console.error(error);

        loader.style.display = "none";

        grid.innerHTML = `
            <p class="no-posts">
                Failed to load games.
            </p>
        `;

    }

}

/*==================================
 Create Card
==================================*/

function createCard(game){

return `

<article class="grid-card">

<a href="game.html?slug=${encodeURIComponent(game.slug)}">

<img
src="${game.thumbnail}"
alt="${game.title}"
loading="lazy">

<h3>${game.title}</h3>

<p>${game.description}</p>

<div class="rating">

★★★★★

<span>${game.rating || "4.8"}</span>

</div>

<span class="download-btn">

Download

</span>

</a>

</article>

`;

}

/*==================================
 Search
==================================*/

function filterGames(keyword){

const cards=document.querySelectorAll(".grid-card");

keyword=keyword.toLowerCase();

cards.forEach(card=>{

const title=card.innerText.toLowerCase();

card.style.display=
title.includes(keyword)
? ""
: "none";

});

}

const search=document.getElementById("searchInput");

if(search){

search.addEventListener("keyup",e=>{

filterGames(e.target.value);

});

}
