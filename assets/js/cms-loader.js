/*==================================================
  APK World
  CMS Game Loader
  assets/js/cms-loader.js
==================================================*/

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    loadGames();

});


async function loadGames(){

    const gameContainer = document.getElementById("games");

    if(!gameContainer) return;


    try{

        const response = await fetch("/games/index.json");


        if(!response.ok){

            throw new Error("Games data not found");

        }


        const games = await response.json();


        gameContainer.innerHTML = "";


        games.forEach(game => {


            const card = document.createElement("article");

            card.className = "grid-card";


            card.innerHTML = `

            <a href="game.html?game=${game.slug}">

                <img 
                src="${game.thumbnail || 'assets/images/default.webp'}"
                alt="${game.title}">


                <h3>${game.title}</h3>


                <p>${game.description || ''}</p>


                <span class="download-btn">
                Download
                </span>

            </a>

            `;


            gameContainer.appendChild(card);


        });


    }catch(error){


        console.log("CMS Loader:",error);


    }

          }
