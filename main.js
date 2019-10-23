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
let order = [];
let index = 0;
let round = 1;

buttons.forEach(btn=>{
    btn.dataset.clickable = "false";
    btn.addEventListener('click', e=>{
        if(e.target.dataset.clickable === "true"){
            setClickColor(parseInt(e.target.id));
            setTimeout(resetColor,200);
            console.log(e.target.id +' was clicked');
            if(e.target.id != order[index]){
                console.log('gameover');
            } else {
                index++;
                if (index > order.length-1){
                    stopClick();
                    index = 0;
                    round++;
                    pushRandom();
                }
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

// function playOrder(){
//     for (let i = 0; i < order.length; i++){
//         (function(i){
//             setTimeout(function(){
//                 console.log(buttons[order[i]-1]);
//                 buttons[order[i]-1].classList.add('filter');
//                 console.log('timeout' + i);
//                 (function(i){
//                     setTimeout(function(){
//                         console.log(buttons[order[i]-1]);
                        
//                         buttons[order[i]-1].classList.remove('filter');
//                         console.log('timeout' + i);
//                     }, 1000*(i+1))
//                 })(i)
//             }, 500*(i+1))
//         })(i)
       
//     }
//     allowClick();
// }

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

pushRandom();


function playOrder(){
    resetColor();
    let counter = 0;
    let lights = setInterval(()=>{
        setClickColor(order[counter]);
        setTimeout(resetColor, 500);
        if(counter == round + 1){
            clearInterval(lights)
            allowClick();
        }
        counter++;
    },1000*(counter+1))
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