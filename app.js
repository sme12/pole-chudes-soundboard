const playSound = (keyButton, audioFile) => {
    const playing = document.querySelector('.audio-sound[controls]');
    if (keyButton === 'space') {
        if (playing.paused) {
            playing.play();
            return;
        } else {
            playing.pause();
            return;
        }
    }
    if (playing) {
        playing.pause();
        playing.controls = false;
    }
    const loopedAudio = document.querySelector('.audio-sound[loop]');
    if (loopedAudio && !keyButton.dataset.loop) {
        loopedAudio.loop = false
        const loopedButton = document.querySelector('.soundboard-keys-list__item_looped');
        loopedButton.classList.remove('soundboard-keys-list__item_looped');
    } else if (!loopedAudio && keyButton.dataset.loop) {
        audioFile.loop = true
        keyButton.parentNode.classList.add('soundboard-keys-list__item_looped')
    }
    audioFile.controls = true;
    audioFile.currentTime = 0;
    audioFile.play();
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
    const audioFile = document.querySelector(`.audio-sound[data-key="${keyNum}"]`);
    changeButton(keyButton);
    playSound(keyButton, audioFile);
}

const keysList = document.querySelectorAll('.soundboard-keys-list__button');
const audioFiles = document.querySelectorAll('.audio-sound');
const app = document.querySelector('.app-body');
const loader = document.querySelector('.loader');

const promisesArr = [];

Array.from(audioFiles).forEach(audioFile => {
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
