const redBtn = document.querySelector('.red');
const blueBtn = document.querySelector('.blue');
const greenBtn = document.querySelector('.green');
const yellowBtn = document.querySelector('.yellow');
const easyBtn = document.querySelector('#easy');
const mediumBtn = document.querySelector('#medium');
const hardBtn = document.querySelector('#hard');
const expertBtn = document.querySelector('#expert');
const section = document.querySelector('section')
const main = document.querySelector('main')
const buttons = document.querySelectorAll('.button');
const alerts = document.querySelector('.turn');
let order = [];
let index = 0;
let round = 1;

buttons.forEach(btn=>{
    btn.dataset.clickable = "false";
    btn.addEventListener('click', e=>{
        if(e.target.dataset.clickable === "true"){
            setClickColor(parseInt(e.target.id));
            if(e.target.id != order[index]){
                console.log('gameover');
            } else {
                index++;
                setTimeout(()=>{
                    if (index > order.length-1){
                        stopClick();
                        index = 0;
                        round++;
                        alertRound();
                    }
                },500)
            }
        }
    })
})

function pushRandom(){
    let number = Math.floor((Math.random() * buttons.length)+1);
    console.log('number: '+ number);
    order.push(number);
    console.log('order[]: '+ order);
    playOrder();
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
            clearInterval(lights)
            allowClick();
            playerTurn();
        }
        counter++;
    },200*(counter+1.5))
}

function resetColor(){
    redBtn.style.backgroundColor = 'rgb(102, 13, 13)';
    blueBtn.style.backgroundColor = 'rgb(13, 13, 107)';
    greenBtn.style.backgroundColor = 'rgb(1, 58, 1)';
    yellowBtn.style.backgroundColor = 'rgb(187, 162, 20)';
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
function playerTurn(){
    alerts.innerHTML = 'Your Turn';
    alerts.classList.add('animate');
    alerts.addEventListener('animationend',animationPlayer);
    
}
animationEnd = (e)=>{
    alerts.removeEventListener('animationend',animationEnd);
    alerts.classList.remove('animate');
    pushRandom();
}
animationPlayer = (e)=>{
    alerts.removeEventListener('animationend',animationPlayer);
    alerts.classList.remove('animate');
}
transitionEnd = (e)=>{
    e.target.removeEventListener('transitionend',transitionEnd);
    e.target.classList.remove('redLight','blueLight','greenLight','yellowLight');
    console.log('removed')
}

alertRound();

