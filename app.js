let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max);
guessesLeft = 3;

const game = document.getElementById('game'),
    minNum = document.querySelector('.min-num'),
    maXNum = document.querySelector('.max-num'),
    guessBtn = document.getElementById('submit'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message'),
    minion = document.querySelector('img');

minNum.textContent = min;
maXNum.textContent = max;

guessInput.addEventListener('keyup', function (e) {
    if (guessInput.value !== '') {
        document.querySelector('.container').style.boxShadow = `1rem 1em 2rem orange, -1rem -1em 2rem orange`;
        if (e.target.value < min || e.target.value > max) {
            minion.src = './img/no.gif';
            guessInput.style.border = `Solid 2px red`;
        } else {
            minion.src = './img/wait.gif';
            guessInput.style.border = 'none';
        }
    } else {
        minion.src = './img/inputwait.png';
    }

});

game.addEventListener('mousedown', function (e) {
    if (e.target.className === 'play-again')
        window.location.reload();
});

guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value);
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }
    if (guess === winningNum) {
        gameOver(true, `${winningNum} is Correct , You Win !!!!!`);
    } else {
        guessesLeft -= 1;
        if (guessesLeft === 0) {
            gameOver(false, ` Game Over !!, You Lost ! The correct number was ${winningNum}`);
        } else {
            setMessage(` ${guess} is not correct , ${guessesLeft} Guesses Left `, 'red');
            guessInput.value = '';
            guessLeft(guessesLeft);
        }
    }
});


function guessLeft(left) {
    if (left === 2)
        minion.src = './img/twoguess.png';
    else {
        minion.src = './img/oneguess.gif';
    }
}

function gameOver(won, msg) {
    let color;
    if (won === true) {
        minion.style.marginLeft = '3.2rem';
        minion.src = './img/win.gif';
    } else {
        minion.src = './img/lose.gif';
    }
    won === true ? color = 'greenyellow ' : color = 'red';
    guessInput.disabled = true;
    guessInput.style.border = `Solid 2px ${color}`;
    setMessage(msg, color);
    guessBtn.style.display = 'block';
    guessBtn.style.marginLeft = 'auto';
    guessBtn.style.marginRight = 'auto';
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
    guessBtn.style.backgroundColor = 'greenyellow';
    guessBtn.style.color = 'black';
}

function getRandomNum(min, max) {
    return (Math.floor(Math.random() * (max - min + 1) + min));
}

function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
    document.querySelector('.container').style.boxShadow = `1rem 1rem 2rem ${color}, -1rem -1rem 2rem ${color}`;
}