"use strict";

/*==================================
 APK World Game Loader
==================================*/

document.addEventListener("DOMContentLoaded", loadGame);

async function loadGame() {

    const params = new URLSearchParams(window.location.search);
    const slug = params.get("slug");

    if (!slug) {
        document.body.innerHTML =
        "<h2 style='text-align:center;margin-top:80px'>Game Not Found</h2>";
        return;
    }

    try {

        const response = await fetch("games/games/index.json");

        if (!response.ok)
            throw new Error("Unable to load data");

        const games = await response.json();

        const game = games.find(g => g.slug === slug);

        if (!game) {

            document.body.innerHTML =
            "<h2 style='text-align:center;margin-top:80px'>Game Not Found</h2>";

            return;

        }

        fillPage(game);

    }

    catch(error){

        console.error(error);

    }

}

/*==================================
 Fill Page
==================================*/

function fillPage(game){

document.title = game.title;

/* Hero */

setText("gameTitle",game.title);

setText("gameDescription",game.description);

setText("gameDeveloper",game.developer);

setText("gameVersion",game.version);

setText("gameSize",game.size);

setText("gameAndroid",game.android);

setText("gameCategory",game.category);

setImage("gameImage",game.thumbnail);

/* Download */

setText("downloadTitle",game.title);

setText("downloadDescription",game.description);

setLink("downloadBtn",game.game_url);

setLink("downloadButton",game.game_url);

/* Screenshots */

setImage("ss1",game.screenshot1);

setImage("ss2",game.screenshot2);

setImage("ss3",game.screenshot3);

setImage("ss4",game.screenshot4);

setImage("ss5",game.screenshot5);

/* Body */

setHTML("gameBody",game.body || "");

/* Features */

const featureList=document.getElementById("featureList");

if(featureList){

featureList.innerHTML="";

if(Array.isArray(game.features)){

game.features.forEach(item=>{

featureList.innerHTML+=`<li>${item}</li>`;

});

}

}

/* Related Games */

loadRelated(game);

hideLoader();

}

/*==================================
 Related Games
==================================*/

async
