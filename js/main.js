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

        console.log(boardArray[parseInt(event.target.parentNode.id.slice(0,1))][parseInt(event.target.parentNode.id.slice(-1))])
        selectedChipRow = parseInt(event.target.parentNode.id.slice(0,1))-1
        selectedChipColumn = parseInt(event.target.parentNode.id.slice(-1))-1
        selectedChip = event.target
        console.log(selectedChipRow)
        console.log(selectedChipColumn)
        console.log(parseInt(event.target.parentNode.id.slice(-1)))

    }
}

const movePiecePart2 = function(event){
    if (moveChipPart2 == true){
        movedToSpaceRow = parseInt(event.target.id.slice(0,1)) - 1
        movedToSpaceColumn = parseInt(event.target.id.slice(-1)) - 1
        boardArray[selectedChipRow].splice(selectedChipColumn, 1, 0)
        if(selectedChip.classList.contains('redChip')){
            boardArray[movedToSpaceRow].splice(movedToSpaceColumn,1 ,-1)
        } else {
            boardArray[movedToSpaceRow].splice(movedToSpaceColumn, 1, 1)
        }
        console.log(boardArray)
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