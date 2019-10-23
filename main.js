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
            let p = new Promise((res,err)=>{
                setTimeout(resetColor, 500);
                res('Promise success') 
            })
            p.then((message)=>{
                console.log(message)
            }).catch(()=>console.log('promise failed'))
            console.log(e.target.id +' was clicked');
            if(e.target.id != order[index]){
                console.log('gameover');
            } else {
                index++;
                setTimeout(()=>{
                    if (index > order.length-1){
                        stopClick();
                        index = 0;
                        round++;
                        alertRound()
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
    alerts.classList.remove('animate');
    resetColor();
    let counter = 0;
    let lights = setInterval(()=>{
        setClickColor(order[counter]);
        setTimeout(resetColor, 500);
        if(counter == round + 1){
            clearInterval(lights)
            allowClick();
            alerts.innerHTML = "Your Turn!";
            alerts.classList.add('animate');
        }
        counter++;
    },700*(counter+1))
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
            redBtn.style.backgroundColor = 'lightcoral';
            break;
        case 2:
            blueBtn.style.backgroundColor = 'lightblue';
            break;
        case 3:
            greenBtn.style.backgroundColor = 'lightgreen';
            break;
        case 4:
            yellowBtn.style.backgroundColor = 'lightyellow';
            break;
    
        default:
            break;
    }
}

function alertRound(){
    alerts.classList.remove('animate');
    alerts.innerHTML = `Round ${round}!`;
    alerts.classList.add('animate');
    setTimeout(pushRandom(),5000);
}
alertRound();