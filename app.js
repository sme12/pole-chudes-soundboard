const playSound = (keyButton) => {
    keyAudioFile.src = keyButton.dataset.src;
    if (keyAudioFile.loop && !keyButton.dataset.loop) {
        keyAudioFile.loop = false
        const loopedButton = document.querySelector('.soundboard-keys-list__item_looped');
        loopedButton.classList.remove('soundboard-keys-list__item_looped');
    } else if (!keyAudioFile.loop && keyButton.dataset.loop) {
        keyAudioFile.loop = true
        keyButton.parentNode.classList.add('soundboard-keys-list__item_looped')
    }
    keyAudioFile.currentTime = 0;
    keyAudioFile.play();
}
  
const changeButton = (keyButton) => {
    keyButton.parentNode.classList.add('soundboard-keys-list__item_active')
}

const removeTransition = (e) => {
    e.target.classList.remove('soundboard-keys-list__item_active');
}

const buttonHandler = (e) => {
    let keyNum = e.keyCode || e.target.dataset.key || e.target.parentNode.dataset.key;
    const keyButton = document.querySelector(`.soundboard-keys-list__button[data-key="${keyNum}"]`);
    if (!keyButton) {
        return;
    }
    changeButton(keyButton);
    playSound(keyButton);
}

const keysList = document.querySelectorAll('.soundboard-keys-list__button');
const keyAudioFile = document.querySelector('.audio-sound');

keysList.forEach(key => {
    key.addEventListener("click", (e) => {
        buttonHandler(e);
    });
    key.parentNode.addEventListener('transitionend', removeTransition);
});

window.addEventListener("keydown", (e) => {
    buttonHandler(e);
});
