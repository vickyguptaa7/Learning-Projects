import { VoiceRSS } from "./voice";

const button = document.querySelector('.tell-btn');
const audioElement = document.querySelector('.audio');



// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
    button.classList.toggle('brightness-70');
    button.classList.toggle('hover:brightness-125');
}


// VoiceRSS Speech Function
function tellMeJoke(joke) {

    // VoiceRSS Speech Parameters
    VoiceRSS.speech({
        key: "eb6b63eb257640d8a6954741903fa88f",
        src: joke,
        hl: "en-us",
        v: "Linda",
        r: 0,
        c: "mp3",
        f: "44khz_16bit_stereo",
        ssml: false,
    });
    console.log('joke : ', joke);
}

async function getJokes() {
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    let joke = '';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.type === 'twopart') {
            joke = `${data.setup} ... ${data.delivery}`;
        }
        else {
            joke = data.joke;
        }
        tellMeJoke(joke);
        toggleButton();
    } catch (error) {
        //catch
        console.log("error : ", error);
    }
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);