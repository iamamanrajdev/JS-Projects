let speech = new SpeechSynthesisUtterance();
let voices = [];

const button = document.querySelector("button");
const textarea = document.querySelector("textarea");
const voiceSelect = document.querySelector("select");

// Voices load karna
window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0]; // Default first voice

    voices.forEach((voice, index) => {
        let option = document.createElement("option");
        option.value = index;
        option.textContent = `${voice.name}`;
        voiceSelect.appendChild(option);
    });
};

// Voice change karna jab select change ho
voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

// Button click → Speak
button.addEventListener("click", () => {
    speech.text = textarea.value;
    window.speechSynthesis.speak(speech);
});