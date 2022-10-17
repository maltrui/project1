//elements
const board = document.getElementById('board')

let moveBlackChipPart1 = true
let moveBlackChipPart2 = false
let moveRedChipPart1 = true
let moveRedChipPart2 = false
let spaceOpen = false
let isBlackJumpAvailable = false
let isRedJumpAvailable = false
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
const availableBlackJumps = []
const availableRedJumps = []

//functions
const changeTurn = function(currentPlayerTurn){
    return currentPlayerTurn == 'black'
}

const moveRedPiecePart1 = function(event){
    if(changeTurn(currentPlayerTurn) == false){
        if (moveRedChipPart1 == true){
            selectedChipRow = parseInt(event.target.parentNode.id.slice(0,1))-1
            selectedChipColumn = parseInt(event.target.parentNode.id.slice(-1))-1
            checkForRedJump(boardArray)
            console.log(availableRedJumps)
            if (event.target.classList.contains('redChip')){
                checkOpenSpaceNotKingRed(selectedChipRow, selectedChipColumn)
            }
            if (spaceOpen == true){
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
            checkForBlackJump(boardArray)
            console.log(availableBlackJumps)
            if (event.target.classList.contains('blackChip')){
                checkOpenSpaceNotKingBlack(selectedChipRow, selectedChipColumn)
            }
            if (spaceOpen == true && isBlackJumpAvailable == false){
                moveBlackChipPart2 = true
                selectedChip = event.target
            }
        }
    }
}

const moveRedPiecePart2 = function(event){
    console.log(spaceOpen + " spaceOpen")
    console.log(moveRedChipPart2 + ' redPart2')
    if (moveRedChipPart2 == true && spaceOpen == true){
        movedToSpaceRow = parseInt(event.target.id.slice(0,1)) - 1
        movedToSpaceColumn = parseInt(event.target.id.slice(-1)) - 1
        if((selectedChipRow-1 == movedToSpaceRow && selectedChipColumn-1 == movedToSpaceColumn) || (selectedChipRow-1 == movedToSpaceRow && selectedChipColumn+1 == movedToSpaceColumn)){
            boardArray[movedToSpaceRow].splice(movedToSpaceColumn,1 ,-1)
            boardArray[selectedChipRow].splice(selectedChipColumn, 1, 0)
            event.target.appendChild(selectedChip)
            spaceOpen = false
            moveBlackChipPart1 = true
            moveRedChipPart2 = false
            currentPlayerTurn = 'black'
        }  
    }
}
const moveBlackPiecePart2 = function(event){
    console.log(spaceOpen + " spaceOpen")
    console.log(moveBlackChipPart2 + ' blackPart2')
    if (moveBlackChipPart2 == true && spaceOpen == true){
        movedToSpaceRow = parseInt(event.target.id.slice(0,1)) - 1
        movedToSpaceColumn = parseInt(event.target.id.slice(-1)) - 1
        if ((selectedChipRow+1 == movedToSpaceRow && selectedChipColumn-1 == movedToSpaceColumn) || (selectedChipRow+1 == movedToSpaceRow && selectedChipColumn+1 == movedToSpaceColumn)){
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

const checkForBlackJump = function(boardArray){
    let rowCheck = 0
    let columnCheck = 0
    boardArray.forEach(function(row){
        row.forEach(function(blackTile){
            if(blackTile == 1){
                if (rowCheck == 7){

                } else {
                    if (columnCheck == 0){
                        if(boardArray[rowCheck+1][columnCheck+1] == -1){
                            if(boardArray[rowCheck+2][columnCheck+2] == 0){
                                isBlackJumpAvailable = true
                                let saveSpaces = [rowCheck,columnCheck]
                                availableBlackJumps.push(saveSpaces)
                            }
                        }
                    } else if(columnCheck == 1){
                        if(boardArray[rowCheck+1][columnCheck+1] == -1){
                            if(boardArray[rowCheck+2][columnCheck+2] == 0){
                                isBlackJumpAvailable = true
                                let saveSpaces = [rowCheck,columnCheck]
                                availableBlackJumps.push(saveSpaces)
                            }
                        }
    
                    } else if (columnCheck == 6){
                        if(boardArray[rowCheck+1][columnCheck-1] == -1){
                            if(boardArray[rowCheck+2][columnCheck-2] == 0){
                                isBlackJumpAvailable = true
     
                                let saveSpaces = [rowCheck,columnCheck]
                                availableBlackJumps.push(saveSpaces)
                            }
                        }
                    } else if (columnCheck == 7){
                        if (boardArray[rowCheck+1][columnCheck-1] == -1){
                            if(boardArray[rowCheck+2][columnCheck-2] == 0){
                                isBlackJumpAvailable = true
                                let saveSpaces = [rowCheck,columnCheck]
                                availableBlackJumps.push(saveSpaces)
                            }
                        }
                    }else if(boardArray[rowCheck+1][columnCheck+1] == -1 || boardArray[rowCheck+1][columnCheck-1] == -1){
                          if(boardArray[rowCheck+1][columnCheck+1] == -1){
                            if(boardArray[rowCheck+2][columnCheck+2] == 0){
                                isBlackJumpAvailable = true
                                let saveSpaces = [rowCheck,columnCheck]
                                availableBlackJumps.push(saveSpaces)
                            }
                          }
                          if(boardArray[rowCheck+1][columnCheck-1] == -1){
                            if(boardArray[rowCheck+2][columnCheck-2] == 0){
                                let saveSpaces = [rowCheck,columnCheck]
                                availableBlackJumps.push(saveSpaces)
                            }
                          }
                    }
                }
                
            }
            columnCheck = columnCheck + 1
        })
        rowCheck = rowCheck+1
        columnCheck = 0
    })
}

const checkForRedJump = function(boardArray){
    let rowCheck = 0
    let columnCheck = 0
    boardArray.forEach(function(row){
        row.forEach(function(redTile){
            if(redTile == -1){
                if (rowCheck == 0){
                    
                } else {
                    if (columnCheck == 0){
                        if(boardArray[rowCheck-1][columnCheck+1] == 1){
                            if(boardArray[rowCheck-2][columnCheck+2] == 0){
                                isRedJumpAvailable = true
                                let saveSpaces = [rowCheck,columnCheck]
                                availableRedJumps.push(saveSpaces)
                            }
                        }
                    } else if(columnCheck == 1){
                        if(boardArray[rowCheck-1][columnCheck+1] == 1){
                            if(boardArray[rowCheck-2][columnCheck+2] == 0){
                                isRedJumpAvailable = true
                                let saveSpaces = [rowCheck,columnCheck]
                                availableRedJumps.push(saveSpaces)
                            }
                        }
    
                    } else if (columnCheck == 6){
                        if(boardArray[rowCheck-1][columnCheck-1] == 1){
                            if(boardArray[rowCheck-2][columnCheck-2] == 0){
                                isRedJumpAvailable = true
     
                                let saveSpaces = [rowCheck,columnCheck]
                                availableRedJumps.push(saveSpaces)
                            }
                        }
                    } else if (columnCheck == 7){
                        if (boardArray[rowCheck-1][columnCheck-1] == 1){
                            if(boardArray[rowCheck-2][columnCheck-2] == 0){
                                isRedJumpAvailable = true
                                let saveSpaces = [rowCheck,columnCheck]
                                availableRedJumps.push(saveSpaces)
                            }
                        }
                    }else if(boardArray[rowCheck-1][columnCheck+1] == 1 || boardArray[rowCheck-1][columnCheck-1] == 1){
                          if(boardArray[rowCheck-1][columnCheck+1] == 1){
                            if(boardArray[rowCheck-2][columnCheck+2] == 0){
                                isRedJumpAvailable = true
                                let saveSpaces = [rowCheck,columnCheck]
                                availableRedJumps.push(saveSpaces)
                            }
                          }
                          if(boardArray[rowCheck-1][columnCheck-1] == 1){
                            if(boardArray[rowCheck-2][columnCheck-2] == 0){
                                let saveSpaces = [rowCheck,columnCheck]
                                availableRedJumps.push(saveSpaces)
                            }
                          }
                    }
                }

            }
            columnCheck = columnCheck + 1
        })
        rowCheck = rowCheck + 1
        columnCheck = 0
    })
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