const redBtn = document.querySelector('.red');
const blueBtn = document.querySelector('.blue');
const greenBtn = document.querySelector('.green');
const yellowBtn = document.querySelector('.yellow');
const section = document.querySelector('section');
const main = document.querySelector('main');
const buttons = document.querySelectorAll('.button');
const difficulty = document.querySelectorAll('.difficulty');
const alerts = document.querySelector('.turn');
let order = [];
let index = 0;
let round = 1;
let speed;

buttons.forEach(btn=>{
    btn.dataset.clickable = "false";
    btn.addEventListener('click', e=>{
        if(e.target.dataset.clickable === "true"){
            setClickColor(parseInt(e.target.id));
            if(e.target.id != order[index]){
                console.log('gameover');
                playerTurn('GAME OVER!')
            } else {
                index++;
                setTimeout(()=>{
                    if (index > order.length-1){
                        stopClick();
                        index = 0;
                        round++;
                        alertRound();
                    }s
                },500)
            }
        }
    })
});

function pushRandom(){
    let number = Math.floor((Math.random() * buttons.length)+1);
    console.log('number: '+ number);
    order.push(number);
    console.log('order[]: '+ order);
    if (order.length === 20){
        playerTurn('Game Over! You Won')
    } else {
        playOrder();
    }
}

function allowClick(){
    buttons.forEach(btn=>{
        btn.dataset.clickable = 'true';
    })
}

function stopClick(){
    buttons.forEach(btn=>{
        btn.dataset.clickable = 'false';
    })
}

function playOrder(){
    let counter = 0;
    let lights = setInterval(()=>{
        setClickColor(order[counter]);
        if(counter == round + 1){
            clearInterval(lights);
            allowClick();
            playerTurn('Your Turn');
        }
        counter++;
    },speed*(counter+1.5))
}

function setClickColor(num){
    switch (num) {
        case 1:
            redBtn.addEventListener('transitionend', transitionEnd);
            redBtn.classList.add('redLight');
            break;
        case 2:
            blueBtn.addEventListener('transitionend', transitionEnd);
            blueBtn.classList.add('blueLight');
            break;
        case 3:
            greenBtn.addEventListener('transitionend', transitionEnd);
            greenBtn.classList.add('greenLight');
            break;
        case 4:
            yellowBtn.addEventListener('transitionend', transitionEnd);
            yellowBtn.classList.add('yellowLight');
            break;
    
        default:
            break;
    }
}

function alertRound(){
    alerts.innerHTML = `Round ${round}!`;
    alerts.classList.add('animate');
    alerts.addEventListener('animationend',animationEnd);
}
function playerTurn(text){
    alerts.innerHTML = text;
    alerts.classList.add('animate');
    alerts.addEventListener('animationend',animationPlayer);
    
}
animationEnd = ()=>{
    alerts.removeEventListener('animationend',animationEnd);
    alerts.classList.remove('animate');
    pushRandom();
};
animationPlayer = ()=>{
    alerts.removeEventListener('animationend',animationPlayer);
    alerts.classList.remove('animate');
};
transitionEnd = (e)=>{
    e.target.removeEventListener('transitionend',transitionEnd);
    e.target.classList.remove('redLight','blueLight','greenLight','yellowLight');
    console.log('removed')
};

function setSpeed(level){
    switch (level) {
        case 'easy':
            speed = 700;
            buttons.forEach(button=>
                button.classList.add('speed1'));
            break;
        case 'medium':
            speed = 500;
            buttons.forEach(button=>
                button.classList.add('speed2'));
            break;
        case 'hard':
            speed = 350;
            buttons.forEach(button=>
                button.classList.add('speed3'));
            break;
        case 'expert':
            speed = 200;
            buttons.forEach(button=>
                button.classList.add('speed4'));
            break;
        default:
            break;
    }
    
}
function setDifficulty(){
    difficulty.forEach(level=>{
        level.addEventListener('click',difficultySet);
    })
}    
function difficultySet(e){
    e.target.removeEventListener('click', difficultySet);
    setSpeed(e.target.id);
    console.log('speed' + speed);
    main.classList.remove('hide');
    section.classList.add('hide');
    alertRound();
}
setDifficulty();
// alertRound();

