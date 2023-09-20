let turn = "cross";
let state = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let popup = "inactive";
let score = JSON.parse(localStorage.getItem("score")) || {cross: 0, circle : 0};




// restyle

document.getElementById("c0").style.borderTopLeftRadius = "6px";
document.getElementById("c2").style.borderTopRightRadius = "6px";
document.getElementById("c6").style.borderBottomLeftRadius = "6px";
document.getElementById("c8").style.borderBottomRightRadius = "6px";
document.querySelector(".cross-score").innerHTML = `&#10006; : ${score.cross}`
document.querySelector(".circle-score").innerHTML = `&#9711; : ${score.circle}`


function show(i) {


    if (!state[i]) {

        let x = document.getElementById(`c${i}`);
        x.style.backgroundImage = turn === "cross" ? "url(cross.png)" : "url(circle.png)";
        state[i] = turn === "cross" ? 1 : 2;
        turn = turn === "cross" ? "circle" : "cross";
        document.querySelector(".turn").innerHTML = "Turn : " + (turn === "cross" ? "&#10006;" : "&#9711;");

        detect(i)

    }

}


function detect(i) {

    let r = i % 3;
    let q = (i-r)/3;

    const row = [3*q+r, 3*q+(r+1)%3, 3*q+(r+2)%3];
    const column = [3*q+r, 3*((q+1)%3)+r, 3*((q+2)%3)+r];

    const test1 = state[row[0]] === state[row[1]] && state[row[2]] === state[row[1]];
    const test2 = state[column[0]] === state[column[1]] && state[column[2]] === state[column[1]];
    let test3 = false, test4 = false;

    if ([0, 4, 8].includes(i)) {
        test3 = state[0] === state[4] && state[4] === state[8];
    }

    if ([2, 4, 6].includes(i)) {
        test4 = state[2] === state[4] && state[4] === state[6];
    }

    if (test1 || test2 || test3 || test4) {
        const winner = state[i] === 1 ? "cross" : "circle";
        winning(winner)
    }

    if (!state.includes(0)) {
        let popup = document.querySelector(".popup");
        let overlay = document.querySelector(".overlay");
        popup.innerHTML = "No winner : draw";
        popup.classList.add("popup-active");
        overlay.classList.add("overlay-active");
        setTimeout(()=> location.reload(), 1000);
    }
    


}


function winning(winner) {

    let overlay = document.querySelector(".overlay");
    let popup = document.querySelector(".popup");

    if (winner === "cross") {
        score.cross += 1;
    } else {
        score.circle += 1;
    }

    localStorage.setItem("score", JSON.stringify(score))

    const symb = winner === "cross" ? "&#10006;" : "&#9711;"

    popup.innerHTML = `The winner is : ${symb}`;
    popup.classList.add("popup-active");
    overlay.classList.add("overlay-active");
    setTimeout(()=> location.reload(), 1000);
    
}



function reset() {
    localStorage.setItem("score", JSON.stringify({cross : 0, circle : 0}));
    console.log(localStorage.getItem("score"))
    document.querySelector(".cross-score").innerHTML = `&#10006; : 0`
    document.querySelector(".circle-score").innerHTML = `&#9711; : 0` 
}
