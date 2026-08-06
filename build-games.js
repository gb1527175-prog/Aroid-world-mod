const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const GAMES_DIR = path.join(__dirname, "games");
const OUTPUT_DIR = path.join(GAMES_DIR, "games");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "index.json");

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const files = fs.readdirSync(GAMES_DIR).filter(file => file.endsWith(".md"));

const games = [];

files.forEach(file => {

    const filePath = path.join(GAMES_DIR, file);

    const source = fs.readFileSync(filePath, "utf8");

    const { data } = matter(source);

    games.push({

        title: data.title || "",

        slug: data.slug || file.replace(".md", ""),

        description: data.description || "",

        body: data.body || "",

        game_url: data.game_url || "",

        thumbnail: data.thumbnail || "",

        version: data.version || "Latest",

        size: data.size || "--",

        android: data.android || "5.0+",

        developer: data.developer || "APK World",

        category: data.category || "Game",

        screenshot1: data.screenshot1 || data.thumbnail || "",

        screenshot2: data.screenshot2 || data.thumbnail || "",

        screenshot3: data.screenshot3 || data.thumbnail || "",

        screenshot4: data.screenshot4 || data.thumbnail || "",

        screenshot5: data.screenshot5 || data.thumbnail || "",

        features: data.features || [],

        rating: data.rating || "4.8",

        updated: data.updated || "",

        featured: data.featured || false,

        trending: data.trending || false

    });

});

games.sort((a, b) => a.title.localeCompare(b.title));

fs.writeFileSync(
    OUTPUT_FILE,
    JSON.stringify(games, null, 2),
    "utf8"
);

console.log("=================================");
console.log(" APK World Build Complete");
console.log(" Games:", games.length);
console.log(" Output:", OUTPUT_FILE);
console.log("=================================");
