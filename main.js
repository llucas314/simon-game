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

function playOrder(){
    for (let i = 0; i < order.length; i++){
        console.log('add filter')
        buttons[order[i]-1].classList.add('filter');
        setTimeout(e=>{
            buttons[order[i]-1].classList.remove('filter');
        },1000)
    //     (function(i){
    //         setTimeout(function(){
    //             console.log(buttons[order[i]-1]);
    //             buttons[order[i]-1].classList.remove('filter');
    //             console.log('timeout' + i);
    //         }, 300*i)
    //     })(i)
    }
    allowClick();
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

pushRandom();
