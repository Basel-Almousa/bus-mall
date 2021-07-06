'use strict'

const leftImgElement = document.getElementById('left-img');
const middleImgElement = document.getElementById('middle-img');
const rightImgElement = document.getElementById('right-img');

const maxAttemps = 25;
let votesArr = [];

let viewsArr = [];
let counter = 0;
let nameArr = [];

function Product(name, source) {
    this.name = name;
    this.source = source;
    this.votes = 0;
    this.views = 0;
    Product.globArr.push(this);
    nameArr.push(this.name);

}
Product.globArr = [];
new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/pet-sweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.png');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');

console.log(Product.globArr);

function geneRandIndex() {
    return Math.floor(Math.random() * Product.globArr.length);
}

let leftIdex;
let middelIdex;
let rightIdex;

function renderImges() {
    leftIdex = geneRandIndex();
    middelIdex = geneRandIndex();
    rightIdex = geneRandIndex();

    while (leftIdex === middelIdex || leftIdex === rightIdex || middelIdex === rightIdex) {
        leftIdex = geneRandIndex();
        middelIdex = geneRandIndex();
    }
   


    leftImgElement.src = Product.globArr[leftIdex].source;
    Product.globArr[leftIdex].views++;
    middleImgElement.src = Product.globArr[middelIdex].source;
    Product.globArr[middelIdex].views++;
    rightImgElement.src = Product.globArr[rightIdex].source;
    Product.globArr[rightIdex].views++;

}

renderImges();


// function notRepeat(){
//     while (leftIdex === Product.globArr[leftIdex] || rightIdex === Product.globArr[rightIdex] || middelIdex === Product.globArr[middelIdex]) {
//         leftIdex = geneRandIndex();
//         middelIdex = geneRandIndex();
//         rightIdex = geneRandIndex();
//     }


// }
// notRepeat();

function saveTool(){

    const convertedArr = JSON.stringify(Product.globArr);
    localStorage.setItem('unList', convertedArr);
}

function getFormLs(){
    const data = localStorage.getItem('unList');
    if (data){
        let parseUnlist = JSON.parse(data);
        Product.globArr = parseUnlist;
        renderList();
    }
}    

getFormLs();

const section = document.getElementById('first');
section.addEventListener('click', handleClick);

let btnE;
function handleClick(event) {

    counter++;
    if (maxAttemps >= counter) {

        if (event.target.id === 'left-img') {
            Product.globArr[leftIdex].votes++;
        } else if (event.target.id === 'middle-img') {
            Product.globArr[middelIdex].votes++;
        } else if (event.target.id === 'right-img') {
            Product.globArr[rightIdex].votes++;
        } else {
            counter--;
            return
        }
        renderImges();

    } else {
        btnE = document.getElementById('btn');
        btnE.addEventListener('click', handleShow);
        section.removeEventListener('click', handleClick);

    }saveTool();

}

// ====================================================

function handleShow() {
    renderList();
    myGettingChart();
    btnE.removeEventListener('click', handleShow);
}


// ========================================================
function renderList() {

    const ul = document.getElementById('unList');

    for (let i = 0; i < Product.globArr.length; i++) {
        votesArr.push(Product.globArr[i].votes);
        viewsArr.push(Product.globArr[i].views);
        console.log(viewsArr);

        let li = document.createElement('li');
        ul.appendChild(li);
        li.textContent = `${Product.globArr[i].name} had ${Product.globArr[i].votes} votes, and was seen ${Product.globArr[i].views} times. `
    }
}

function myGettingChart() {

    let ctx = document.getElementById('myChart');

    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: nameArr,
            datasets: [{
                label: '# of Votes',
                data: votesArr,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1
            }, {
                label: '# of Views',
                data: viewsArr,
                backgroundColor: [
                    'rgb(54, 162, 235)'
                ]
            }]
        },
    })
}
