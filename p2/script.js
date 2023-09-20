/*alone | beautiful chill music mix*/


let positionold = [0, 0];
let position = [1, 1];

let snake = [[1, 1]];


function copy(array) {
    return JSON.parse(JSON.stringify(array));
}


let fruit = [randint(20), randint(20)];


function showfruit(fruit) {
    const pos = fruit[0] + 20*fruit[1];
    document.getElementById(`c${pos}`).style.backgroundColor = "green"
}



function randint(max){
    return Math.floor(Math.random()*max)
}

let t = "";
for (let i = 0; i<400; i++) {
    t += `<div id="c${i}"></div>`
}


document.querySelector(".grid").innerHTML = t;

for (let i = 0; i<400; i++) {
    let cell = document.getElementById(`c${i}`);
    cell.style.backgroundColor = `black`
}

show2(snake)
showfruit(fruit)


document.addEventListener("keydown", (event) => {
    move(event.key);
})


function show(position, positionold) {

    const newpos = position[0] + 20*position[1];
    const oldpos = positionold[0] + 20*positionold[1];
    document.getElementById(`c${newpos}`).style.backgroundColor = "red"
    document.getElementById(`c${oldpos}`).style.backgroundColor = "black"
    
}

function show2(snake) {

    for (let i = 0; i < snake.length; i ++) {

        let pos = snake[i][0] + snake[i][1]*20;
        document.getElementById(`c${pos}`).style.backgroundColor = "red"

    }

}

function move(key) {

    let newpos = snake[0];

    if (key === "ArrowUp") {
        newpos[1] -= 1;
    } else if (key === "ArrowDown") {
        newpos[1] += 1;
    } else if (key === "ArrowRight") {
        newpos[0] += 1;
    } else if (key === "ArrowLeft"){
        newpos[0] -= 1;
    } else {
        return null
    }

    const last = snake.pop()
    const lastpos = last[0] + 20*last[1];
    document.getElementById(`c${lastpos}`).style.backgroundColor = "black"


    newpos[1] = ((newpos[1] % 20) + 20) % 20;
    newpos[0] = ((newpos[0] % 20) + 20) % 20;

    snake.unshift(newpos);

    show(position, positionold);
    if (position[0] === fruit[0] && position[1] === fruit[1]) {
        fruit = [randint(20), randint(20)];
        showfruit(fruit);

    }

}




