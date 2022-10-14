//elements
const board = document.getElementById('board')
let moveChipPart1 = true
let moveChipPart2 = false
let selectedChip = ''
let selectedChipRow = ''
let selectedChipColumn = ''
let movedToSpaceRow = ''
let movedToSpaceColumn = ''

const boardArray = [
    [0 , 1 , 0 , 1 , 0, 1 , 0 , 1 ],
    [1 , 0 , 1 , 0 , 1 , 0 , 1 , 0 ],
    [0 ,1, 0 ,1, 0 ,1, 0 , 1   ],
    [0, 0, 0 , 0, 0, 0, 0, 0 ],
    [0, 0, 0 , 0 , 0, 0, 0, 0 ],
    [-1 , 0 , -1 , 0 , -1 , 0, -1 , 0 ],
    [0 , -1 , 0 , -1 , 0, -1 , 0, -1 ],
    [-1 , 0 , -1 , 0 , -1 , 0 , -1 , 0 ],
]


//functions
const movePiecePart1 = function(event){
    if (moveChipPart1 == true){
        moveChipPart1 = false
        moveChipPart2 = true
        console.log(event.target.parentNode.id.slice(-1))
        console.log(event.target.parentNode.id.slice(0,1))
        console.log(event.target.parentNode.id)
        console.log(boardArray[parseInt(event.target.parentNode.id.slice(0,1))][parseInt(event.target.parentNode.id.slice(-1))])
        selectedChipRow = parseInt(event.target.parentNode.id.slice(0,1))
        selectedChipColumn = parseInt(event.target.parentNode.id.slice(-1))
        selectedChip = event.target
    }
}

const movePiecePart2 = function(event){
    if (moveChipPart2 == true){
        boardArray[selectedChipRow][selectedChipColumn] = 0
        event.target.appendChild(selectedChip)
        moveChipPart1 = true
        moveChipPart2 = false
    }
}

//event listeners
board.addEventListener('click', function(chip){
    if (chip.target.classList.contains('chip')){
        movePiecePart1(chip)
    }
    if (chip.target.classList.contains('boardPiece') && chip.target.classList.contains('black')){
        movePiecePart2(chip)
    }
})