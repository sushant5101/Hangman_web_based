//==============================referencing dom from the html============
const turnindicator = document.getElementById("turn");
const popupbox = document.getElementById("popupbox");
const popupwindow = document.getElementById("popupwindow");
let won = "";
var turn = 'o';
var playbox = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];
turnindicator.innerText = `${turn.toUpperCase()} turn`;

function addletter(id, index) {
    if (won) {
        popupwindow.innerText = `Player ${won.toUpperCase()} won!`;
        popupbox.style.display = "block";
        console.log(`Player ${won.toUpperCase()} won!`);
        return 0;
    }
    console.log("adding letter");
    const box = document.getElementById(id);
    if (!box.innerText) {
        const row = Math.floor((index - 1) / 3);
        const col = (index - 1) % 3;
        playbox[row][col] = turn;
        box.innerText = turn.toUpperCase();
        console.log(`adding ${turn.toUpperCase()}`);
        turn = (turn === 'o') ? 'x' : 'o';
        checkwin(playbox);
    } else {
        console.log("there is no space");
    }
    turnindicator.innerText = ` ${turn.toUpperCase()} turn`;
}

function checkwin(array) {
    const winConditions = [
        [array[0][0], array[0][1], array[0][2]], // Row 1
        [array[1][0], array[1][1], array[1][2]], // Row 2
        [array[2][0], array[2][1], array[2][2]], // Row 3
        [array[0][0], array[1][0], array[2][0]], // Column 1
        [array[0][1], array[1][1], array[2][1]], // Column 2
        [array[0][2], array[1][2], array[2][2]], // Column 3
        [array[0][0], array[1][1], array[2][2]], // Diagonal 1
        [array[0][2], array[1][1], array[2][0]]  // Diagonal 2
    ];

    for (let condition of winConditions) {
        if (condition[0] && condition[0] === condition[1] && condition[0] === condition[2]) {
            console.log(`won: ${condition[0]}`);
            won = condition[0];
            break;
        }
    }

    if (won) {
        popupwindow.innerText = `Player ${won.toUpperCase()} won!`;
        popupbox.style.display = "block";
        console.log(`Player ${won.toUpperCase()} won!`);
    } else {
        let isDraw = true;
        for (let row of array) {
            if (row.includes(null)) {
                isDraw = false;
                break;
            }
        }

        if (isDraw) {
            popupwindow.innerText = "It's a Draw!";
            popupbox.style.display = "block";
            console.log("It's a Draw!");
        } else {
            console.log(array);
        }
    }
}

window.addEventListener('click', function (event) {
    if (event.target === popupbox) {
        document.body.style.overflow = 'auto';
        popupbox.style.display = 'none';
    }
});
