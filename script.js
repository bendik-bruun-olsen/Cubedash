const playerBox = document.getElementById("player-box");
const wrapper = document.getElementById("wrapper");
const container = document.getElementById("container");
const startBtn = document.getElementById("start-btn");
const score = document.getElementById("score");
const highScoreContent = document.getElementById("high-score");
const menuWindow = document.getElementById("menu");
const diffBtnForm = document.getElementById("diff-btn-form");

let intervals = [];
let playerInterval;
let isGameOver = false;
let scoreCounter = 0;
let highScore = 0;
updateHighScore();

const movement = {
    moveUp: false,
    moveDown: false,
    moveLeft: false,
    moveRight: false,
};

const keyActions = {
    "w": "moveUp",
    "s": "moveDown",
    "a": "moveLeft",
    "d": "moveRight",
    "ArrowUp": "moveUp",
    "ArrowDown": "moveDown",
    "ArrowLeft": "moveLeft",
    "ArrowRight": "moveRight",
};


// Dimension settings (Adjustable)
const playAreaheightRatio = 4;     // 4 == 25%
playerBox.style.width = "30px";
playerBox.style.height = "30px";
wrapper.style.width = "600px";
wrapper.style.height = "800px";
//

const wrapperHeight = wrapper.offsetHeight
const wrapperWidth = wrapper.offsetWidth

container.style.height = `${wrapperHeight / playAreaheightRatio}px`;
container.style.width = `${wrapperWidth}px`;
const containerHeight = container.offsetHeight;
const difference = wrapperHeight - containerHeight;

menuWindow.style.top = `${(difference / 2) - (menuWindow.offsetHeight / 2)}px`
menuWindow.style.left = `${(wrapperWidth / 2) - (menuWindow.offsetWidth / 2)}px`;

const playerBoxHeight = playerBox.offsetHeight;
const playerBoxWidth = playerBox.offsetWidth;
initPlayerPos();

// Speed settings
const playerBoxStep = 10;
const playerMoveInterval = 10;
let fallSpeed = 10;
const fallSpeedUpdateInterval = 10;
let fallSpawnRate = 200;
//

diffBtnForm.addEventListener("change", (e) => {
    switch(e.target.value) {
        case "easy":
            fallSpawnRate = 300;
            fallSpeed = 5
            break;
        case "medium":
            fallSpawnRate = 200;
            fallSpeed =  10;
            break
        case "hard":
            fallSpawnRate = 100;
            fallSpeed = 15;
            break
    };
});

function initPlayerPos() {
    playerBox.style.top = `${wrapperHeight - playerBoxHeight}px`;
    playerBox.style.left = `${(wrapperWidth / 2) - (playerBoxWidth / 2)}px`;
};

startBtn.addEventListener("click", startGame);
// window.addEventListener("keypress", (e) => {
//     if (e.key === " " && isGameOver) {
//         gameOver();
//         startGame();
//         console.log(e)
//     }
// });

container.addEventListener("click", (event) => {
    playerBox.style.top = `${event.offsetY - (playerBoxHeight / 2) + (wrapperHeight - containerHeight)}px`;
    playerBox.style.left = `${event.offsetX - (playerBoxWidth / 2)}px`;
})

function handleEventKeys(event) {
    event.preventDefault();
    if (!isGameOver) {
        movement[keyActions[event.key]] = (event.type === "keydown");
    };
}
window.addEventListener("keydown", handleEventKeys);
window.addEventListener("keyup", handleEventKeys);

function startGame() {
    menuWindow.classList.remove("fadeIn")
    menuWindow.classList.add("fadeOut");
    menuWindow.style.opacity = "0"

    scoreCounter = 0;
    score.textContent = `Score: 0`;

    setTimeout(function() {
        isGameOver = false;
        removePreviousBoxes();
        initPlayerPos();
    
        const spawnFallBoxInterval = setInterval(() => {
            if (!(isGameOver)) {
                spawnFallingBoxes();
            }
            else clearInterval(spawnFallBoxInterval);
        }, fallSpawnRate)

        movePlayerInterval();
    }, 500)
};

