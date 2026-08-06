"use strict";

const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

fetch("games/games/index.json")
.then(res => res.json())
.then(games => {

    const game = games.find(item => item.slug === slug);

    if (!game) {
        document.body.innerHTML =
        "<h2 style='text-align:center;margin-top:80px'>Game Not Found</h2>";
        return;
    }

    // Page Title
    document.title = game.title;

    // Hero
    if(document.getElementById("gameTitle"))
        document.getElementById("gameTitle").textContent = game.title;

    if(document.getElementById("gameDescription"))
        document.getElementById("gameDescription").textContent = game.description;

    if(document.getElementById("gameImage"))
        document.getElementById("gameImage").src = game.thumbnail;

    // Download Buttons
    if(document.getElementById("downloadBtn"))
        document.getElementById("downloadBtn").href = game.game_url;

    if(document.getElementById("downloadButton"))
        document.getElementById("downloadButton").href = game.game_url;

    if(document.getElementById("downloadTitle"))
        document.getElementById("downloadTitle").textContent = game.title;

    if(document.getElementById("downloadDescription"))
        document.getElementById("downloadDescription").textContent = game.description;

    // Meta Details
    const version = document.getElementById("gameVersion");
    if(version) version.textContent = game.version || "Latest";

    const size = document.getElementById("gameSize");
    if(size) size.textContent = game.size || "--";

    const android = document.getElementById("gameAndroid");
    if(android) android.textContent = game.android || "5.0+";

    const developer = document.getElementById("gameDeveloper");
    if(developer) developer.textContent = game.developer || "APK World";

    const category = document.getElementById("gameCategory");
    if(category) category.textContent = game.category || "Game";

    // Screenshots
    if(document.getElementById("ss1"))
        document.getElementById("ss1").src =
        game.screenshot1 || game.thumbnail;

    if(document.getElementById("ss2"))
        document.getElementById("ss2").src =
        game.screenshot2 || game.thumbnail;

    if(document.getElementById("ss3"))
        document.getElementById("ss3").src =
        game.screenshot3 || game.thumbnail;

    if(document.getElementById("ss4"))
        document.getElementById("ss4").src =
        game.screenshot4 || game.thumbnail;

    if(document.getElementById("ss5"))
        document.getElementById("ss5").src =
        game.screenshot5 || game.thumbnail;

    // MOD Features
    const list = document.getElementById("featureList");

    if(list && Array.isArray(game.features)){

        list.innerHTML="";

        game.features.forEach(feature=>{

            const li=document.createElement("li");

            li.textContent=feature;

            list.appendChild(li);

        });

    }

    // Hide Loader
    const loader=document.getElementById("loader");

    if(loader){
        loader.style.display="none";
    }

})
.catch(error=>{

    console.error(error);

    const loader=document.getElementById("loader");

    if(loader){
        loader.style.display="none";
    }

});
