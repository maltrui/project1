//elements
const board = document.getElementById('board')
let moveChipPart1 = true
let moveChipPart2 = false
let spaceOpen = false
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
        selectedChipRow = parseInt(event.target.parentNode.id.slice(0,1))-1
        selectedChipColumn = parseInt(event.target.parentNode.id.slice(-1))-1
        if (event.target.classList.contains('redChip')){
            checkOpenSpaceNotKingRed(selectedChipRow, selectedChipColumn)
        }
        if (event.target.classList.contains('blackChip')){
            checkOpenSpaceNotKingBlack(selectedChipRow, selectedChipColumn)
        }
        if (spaceOpen == true){
            moveChipPart1 = false
            moveChipPart2 = true
            selectedChip = event.target
        }
    }
}

const movePiecePart2 = function(event){
    if (moveChipPart2 == true && spaceOpen == true){
        movedToSpaceRow = parseInt(event.target.id.slice(0,1)) - 1
        movedToSpaceColumn = parseInt(event.target.id.slice(-1)) - 1
        boardArray[selectedChipRow].splice(selectedChipColumn, 1, 0)
  
        if(selectedChip.classList.contains('redChip') && boardArray[movedToSpaceRow][movedToSpaceColumn]==0){
            boardArray[movedToSpaceRow].splice(movedToSpaceColumn,1 ,-1)
            event.target.appendChild(selectedChip)
            spaceOpen = false
            moveChipPart1 = true
            moveChipPart2 = false
        } else if (boardArray[movedToSpaceRow][movedToSpaceColumn]==0){
            boardArray[movedToSpaceRow].splice(movedToSpaceColumn, 1, 1)
            event.target.appendChild(selectedChip)
            spaceOpen = false
            moveChipPart1 = true
            moveChipPart2 = false
        }
        console.log(boardArray)
    }
}

const checkOpenSpaceNotKingRed = function(movedToSpaceRow, movedToSpaceColumn){
    if(boardArray[movedToSpaceRow-1][movedToSpaceColumn-1] == 0 || boardArray[movedToSpaceRow-1][movedToSpaceColumn+1] == 0){
        spaceOpen = true
    }

}
const checkOpenSpaceNotKingBlack = function(movedToSpaceRow, movedToSpaceColumn){
    if(boardArray[movedToSpaceRow+1][movedToSpaceColumn-1] == 0 || boardArray[movedToSpaceRow+1][movedToSpaceColumn+1] == 0){
        spaceOpen = true
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