function movePlayer() {
    const playerBoxTop = playerBox.offsetTop;
    const playerBoxLeft = playerBox.offsetLeft;
    
    if (movement["moveUp"]) {
        if (playerBoxTop - playerBoxStep < difference) playerBox.style.top = `${difference}px`;
        else playerBox.style.top = `${playerBoxTop - playerBoxStep}px`;
    };
    if (movement["moveDown"]) {
        if (playerBoxTop > (wrapperHeight - playerBoxHeight - playerBoxStep)) playerBox.style.top = `${wrapperHeight - playerBoxHeight}px`;
        else playerBox.style.top = `${playerBoxTop + playerBoxStep}px`;
    };
    if (movement["moveLeft"]) {
        if (playerBoxLeft - playerBoxStep < 0) playerBox.style.left = "0px";
        else playerBox.style.left = `${playerBoxLeft - playerBoxStep}px`;
    };
    if (movement["moveRight"]) {
        if (playerBoxLeft > (wrapperWidth - playerBoxWidth - playerBoxStep)) playerBox.style.left = `${container.offsetWidth - playerBoxWidth}px`;
        else playerBox.style.left = `${playerBoxLeft + playerBoxStep}px`;
    };
};

function movePlayerInterval() {
    playerInterval = setInterval(() => {
        movePlayer();
    }, playerMoveInterval);
};

function spawnFallingBoxes () {
    const fallingBox = document.createElement("div");

    fallingBox.classList.add("falling-box");
    fallingBox.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`
    wrapper.append(fallingBox)
    
    fallingBox.style.top = `${0 - fallingBox.offsetHeight}px`
    fallingBox.style.left = `${Math.floor(Math.random() * (wrapper.offsetWidth - fallingBox.offsetWidth))}px`

    const fallBoxInterval = setInterval(() => {
        if (fallingBox.offsetTop < wrapper.offsetHeight) {
            if (checkCollision(fallingBox)) gameOver();
            else fallingBox.style.top = `${fallingBox.offsetTop + fallSpeed}px`
        }
        else {
            clearInterval(fallBoxInterval);
            fallingBox.remove();
            updateScore();
        }
    }, fallSpeedUpdateInterval); 

    intervals.push(fallBoxInterval)
};

function checkCollision (fallingBox) {
    const checkTop = () => playerBox.offsetTop < (fallingBox.offsetTop + fallingBox.offsetHeight);
    const checkBottom = () => (playerBox.offsetTop + playerBoxHeight) > fallingBox.offsetTop;
    const checkLeft = () => playerBox.offsetLeft < (fallingBox.offsetLeft + fallingBox.offsetWidth);
    const checkRight = () => (playerBox.offsetLeft + playerBox.offsetWidth) > fallingBox.offsetLeft;

    if (checkTop() && checkBottom() && checkLeft() && checkRight()) return true;
    else return false;
};

function clearFallBoxIntervals() {
    intervals.forEach((fallBoxInterval) => clearInterval(fallBoxInterval))
    intervals = [];
};

function updateScore() {
    scoreCounter += 1;
    score.textContent = `Score: ${scoreCounter}`;
};

function updateHighScore() {
    let retrievedHighScore = localStorage.getItem("highscore");
    if (retrievedHighScore) highScore = JSON.parse(retrievedHighScore);
    if (scoreCounter > highScore) {
        highScore = scoreCounter;
        localStorage.setItem("highscore", highScore); 
    };
    highScoreContent.textContent = `High Score: ${highScore}` 
};

function removePreviousBoxes() {
    let previousBoxes = document.querySelectorAll(".falling-box");
    previousBoxes.forEach((box) => box.remove());
    previousBoxes = []
};

function gameOver() {
    menuWindow.classList.remove("fadeOut");
    menuWindow.classList.add("fadeIn");
    menuWindow.style.opacity = "100";
    isGameOver = true;
    for (let key in movement) movement[key] = false;
    clearFallBoxIntervals();
    clearInterval(playerInterval);
    updateHighScore();
};