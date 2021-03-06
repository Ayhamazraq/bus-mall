
'use strict';
let attemptEl = document.getElementById('attempts');
let container = document.getElementById('image-container');
let first = document.getElementById('first');
let second = document.getElementById('second');
let third = document.getElementById('third');
let result = document.getElementById('results');
let bussMallImages = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];
let maxAttempts = 25;
let attempt = 1;
let bussmall = [];
let shown = []
let votes1 = [];
let views1 = [];
let busNameimag = [];
function BussMallImage(busName) {
    this.busName = busName.split('.')[0];
    this.bImg = `images/${busName}`;
    this.votes = 0;
    this.views = 0;
    bussmall.push(this);
    busNameimag.push(this.busName);
}
console.log(busNameimag);


for (let i = 0; i < bussMallImages.length; i++) {
    new BussMallImage(bussMallImages[i]);
}


function randomImage() {
    return Math.floor(Math.random() * bussmall.length);

}
let firstIndex;
let secondIndex;
let thirfIndex;

function renderImg() {
    firstIndex = randomImage();
    secondIndex = randomImage();
    thirfIndex = randomImage();
    while (firstIndex === secondIndex || firstIndex === thirfIndex || secondIndex === thirfIndex || shown.includes(firstIndex) || shown.includes(secondIndex) || shown.includes(thirfIndex)) {

        firstIndex = randomImage();
        secondIndex = randomImage();
        thirfIndex = randomImage();
    }
    first.setAttribute('src', bussmall[firstIndex].bImg);
    second.setAttribute('src', bussmall[secondIndex].bImg);
    third.setAttribute('src', bussmall[thirfIndex].bImg);
    bussmall[firstIndex].views++;
    bussmall[secondIndex].views++;
    bussmall[thirfIndex].views++;
    shown[0] = firstIndex;
    shown[1] = secondIndex;
    shown[2] = thirfIndex;
    // console.log(shown);

}
renderImg();


first.addEventListener('click', clickHandler);
second.addEventListener('click', clickHandler);
third.addEventListener('click', clickHandler);

function clickHandler(event) {
    if (attempt <= maxAttempts) {
        let clickedImage = event.target.id;
        if (clickedImage === 'first') {
            bussmall[firstIndex].votes++;
        } else if (clickedImage === 'second') {
            bussmall[secondIndex].votes++
        }
        else if (clickedImage === 'third') {
            bussmall[thirfIndex].votes++
        }
        renderImg();
        console.log(bussmall);
        attempt++;
        saveToLocalStorage();
    }
    else {
        first.removeEventListener('click', clickHandler);
        second.removeEventListener('click', clickHandler);
        third.removeEventListener('click', clickHandler);

    }

}
// } else {

//     for (let i = 0; i < bussmall.length; i++) {
//         let liEl = document.createElement('li');
//         result.appendChild(liEl);
//         liEl.textContent = `${bussmall[i].busName} has ${bussmall[i].votes} votes and  ${bussmall[i].views} views.`;
//     }
//     first.removeEventListener('click', clickHandler);
//     second.removeEventListener('click', clickHandler);
//     third.removeEventListener('click', clickHandler);
//
let btl = document.getElementById('bt1');
btl.addEventListener('click', showResult)

function showResult(event) {

    if (attempt === maxAttempts + 1) {
        for (let i = 0; i < bussmall.length; i++) {

            let liEl = document.createElement('li');
            result.appendChild(liEl);
            liEl.textContent = `${bussmall[i].busName} has ${bussmall[i].votes} votes and  ${bussmall[i].views} views.`;
            votes1.push(bussmall[i].votes);
            views1.push(bussmall[i].views);
        }
        chartRender();
        saveToLocalStorage();

        btl.removeEventListener('click', showResult);


    }
    // console.log(attempt);
    // console.log(maxAttempts);

}
function chartRender() {
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: busNameimag,
            datasets: [{
                label: '# of Votes',
                data: votes1,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }, {
                label: '# of views',
                data: views1,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
function saveToLocalStorage() {
    // console.log(views1,votes1);
    let data = JSON.stringify(bussmall);
 

    localStorage.setItem('bussmall', data);

    
}
function readFromLocalStorage() {
    let stringObj = localStorage.getItem('bussmall');
   

    let normalObj = JSON.parse(stringObj);
  


    if (normalObj) {
        bussmall = normalObj;
       

        // renderviews1();
        // chartRender();
         renderImg();
    }
  
}
readFromLocalStorage();
