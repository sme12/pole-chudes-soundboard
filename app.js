const playSound = (keyButton) => {
    if (keyButton === 'space') {
        if (keyAudioFile.paused) {
            keyAudioFile.play();
            return;
        } else {
            keyAudioFile.pause();
            return;
        }
    }
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
    let keyButton = null;
    if (keyNum === 32) {
        keyButton = 'space';
        playSound(keyButton);
        return;
    } else {
        keyButton = document.querySelector(`.soundboard-keys-list__button[data-key="${keyNum}"]`);
    }
    if (!keyButton) {
        return;
    }
    changeButton(keyButton);
    playSound(keyButton);
}

const keysList = document.querySelectorAll('.soundboard-keys-list__button');
const keyAudioFile = document.querySelector('.audio-sound');
const audioFilesToPreload = document.querySelectorAll('.audio-sound-preload');
const app = document.querySelector('.app-body');
const loader = document.querySelector('.loader');

const promisesArr = [];

Array.from(audioFilesToPreload).forEach(audioFile => {
    const finished = new Promise((resolve, reject) => {
        audioFile.addEventListener('canplay', resolve);
        audioFile.addEventListener('error', reject);
    });
    promisesArr.push(finished);
});

Promise.all(promisesArr).then(() => {
    app.classList.add('is-shown');
    loader.classList.add('is-hidden');
});

keysList.forEach(key => {
    key.addEventListener("click", (e) => {
        buttonHandler(e);
    });
    key.parentNode.addEventListener('transitionend', removeTransition);
});

window.addEventListener("keydown", (e) => {
    buttonHandler(e);
});
