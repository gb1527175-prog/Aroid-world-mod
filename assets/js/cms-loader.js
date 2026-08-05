"use strict";

/*=========================================
  APK World CMS Loader
  Part 1
=========================================*/

document.addEventListener("DOMContentLoaded", () => {
    loadLatestGames();
});

async function loadLatestGames() {

    const grid = document.getElementById("latest-grid");
    const loader = document.getElementById("latest-loader");

    if (!grid) return;

    try {

        const response = await fetch("games/games/index.json");

        if (!response.ok) {
            throw new Error("JSON not found");
        }

        const games = await response.json();

        if (!games.length) {

            loader.style.display = "none";

            grid.innerHTML = `
                <p style="padding:20px;text-align:center;">
                    No games found.
                </p>
            `;

            return;
        }

        loader.style.display = "none";

        grid.innerHTML = "";

        games.forEach(game => {

            const card = createGameCard(game);

            grid.appendChild(card);

        });

    } catch (error) {

        console.error(error);

        if (loader) loader.style.display = "none";

        grid.innerHTML = `
            <p style="padding:20px;text-align:center;color:red;">
                Failed to load games.
            </p>
        `;
    }

}

/*=========================================
  Create Card
=========================================*/

function createGameCard(game) {

    const article = document.createElement("article");

    article.className = "grid-card";

    article.innerHTML = `
        <a href="game.html?slug=${encodeURIComponent(game.slug)}">

            <img
                src="${game.thumbnail}"
                alt="${game.title}"
                loading="lazy">

            <h3>${game.title}</h3>

            <p>${game.description}</p>

            <span class="download-btn">
                Download
            </span>

        </a>
    `;

    return article;

}
/*=========================================
  Create Card
=========================================*/

function createGameCard(game) {

  return `
    <article class="grid-card">

      <a href="game.html?slug=${game.slug}">

        <img
          src="${game.thumbnail}"
          alt="${game.title}"
          loading="lazy">

        <h3>${game.title}</h3>

        <p>${game.description}</p>

        <span class="download-btn">
          Download
        </span>

      </a>

    </article>
  `;

}


/*=========================================
  Render Games
=========================================*/

function renderGames(games) {

  latestGrid.innerHTML = "";

  if (!games || games.length === 0) {

    latestGrid.innerHTML = `
      <p class="no-posts">
        No games available.
      </p>
    `;

    return;
  }

  games.forEach(game => {

    latestGrid.innerHTML += createGameCard(game);

  });

}


/*=========================================
  Hide Loader
=========================================*/

function hideLoader() {

  if (loader) {

    loader.style.display = "none";

  }

}
/*=========================================
  Load Games
=========================================*/

async function loadGames() {

  try {

    const response = await fetch("games/games/index.json");

    if (!response.ok) {

      throw new Error("Unable to load games.");

    }

    const games = await response.json();

    renderGames(games);

  }

  catch (error) {

    console.error(error);

    latestGrid.innerHTML = `
      <p class="no-posts">
        Failed to load games.
      </p>
    `;

  }

  finally {

    hideLoader();

  }

}


/*=========================================
  Init
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

  if (latestGrid) {

    loadGames();

  }

});


/*=========================================
  End of cms-loader.js
=========================================*/
