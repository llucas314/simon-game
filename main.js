const redBtn = document.querySelector(".red");
const blueBtn = document.querySelector(".blue");
const greenBtn = document.querySelector(".green");
const yellowBtn = document.querySelector(".yellow");
const section = document.querySelector("section");
const main = document.querySelector("main");
const buttons = document.querySelectorAll(".button");
const difficulty = document.querySelectorAll(".difficulty");
const restart = document.querySelector(".try");
const h3 = document.querySelector("h3");
const centerText = document.querySelector(".centerText");
let fail = new Audio("soundeffects/fail.mp3");
let levelClick = new Audio("soundeffects/chime.mp3");
let win = new Audio("soundeffects/win.mp3");
fail.volume = 0.2;
levelClick.volume = 0.2;
win.volume = 0.2;
let music = [];
let order = [];
let index = 0;
let round = 1;
let speed;

for (let i = 0; i < 16; i++) {
	music.push(new Audio(`soundeffects/Piano${i + 110}.mp3`));
}

buttons.forEach((btn) => {
	btn.dataset.clickable = "false";
	btn.addEventListener("click", (e) => {
		if (e.target.dataset.clickable === "true") {
			setClickColor(parseInt(e.target.id));
			music[index].currentTime = 2;
			music[index].play();
			setTimeout(() => {
				if (music[index].currentTime > 0.1) {
					music[index].pause();
				}
			}, 100);
			if (e.target.id != order[index]) {
				stopClick();
				playerTurn("GAME OVER!");
				fail.play();
				tryAgain();
			} else {
				index++;
				setTimeout(() => {
					if (index > order.length - 1) {
						stopClick();
						index = 0;
						round++;
						alertRound();
					}
				}, 500);
			}
		}
	});
});
document.addEventListener("keydown", (e) => {
	if (redBtn.dataset.clickable === "true") {
		let keyId = chooseKey(e.key);
		if (keyId !== 0) {
			setClickColor(keyId);
			music[index].currentTime = 2;
			music[index].play();
			setTimeout(() => {
				if (music[index].currentTime > 0.1) {
					music[index].pause();
				}
			}, 100);
			if (keyId != order[index]) {
				stopClick();
				playerTurn("GAME OVER!");
				fail.play();
				tryAgain();
			} else {
				index++;
				setTimeout(() => {
					if (index > order.length - 1) {
						stopClick();
						index = 0;
						round++;
						alertRound();
					}
				}, 500);
			}
		}
	}
});

function chooseKey(key) {
	switch (key) {
		case "w":
			return 1;
		case "e":
			return 2;
		case "d":
			return 3;
		case "s":
			return 4;
		default:
			return 0;
	}
}

function pushRandom() {
	let number = Math.floor(Math.random() * buttons.length + 1);
	order.push(number);
	console.log("order[]: " + order);
	if (order.length === 16) {
		win.play();
		playerTurn("You Won!");
	} else {
		playOrder();
	}
}

function allowClick() {
	buttons.forEach((btn) => {
		btn.dataset.clickable = "true";
		btn.style.cursor = "pointer";
	});
}

function stopClick() {
	buttons.forEach((btn) => {
		btn.dataset.clickable = "false";
		btn.style.cursor = "not-allowed";
	});
}

function playOrder() {
	let counter = 0;
	let lights = setInterval(() => {
		setClickColor(order[counter]);
		if (counter < round) {
			music[counter].currentTime = 2;
			music[counter].play();
			setTimeout(() => {
				if (music[counter].currentTime > 0.1) {
					music[counter].pause();
				}
			}, 100);
		}
		if (counter == round + 1) {
			clearInterval(lights);
			allowClick();
			playerTurn("Your Turn");
		}
		counter++;
	}, speed * (counter + 1.5));
}

function setClickColor(num) {
	switch (num) {
		case 1:
			redBtn.addEventListener("transitionend", transitionEnd);
			redBtn.classList.add("redLight");
			break;
		case 2:
			blueBtn.addEventListener("transitionend", transitionEnd);
			blueBtn.classList.add("blueLight");
			break;
		case 3:
			greenBtn.addEventListener("transitionend", transitionEnd);
			greenBtn.classList.add("greenLight");
			break;
		case 4:
			yellowBtn.addEventListener("transitionend", transitionEnd);
			yellowBtn.classList.add("yellowLight");
			break;

		default:
			break;
	}
}

function alertRound() {
	h3.innerHTML = `Round ${round}!`;
	h3.addEventListener("animationend", animationEnd);
	h3.classList.add("centerText");
}
function playerTurn(text) {
	h3.innerHTML = text;
	h3.addEventListener("animationend", animationPlayer);
	h3.classList.add("centerText");
}
animationEnd = () => {
	h3.removeEventListener("animationend", animationEnd);
	h3.classList.remove("centerText");
	pushRandom();
};
animationPlayer = () => {
	h3.removeEventListener("animationend", animationPlayer);
	h3.classList.remove("centerText");
};
transitionEnd = (e) => {
	e.target.removeEventListener("transitionend", transitionEnd);
	e.target.classList.remove(
		"redLight",
		"blueLight",
		"greenLight",
		"yellowLight",
	);
};

function setSpeed(level) {
	switch (level) {
		case "easy":
			speed = 700;
			buttons.forEach((button) => button.classList.add("speed1"));
			break;
		case "medium":
			speed = 500;
			buttons.forEach((button) => button.classList.add("speed2"));
			break;
		case "hard":
			speed = 350;
			buttons.forEach((button) => button.classList.add("speed3"));
			break;
		case "expert":
			speed = 200;
			buttons.forEach((button) => button.classList.add("speed4"));
			break;
		default:
			break;
	}
}
function setDifficulty() {
	difficulty.forEach((level) => {
		level.addEventListener("click", difficultySet);
	});
}
function difficultySet(e) {
	e.target.removeEventListener("click", difficultySet);
	levelClick.play();
	setSpeed(e.target.id);
	console.log("speed" + speed);
	main.classList.remove("hide");
	section.classList.add("hide");
	stopClick();
	setTimeout(alertRound, 1500);
}
function tryAgain() {
	restart.classList.remove("hide");
	restart.addEventListener("click", restartGame);
	setDifficulty();
}
restartGame = () => {
	restart.removeEventListener("click", restartGame);
	order = [];
	index = 0;
	round = 1;
	buttons.forEach((button) =>
		button.classList.remove("speed1", "speed2", "speed3", "speed4"),
	);
	h3.innerHTML = "SIMON";
	main.classList.add("hide");
	section.classList.remove("hide");
	restart.classList.add("hide");
};
setDifficulty();
