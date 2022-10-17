//elements
const board = document.getElementById('board')

let moveBlackChipPart1 = true
let moveBlackChipPart2 = false
let moveRedChipPart1 = true
let moveRedChipPart2 = false
let spaceOpen = false
let currentPlayerTurn = 'black'



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
const changeTurn = function(currentPlayerTurn){
    return currentPlayerTurn == 'black' ? true : false
}

const moveRedPiecePart1 = function(event){
    if(changeTurn(currentPlayerTurn) == false){
        if (moveRedChipPart1 == true){
            selectedChipRow = parseInt(event.target.parentNode.id.slice(0,1))-1
            selectedChipColumn = parseInt(event.target.parentNode.id.slice(-1))-1
            if (event.target.classList.contains('redChip')){
                checkOpenSpaceNotKingRed(selectedChipRow, selectedChipColumn)
            }
            if (spaceOpen == true){
                moveRedChipPart1 = false
                moveRedChipPart2 = true
                selectedChip = event.target
            }
        }
    }

}
const moveBlackPiecePart1 = function(event){
    if(changeTurn(currentPlayerTurn) == true){
        if (moveBlackChipPart1 == true){
            selectedChipRow = parseInt(event.target.parentNode.id.slice(0,1))-1
            selectedChipColumn = parseInt(event.target.parentNode.id.slice(-1))-1
            if (event.target.classList.contains('blackChip')){
                checkOpenSpaceNotKingBlack(selectedChipRow, selectedChipColumn)
            }
            if (spaceOpen == true){
                moveBlackChipPart1 = false
                moveBlackChipPart2 = true
                selectedChip = event.target
            }
        }
    }
}

const moveRedPiecePart2 = function(event){
    if (moveRedChipPart2 == true && spaceOpen == true){
        movedToSpaceRow = parseInt(event.target.id.slice(0,1)) - 1
        movedToSpaceColumn = parseInt(event.target.id.slice(-1)) - 1
        if((selectedChipRow-1 == movedToSpaceRow && selectedChipColumn-1 == movedToSpaceColumn) || (selectedChipRow-1 == movedToSpaceRow && selectedChipColumn+1 == movedToSpaceColumn)){
            if(selectedChip.classList.contains('redChip') && boardArray[movedToSpaceRow][movedToSpaceColumn]==0){
                boardArray[movedToSpaceRow].splice(movedToSpaceColumn,1 ,-1)
                boardArray[selectedChipRow].splice(selectedChipColumn, 1, 0)
                event.target.appendChild(selectedChip)
                spaceOpen = false
                moveBlackChipPart1 = true
                moveRedChipPart2 = false
                currentPlayerTurn = 'black'
            } else if (boardArray[movedToSpaceRow][movedToSpaceColumn]==0){
                boardArray[movedToSpaceRow].splice(movedToSpaceColumn, 1, 1)
                boardArray[selectedChipRow].splice(selectedChipColumn, 1, 0)
                event.target.appendChild(selectedChip)
                spaceOpen = false
                moveBlackChipPart1 = true
                moveRedChipPart2 = false
                currentPlayerTurn = 'black'
            }
        }  
    }
}
const moveBlackPiecePart2 = function(event){
    if (moveBlackChipPart2 == true && spaceOpen == true){
        movedToSpaceRow = parseInt(event.target.id.slice(0,1)) - 1
        movedToSpaceColumn = parseInt(event.target.id.slice(-1)) - 1
        if ((selectedChipRow+1 == movedToSpaceRow && selectedChipColumn-1 == movedToSpaceColumn) || (selectedChipRow+1 == movedToSpaceRow && selectedChipColumn+1 == movedToSpaceColumn)){
            if(selectedChip.classList.contains('redChip') && boardArray[movedToSpaceRow][movedToSpaceColumn]==0){
                boardArray[movedToSpaceRow].splice(movedToSpaceColumn,1 ,-1)
                boardArray[selectedChipRow].splice(selectedChipColumn, 1, 0)
                event.target.appendChild(selectedChip)
                spaceOpen = false
                moveRedChipPart1 = true
                moveBlackChipPart2 = false
                return playerTurn = 'red'
            } else if (boardArray[movedToSpaceRow][movedToSpaceColumn]==0){
                boardArray[movedToSpaceRow].splice(movedToSpaceColumn, 1, 1)
                boardArray[selectedChipRow].splice(selectedChipColumn, 1, 0)
                event.target.appendChild(selectedChip)
                spaceOpen = false
                moveRedChipPart1 = true
                moveBlackChipPart2 = false
                currentPlayerTurn = 'red'
            }
        }
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
        moveRedPiecePart1(chip)
        moveBlackPiecePart1(chip)
    }
    if (chip.target.classList.contains('boardPiece') && chip.target.classList.contains('black')){
        moveRedPiecePart2(chip)
        moveBlackPiecePart2(chip)
    }
})