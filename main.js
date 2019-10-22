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

buttons.forEach(btn=>{
    btn.dataset.clickable = "false";
    btn.addEventListener('click', e=>{
        if(e.target.dataset.clickable === "true"){
            if(e.target.id == order[index]){
                console.log('gameover');
            } else {
                index++;
            }
        }
    })
})
let order = [];
let index = 0;
let playerInput = [];
let round = 1;


function pushRandom(){
    let number = Math.floor((Math.random * buttons.length)+1);
    console.log('number: '+number);
    order.push(number);
    console.log('order[]: '+order);

}

function playOrder()

