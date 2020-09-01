let canvas = document.getElementById('canvas');

let winPositions = [
    [[1, 1], [1, 2], [1, 3]],
    [[2, 1], [2, 2], [2, 3]],
    [[3, 1], [3, 2], [3, 3]],

    [[1, 1], [2, 1], [3, 1]],
    [[1, 2], [2, 2], [3, 2]],
    [[1, 3], [2, 3], [3, 3]],

    [[1, 1], [2, 2], [3, 3]],
    [[3, 1], [2, 2], [1, 3]],
]

let boxColumnCount = 1;
let boxRowCount = 0;

let isWon = false;

let user = 'blue';

createBoxes();

function createBoxes() {
    boxColumnCount = 1;
    boxRowCount = 0;

    isWon = false;

    user = 'blue';

    for (let i = 0; i < 9; i++) {
        box = document.createElement('div');
        canvas.append(box);
        box.className = 'box';
        if (boxRowCount >= 3) {
            boxColumnCount += 1;
            boxRowCount = 1;
        } else {
            box.id = `${boxRowCount};${boxColumnCount}`;
            boxRowCount += 1;
        }
        box.id = `${boxRowCount};${boxColumnCount}`;
    }
}

function checkWin() {
    for (let positions of winPositions) {
        let score = 0;
        let boxes = ['', '', ''];
        let canContinue = true;
        for (let position of positions) {
            let box = document.getElementById(`${position[0]};${position[1]}`);
            if (box.className.split(' ')[1] != undefined) boxes[score] = box.className.split(' ')[1];
            else continue;
            score += 1;
        }
        // console.log(boxes);
        for (let key of boxes) {
            if (key == '') canContinue = false;
        }
        if (canContinue && boxes[0] == boxes[1] && boxes[1] == boxes[2]) {
            alert(`${boxes[0]} won!`);
            isWon = true;
            break
        }
    }
}

function canvasClear() {
    canvas.innerHTML = '';
    createBoxes();
}

window.addEventListener('click', ({target}) => {
    if (target.className.split(' ')[0] == 'box' && !isWon) {
        if (target.className == 'box') {
            target.className += ` ${user}`;
            if (user == 'red') { user = 'blue'; target.innerHTML = 'O'; }
            else { user = 'red'; target.innerHTML = 'X'; }
            checkWin();
        }
    }
});