const form = document.querySelector('form');
const result = document.querySelector('.result');
const button = document.getElementById("butt");
const input = document.querySelector('input');

button.addEventListener('click', (e) => {
    e.preventDefault();
    let word = input.value.trim();

    if (word === "") {
        result.style.display = "block";
        result.innerHTML = "⚠ Please enter a word!";
        return;
    }

    getWordInfo(word);
});

const getWordInfo = async (word) => {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();

    if (data.title) {
        result.style.display = "block";
        result.innerHTML = "❌ No meaning found.";
        return;
    }

    let meaning = data[0].meanings[0].definitions[0].definition;
    let partOfSpeech = data[0].meanings[0].partOfSpeech;
    let pronunciation = data[0].phonetic || "Not available";
    let audioURL = data[0].phonetics[0]?.audio || "";

    result.style.display = "block"; 
    result.innerHTML = `
        <h2>${data[0].word}</h2>
        <p><b>Pronunciation:</b> ${pronunciation}</p>
        <p><b>Part of Speech:</b> ${partOfSpeech}</p>
        <p><b>Meaning:</b> ${meaning}</p>
        ${audioURL ? `<button class="audio-btn" onclick="playSound('${audioURL}')">🔊 Play Sound</button>` : "<p>🔇 No audio available</p>"}
    `;
};

// Function to play sound
function playSound(url) {
    let audio = new Audio(url);
    audio.play();
}