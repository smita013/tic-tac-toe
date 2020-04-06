const crossClass = 'cross';
const circleClass = 'circle';
const dataCellElement = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const wintxtShowElement = document.getElementById('win-msg');
const wintxtElement = document.querySelector('[data-win-msg-txt')
let crossTurn
const winCombo = [
    [0, 1, 2],
    [0, 3, 6],
    [3, 4, 5],
    [1, 4, 7],
    [6, 7, 8],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

]
const playAgain = document.getElementById('restartBtn')

gameStart();

playAgain.addEventListener('click', gameStart);

function handlClick(e) {
    // console.log("clicked");
    const cell = e.target;
    const currentClass = crossTurn ? crossClass : circleClass;
    placeMark(cell, currentClass);
    winnerCheck(currentClass);
    if (winnerCheck(currentClass)) {
        // console.log('Win');
        gameEnds(false);
    } else if (isDraw()) {
        gameEnds(true);
    } else {
        swapTurn();
        boardHover();
    }
}


function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurn() {
    crossTurn = !crossTurn;
}

function gameStart() {
    crossTurn = false;
    dataCellElement.forEach(cell => {
        cell.classList.remove(crossClass);
        cell.classList.remove(circleClass);
        cell.addEventListener('click', handlClick, { once: true })
    });
    boardHover();
    wintxtShowElement.classList.remove('show');
}

function gameEnds(draw) {
    if(draw) {
        wintxtElement.innerText = "Its a Draw!"
    } else {
        wintxtElement.innerText = `${crossTurn ? "X" : "O"} is the winner!`
    }
    wintxtShowElement.classList.add('show')
}

function isDraw() {
    return [...dataCellElement].every(cell => {
        return cell.classList.contains(crossClass) || cell.classList.contains(circleClass);
    })
}





function boardHover() {
    board.classList.remove(crossClass);
    board.classList.remove(circleClass);

    if (crossTurn) {
        board.classList.add(crossClass);
    } else {
        board.classList.add(circleClass);
    }

}

function winnerCheck(currentClass) {
    return winCombo.some(combination => {
        return combination.every(index => {
            return dataCellElement[index].classList.contains(currentClass)
        })
    })
}
