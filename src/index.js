import "./style.scss";
import generateJoke from "./joke-generator";
import laughingEmoji from "../public/assets/laughing-emoji.png";
import { camelCase } from "lodash";

const laughingEmojiImg = document.getElementById("laughing-emoji");
laughingEmojiImg.src = laughingEmoji;

const jokeBtn = document.getElementById("joke-button");
jokeBtn.addEventListener("click", () => generateJoke());

console.log(
  camelCase(
    "Project for practicing and gaining knowledge on how and what module bundlers (such as Webpack), loaders, transpilers (such as Babel) and task runners do under the hood."
  )
);

generateJoke();
