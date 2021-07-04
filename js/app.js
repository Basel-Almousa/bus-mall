'use strict'

const leftImgElement = document.getElementById('left-img');
const middleImgElement = document.getElementById('middle-img');
const rightImgElement = document.getElementById('right-img');

const maxAttemps = 25;

let counter = 0;

function Product(name, source) {
    this.name = name;
    this.source = source;
    this.votes = 0;
    this.views = 0;
    Product.globArr.push(this);
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

    // console.log(leftIdex);
    // console.log(middelIdex);
    // console.log(rightIdex);

    leftImgElement.src = Product.globArr[leftIdex].source;
    middleImgElement.src = Product.globArr[middelIdex].source;
    rightImgElement.src = Product.globArr[rightIdex].source;

}
renderImges();

leftImgElement.addEventListener('click', handleClick);
middleImgElement.addEventListener('click', handleClick);
rightImgElement.addEventListener('click', handleClick);

function handleClick(event) {

    counter++;
    if (maxAttemps >= counter) {
        Product.globArr[leftIdex].views++;
        Product.globArr[middelIdex].views++;
        Product.globArr[rightIdex].views++;
        if (event.target.id === 'left-img') {
            Product.globArr[leftIdex].votes++;
        } else if (event.target.id === 'middle-img') {
            Product.globArr[middelIdex].votes++;
        } else if (event.target.id === 'right-img') {
            Product.globArr[rightIdex].votes++;
        }
        // console.log(Product.globArr);
        renderImges();

    } else {
        renderList();
    }
}

// ====================================================

function myFunction(){
    document.getElementById(unList).renderList();
}

// ========================================================
function renderList() {

    const ul = document.getElementById('unList');

    for (let i = 0; i < Product.globArr.length; i++) {
        let li = document.createElement('li');
        ul.appendChild(li);
        li.textContent = `${Product.globArr[i].name} had ${Product.globArr[i].votes} votes, and was seen ${Product.globArr[i].views} times. `
    }
    leftImgElement.removeEventListener('click', handleClick);
    middleImgElement.removeEventListener('click', handleClick);
    rightImgElement.removeEventListener('click', handleClick);

}