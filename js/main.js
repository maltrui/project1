//elements
const board = document.getElementById('board')
const tiles = board.childNodes
const button = document.getElementById('playAgain')

let moveBlackChipPart1 = true
let moveBlackChipPart2 = false
let moveRedChipPart1 = false
let moveRedChipPart2 = false

let spaceOpen = false

let isBlackJumpAvailable = false
let isRedJumpAvailable = false
let blackJumpPart2 = false
let redJumpPart2 = false


let currentPlayerTurn = 'Black'
document.getElementById('playerTurn').innerText = currentPlayerTurn
let numOfBlackWins = 0
let numOfRedWins = 0
document.getElementById('numOfBlackWins').innerText = numOfBlackWins
document.getElementById('numOfRedWins').innerText = numOfRedWins

let selectedChip = ''
let selectedChipRow = ''
let selectedChipColumn = ''
let movedToSpaceRow = ''
let movedToSpaceColumn = ''
let loggedJumpRow = ''
let loggedJumpColumn = ''


let boardArray = [
    [0 , 1 , 0 , 1 , 0, 1 , 0 , 1 ],
    [1 , 0 , 1 , 0 , 1 , 0 , 1 , 0 ],
    [0 ,0, 0 ,0, 0 ,0, 0 , 1 ],
    [0, 0, -1 , 0, -1, 0, 0, 0 ],
    [0, 0, 0 , 2 , 0, 0, 0, 0 ],
    [-1 , 0 , -1 , 0 , -1 , 0, -1 , 0 ],
    [0 , 0 , 0 , -1 , 0, 0, 0, -1  ],
    [-1 , 0 , -1 , 0 , -1 , 0 , -1 , 0 ],
]
const availableBlackJumps = []
const availableRedJumps = []

//functions
const createChips = function(board){
    let placer = 1
    board.forEach(function(row){
        row.forEach(function(blackTile){
            while (tiles[placer].firstChild){
                tiles[placer].removeChild(tiles[placer].firstChild)
            }
            let newChip = document.createElement('div')
            if (blackTile == 1){
                newChip.classList.add('chip', 'blackChip', 'nonBlackKing')
                tiles[placer].appendChild(newChip)
            }
            if (blackTile == 1.5){
                newChip.classList.add('chip', 'blackChip', 'nonBlackKing', 'selectedChip')
                tiles[placer].appendChild(newChip)
            }
            if (blackTile == 2){
                newChip.classList.add('chip', 'blackChip', 'blackKing')
                newChip.innerHTML = 'K'
                tiles[placer].appendChild(newChip)
            }
            if (blackTile == 2.5){
                newChip.classList.add('chip', 'blackChip', 'blackKing', 'selectedChip')
                newChip.innerHTML = 'K'
                tiles[placer].appendChild(newChip)
            }
            if (blackTile == -1){
                newChip.classList.add('chip', 'redChip', 'nonRedKing')
                tiles[placer].appendChild(newChip)
            }
            if(blackTile == -1.5){
                newChip.classList.add('chip', 'redChip', 'nonRedKing', 'selectedChip')
                tiles[placer].appendChild(newChip)
            }
            if(blackTile == -2){
                newChip.classList.add('chip', 'redChip', 'redKing')
                newChip.innerHTML = 'K'
                tiles[placer].appendChild(newChip)
            }
            if(blackTile == -2.5){
                newChip.classList.add('chip', 'redChip', 'redKing', 'selectedChip')
                newChip.innerHTML = 'K'
                tiles[placer].appendChild(newChip)
            }
            if(blackTile == .5){
                newChip.classList.add('jumpHere')
                tiles[placer].appendChild(newChip)
            }
            placer = placer + 2
        })
    })
}

const changeTurn = function(currentPlayerTurn){
    document.getElementById('playerTurn').innerText = ''
    document.getElementById('playerTurn').innerText = currentPlayerTurn
    return currentPlayerTurn == 'Black'
}

const moveRedPiecePart1 = function(event){
    if(changeTurn(currentPlayerTurn) == false){
        if (moveRedChipPart1 == true){
            selectedChipRow = parseInt(event.target.parentNode.id.slice(0,1))-1
            selectedChipColumn = parseInt(event.target.parentNode.id.slice(-1))-1
            
            if (event.target.classList.contains('nonRedKing')){
                boardArray[selectedChipRow].splice([selectedChipColumn], 1, -1.5)
                showOpenSpace()
                boardArray[selectedChipRow].splice([selectedChipColumn], 1, -1)
                checkOpenSpaceNotKingRed(selectedChipRow, selectedChipColumn)
            }
            if (event.target.classList.contains('redKing')){
                boardArray[selectedChipRow].splice([selectedChipColumn], 1, -2.5)
                showOpenSpace()
                boardArray[selectedChipRow].splice([selectedChipColumn], 1, -2)
                checkOpenSpaceKing(selectedChipRow, selectedChipColumn)
            }
            checkForRedJump(boardArray)
            if (spaceOpen == true && isRedJumpAvailable == false){
                moveRedChipPart2 = true
                selectedChip = event.target
            }
            console.log(isRedJumpAvailable + ' isRedJumpAvailable')
            if(isRedJumpAvailable == true && checkIfChipIsInJumpArray(availableRedJumps, selectedChipRow, selectedChipColumn)){
                redJumpPart2 = true
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
            
            if (event.target.classList.contains('nonBlackKing')){
                boardArray[selectedChipRow].splice([selectedChipColumn], 1, 1.5)
                showOpenSpace()
                boardArray[selectedChipRow].splice([selectedChipColumn], 1, 1)
                checkOpenSpaceNotKingBlack(selectedChipRow, selectedChipColumn)
                console.log(isBlackJumpAvailable + ' is blackJumpAvailable when it returns')
            }
            if (event.target.classList.contains('blackKing')){
                boardArray[selectedChipRow].splice([selectedChipColumn], 1, 2.5)
                showOpenSpace()
                boardArray[selectedChipRow].splice([selectedChipColumn], 1, 2)
                checkOpenSpaceKing(selectedChipRow, selectedChipColumn)
            }
            checkForBlackJump(boardArray)
            if (spaceOpen == true && isBlackJumpAvailable == false){
                moveBlackChipPart2 = true
                selectedChip = event.target
            }
            console.log(isBlackJumpAvailable + ' is blackJumpAvailable')
            if (isBlackJumpAvailable == true && checkIfChipIsInJumpArray(availableBlackJumps, selectedChipRow, selectedChipColumn) == true ){
                blackJumpPart2 = true
                selectedChip = event.target
            }
        }
    }
}

const moveRedPiecePart2 = function(event){
    if (moveRedChipPart2 == true && spaceOpen == true){
        movedToSpaceRow = parseInt(event.target.id.slice(0,1)) - 1
        movedToSpaceColumn = parseInt(event.target.id.slice(-1)) - 1
        if(selectedChip.classList.contains('nonRedKing')){
            if((selectedChipRow-1 == movedToSpaceRow && selectedChipColumn-1 == movedToSpaceColumn) || (selectedChipRow-1 == movedToSpaceRow && selectedChipColumn+1 == movedToSpaceColumn)){
                boardArray[movedToSpaceRow].splice(movedToSpaceColumn,1 ,-1)
                boardArray[selectedChipRow].splice(selectedChipColumn, 1, 0)
                makeAKing()
                createChips(boardArray)
                spaceOpen = false
                moveBlackChipPart1 = true
                moveRedChipPart2 = false
                currentPlayerTurn = 'Black'
                showOpenSpace()
                checkWin()
                changeTurn(currentPlayerTurn)
            }  
        } else if(selectedChip.classList.contains('redKing')){
            if((selectedChipRow+1 == movedToSpaceRow && selectedChipColumn-1 == movedToSpaceColumn) || (selectedChipRow+1 == movedToSpaceRow && selectedChipColumn+1 == movedToSpaceColumn) || (selectedChipRow-1 == movedToSpaceRow && selectedChipColumn-1 == movedToSpaceColumn) || (selectedChipRow-1 == movedToSpaceRow && selectedChipColumn+1 == movedToSpaceColumn)){
                boardArray[movedToSpaceRow].splice(movedToSpaceColumn, 1, -2)
                boardArray[selectedChipRow].splice(selectedChipColumn, 1, 0)
                makeAKing()
                createChips(boardArray)
                spaceOpen = false
                moveBlackChipPart1 = true
                moveRedChipPart2 = false
                currentPlayerTurn = 'Black'
                showOpenSpace()
                checkWin()
                changeTurn(currentPlayerTurn)
            }
        }
    }
}
const moveBlackPiecePart2 = function(event){
    if (moveBlackChipPart2 == true && spaceOpen == true){
        movedToSpaceRow = parseInt(event.target.id.slice(0,1)) - 1
        movedToSpaceColumn = parseInt(event.target.id.slice(-1)) - 1
        if(selectedChip.classList.contains('nonBlackKing')){
            if ((selectedChipRow+1 == movedToSpaceRow && selectedChipColumn-1 == movedToSpaceColumn) || (selectedChipRow+1 == movedToSpaceRow && selectedChipColumn+1 == movedToSpaceColumn)){
                boardArray[movedToSpaceRow].splice(movedToSpaceColumn, 1, 1)
                boardArray[selectedChipRow].splice(selectedChipColumn, 1, 0)
                makeAKing()
                createChips(boardArray)
                spaceOpen = false
                moveRedChipPart1 = true
                moveBlackChipPart2 = false
                currentPlayerTurn = 'Red'
                showOpenSpace()
                checkWin()
            } 
        }else if (selectedChip.classList.contains('blackKing')){
            if((selectedChipRow+1 == movedToSpaceRow && selectedChipColumn-1 == movedToSpaceColumn) || (selectedChipRow+1 == movedToSpaceRow && selectedChipColumn+1 == movedToSpaceColumn) || (selectedChipRow-1 == movedToSpaceRow && selectedChipColumn-1 == movedToSpaceColumn) || (selectedChipRow-1 == movedToSpaceRow && selectedChipColumn+1 == movedToSpaceColumn)){
                boardArray[movedToSpaceRow].splice(movedToSpaceColumn, 1, 2)
                boardArray[selectedChipRow].splice(selectedChipColumn, 1, 0)
                makeAKing()
                createChips(boardArray)
                spaceOpen = false
                moveRedChipPart1 = true
                moveBlackChipPart2 = false
                currentPlayerTurn = 'Red'
                showOpenSpace()
                checkWin()
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
const checkOpenSpaceKing = function(movedToSpaceRow, movedToSpaceColumn){
    if(movedToSpaceRow == 0){
        if(movedToSpaceColumn == 7){
            if(boardArray[movedToSpaceRow+1][movedToSpaceColumn-1] == 0){
                spaceOpen = true
            }
        } else if(boardArray[movedToSpaceRow+1][movedToSpaceColumn+1] == 0 || boardArray[movedToSpaceRow+1][movedToSpaceColumn-1] == 0 ){
            spaceOpen = true
        }
    } else if(movedToSpaceRow == 7){
        if(movedToSpaceColumn == 0){
            if(boardArray[movedToSpaceRow-1][movedToSpaceColumn+1] == 0){
                spaceOpen = true
            }
        }else if(boardArray[movedToSpaceRow-1][movedToSpaceColumn+1] == 0 || boardArray[movedToSpaceRow-1][movedToSpaceColumn-1] == 0 ){
            spaceOpen = true
        }

    }else if(boardArray[movedToSpaceRow+1][movedToSpaceColumn-1] == 0 || boardArray[movedToSpaceRow+1][movedToSpaceColumn+1] == 0 || boardArray[movedToSpaceRow-1][movedToSpaceColumn-1] == 0 || [movedToSpaceRow-1][movedToSpaceColumn+1] == 0) {
        spaceOpen = true
    }
}
const checkForBlackJump = function(boardArray){
    let rowCheck = 0
    let columnCheck = 0
    boardArray.forEach(function(row){
        row.forEach(function(blackTile){
            if(blackTile == 1 || blackTile == 1.5){
                if (rowCheck == 7 || rowCheck == 6){
                    
                } else {
                    if (columnCheck == 0){
                        if(boardArray[rowCheck+1][columnCheck+1] <= -1){
                            if(boardArray[rowCheck+2][columnCheck+2] == 0){
                                isBlackJumpAvailable = true
                                let saveSpaces = [rowCheck , columnCheck]
                                availableBlackJumps.push(saveSpaces)
                            }
                        }
                    } else if(columnCheck == 1){
                        if(boardArray[rowCheck+1][columnCheck+1] <= -1){
                            if(boardArray[rowCheck+2][columnCheck+2] == 0){
                                isBlackJumpAvailable = true
                                let saveSpaces = [rowCheck,columnCheck]
                                availableBlackJumps.push(saveSpaces)
                            }
                        }
    
                    } else if (columnCheck == 6){
                        if(boardArray[rowCheck+1][columnCheck-1] <= -1){
                            if(boardArray[rowCheck+2][columnCheck-2] == 0){
                                isBlackJumpAvailable = true
     
                                let saveSpaces = [rowCheck,columnCheck]
                                availableBlackJumps.push(saveSpaces)
                            }
                        }
                    } else if (columnCheck == 7){
                        if (boardArray[rowCheck+1][columnCheck-1] <= -1){
                            if(boardArray[rowCheck+2][columnCheck-2] == 0){
                                isBlackJumpAvailable = true
                                let saveSpaces = [rowCheck,columnCheck]
                                availableBlackJumps.push(saveSpaces)
                            }
                        }
                    }else if(boardArray[rowCheck+1][columnCheck+1] <= -1 || boardArray[rowCheck+1][columnCheck-1] <= -1){
                          if(boardArray[rowCheck+1][columnCheck+1] <= -1){
                            if(boardArray[rowCheck+2][columnCheck+2] == 0){
                                isBlackJumpAvailable = true
                                let saveSpaces = [rowCheck,columnCheck]
                                availableBlackJumps.push(saveSpaces)
                            }
                          }
                          if(boardArray[rowCheck+1][columnCheck-1] <= -1){
                            if(boardArray[rowCheck+2][columnCheck-2] == 0){
                                isBlackJumpAvailable = true
                                let saveSpaces = [rowCheck,columnCheck]
                                availableBlackJumps.push(saveSpaces)
                            }
                          }
                    }
                }
                
            } else if (blackTile == 2 || blackTile == 2.5){
                if (rowCheck <= 1){
                    if(columnCheck <= 1){
                        if(boardArray[rowCheck+1][columnCheck+1] <= -1){
                            if(boardArray[rowCheck+2][columnCheck+2] == 0){
                                isBlackJumpAvailable = true
                                let saveSpaces = [rowCheck,columnCheck]
                                availableBlackJumps.push(saveSpaces)
                            }
                        }
                    }else if(columnCheck >= 6){
                        if(boardArray[rowCheck+1][columnCheck-1] <= -1){
                            if(boardArray[rowCheck+2][columnCheck-2] == 0){
                                isBlackJumpAvailable = true
                                let saveSpaces = [rowCheck,columnCheck]
                                availableBlackJumps.push(saveSpaces)
                            }
                        }
                    } else if (boardArray[rowCheck+1][columnCheck+1] <= -1 || boardArray[rowCheck+1][columnCheck-1] <= -1){
                        if(boardArray[rowCheck+1][columnCheck+1] <= -1){
                            if(boardArray[rowCheck+2][columnCheck+2] == 1){
                                isBlackJumpAvailable = true
                                let saveSpaces = [rowCheck,columnCheck]
                                availableBlackJumps.push(saveSpaces)
                            }
                        }
                        if(boardArray[rowCheck+1][columnCheck-1] <= -1){
                            if(boardArray[rowCheck+2][columnCheck-2] == 0){
                                isBlackJumpAvailable = true
                                let saveSpaces = [rowCheck,columnCheck]
                                availableBlackJumps.push(saveSpaces)
                            }
                        }
                    }
                    
                } else if (rowCheck >= 6){
                    if(columnCheck <= 1){
                        if(boardArray[rowCheck-1][columnCheck+1] <= -1){
                            if(boardArray[rowCheck-1][columnCheck+2] == 0){
                                isBlackJumpAvailable = true
                                let saveSpaces = [rowCheck,columnCheck]
                                availableBlackJumps.push(saveSpaces)
                            }
                        }
                    }else if(columnCheck >= 6){
                        if(boardArray[rowCheck-1][columnCheck-1] <=-1){
                            if(boardArray[rowCheck-2][columnCheck-2] == 0){
                                isBlackJumpAvailable = true
                                let saveSpaces = [rowCheck,columnCheck]
                                availableBlackJumps.push(saveSpaces)
                            }
                        }
                    } else if (boardArray[rowCheck-1][columnCheck+1] <= -1 || boardArray[rowCheck-1][columnCheck-1] <=-1){
                        if(boardArray[rowCheck-1][columnCheck+1] <=-1){
                            if(boardArray[rowCheck-2][columnCheck+2] == 0){
                                isBlackJumpAvailable = true
                                let saveSpaces = [rowCheck,columnCheck]
                                availableBlackJumps.push(saveSpaces)
                            }
                        }
                        if(boardArray[rowCheck-1][columnCheck-1] <=-1){
                            if(boardArray[rowCheck-2][columnCheck-2] == 0){
                                isBlackJumpAvailable = true
                                let saveSpaces = [rowCheck,columnCheck]
                                availableBlackJumps.push(saveSpaces)
                            }
                        }
                    }
                } else if (boardArray[rowCheck+1][columnCheck+1] <= -1 || boardArray[rowCheck+1][columnCheck-1] <= -1 || boardArray[rowCheck-1][columnCheck+1] <= -1 ||  boardArray[rowCheck-1][columnCheck-1] <= -1){
                    if(boardArray[rowCheck+1][columnCheck+1] <= -1){
                        if(boardArray[rowCheck+2][columnCheck+2] == 0){
                            isBlackJumpAvailable = true
                            let saveSpaces = [rowCheck,columnCheck]
                            availableBlackJumps.push(saveSpaces)
                        }
                      }
                      if(boardArray[rowCheck+1][columnCheck-1] <= -1){
                        if(boardArray[rowCheck+2][columnCheck-2] == 0){
                            isBlackJumpAvailable = true
                            let saveSpaces = [rowCheck,columnCheck]
                            availableBlackJumps.push(saveSpaces)
                        }
                      }
                      if(boardArray[rowCheck-1][columnCheck+1] <= -1){
                        if(boardArray[rowCheck-2][columnCheck+2] == 0){
                            isBlackJumpAvailable = true
                            let saveSpaces = [rowCheck,columnCheck]
                            availableBlackJumps.push(saveSpaces)
                        }
                      }
                      if(boardArray[rowCheck-1][columnCheck-1] <= -1){
                        if(boardArray[rowCheck-2][columnCheck-2] == 0){
                            isBlackJumpAvailable = true
                            let saveSpaces = [rowCheck,columnCheck]
                            availableBlackJumps.push(saveSpaces)
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
    console.log('start')
    let rowCheck = 0
    let columnCheck = 0
    boardArray.forEach(function(row){
        row.forEach(function(blackTile){
            if(blackTile == -1){
                console.log('start')
                if (rowCheck == 0 && rowCheck == 1){
                    
                } else {
                    if (columnCheck == 0){
                        console.log(' are we here')
                        if(boardArray[rowCheck-1][columnCheck+1] >= 1){
                            if(boardArray[rowCheck-2][columnCheck+2] == 0){
                                isRedJumpAvailable = true
                                let saveSpaces = [rowCheck,columnCheck]
                                availableRedJumps.push(saveSpaces)
                            }
                        }
                    } else if(columnCheck == 1){
                        if(boardArray[rowCheck-1][columnCheck+1] >= 1){
                            if(boardArray[rowCheck-2][columnCheck+2] == 0){
                                isRedJumpAvailable = true
                                let saveSpaces = [rowCheck,columnCheck]
                                availableRedJumps.push(saveSpaces)
                            }
                        }
    
                    } else if (columnCheck == 6){
                        if(boardArray[rowCheck-1][columnCheck-1] >= 1){
                            if(boardArray[rowCheck-2][columnCheck-2] == 0){
                                isRedJumpAvailable = true
                                let saveSpaces = [rowCheck,columnCheck]
                                availableRedJumps.push(saveSpaces)
                            }
                        }
                    } else if (columnCheck == 7){
                        if (boardArray[rowCheck-1][columnCheck-1] >= 1){
                            if(boardArray[rowCheck-2][columnCheck-2] == 0){
                                isRedJumpAvailable = true
                                let saveSpaces = [rowCheck,columnCheck]
                                availableRedJumps.push(saveSpaces)
                            }
                        }
                    }else if(boardArray[rowCheck-1][columnCheck+1] >= 1 || boardArray[rowCheck-1][columnCheck-1] >= 1){
                          if(boardArray[rowCheck-1][columnCheck+1] >= 1){
                            console.log('second')
                            if(boardArray[rowCheck-2][columnCheck+2] == 0){
                                isRedJumpAvailable = true
                                let saveSpaces = [rowCheck,columnCheck]
                                availableRedJumps.push(saveSpaces)
                            }
                          }
                          if(boardArray[rowCheck-1][columnCheck-1] >= 1){
                            if(boardArray[rowCheck-2][columnCheck-2] == 0){
                                isRedJumpAvailable = true
                                let saveSpaces = [rowCheck,columnCheck]
                                availableRedJumps.push(saveSpaces)
                            }
                          }
                    }
                }

            } else if (blackTile == -2){
                if (rowCheck <= 1){
                    if(columnCheck <= 1){
                        if(boardArray[rowCheck+1][columnCheck+1] >=1){
                            if(boardArray[rowCheck+2][columnCheck+2] == 0){
                                isRedJumpAvailable = true
                                let saveSpaces = [rowCheck,columnCheck]
                                availableRedJumps.push(saveSpaces)
                            }
                        }
                    }else if(columnCheck >= 6){
                        if(boardArray[rowCheck+1][columnCheck-1] >=1){
                            if(boardArray[rowCheck+2][columnCheck-2] == 0){
                                isRedJumpAvailable = true
                                let saveSpaces = [rowCheck,columnCheck]
                                availableRedJumps.push(saveSpaces)
                            }
                        }
                    } else if (boardArray[rowCheck+1][columnCheck+1] >=1 || boardArray[rowCheck+1][columnCheck-1] >=1){
                        if(boardArray[rowCheck+1][columnCheck+1] >=1){
                            if(boardArray[rowCheck+2][columnCheck+2] == 0){
                                isRedJumpAvailable = true
                                let saveSpaces = [rowCheck,columnCheck]
                                availableRedJumps.push(saveSpaces)
                            }
                        }
                        if(boardArray[rowCheck+1][columnCheck-1] >=1){
                            if(boardArray[rowCheck+2][columnCheck-2] == 0){
                                isRedJumpAvailable = true
                                let saveSpaces = [rowCheck,columnCheck]
                                availableRedJumps.push(saveSpaces)
                            }
                        }
                    }
                    
                } else if (rowCheck >= 6){
                    if(columnCheck <= 1){
                        if(boardArray[rowCheck-1][columnCheck+1] >=1){
                            if(boardArray[rowCheck-1][columnCheck+2] == 0){
                                isRedJumpAvailable = true
                                let saveSpaces = [rowCheck,columnCheck]
                                availableRedJumps.push(saveSpaces)
                            }
                        }
                    }else if(columnCheck >= 6){
                        if(boardArray[rowCheck-1][columnCheck-1] >=1){
                            if(boardArray[rowCheck-2][columnCheck-2] == 0){
                                isRedJumpAvailable = true
                                let saveSpaces = [rowCheck,columnCheck]
                                availableRedJumps.push(saveSpaces)
                            }
                        }
                    } else if (boardArray[rowCheck-1][columnCheck+1] >=1 || boardArray[rowCheck-1][columnCheck-1] >=1){
                        if(boardArray[rowCheck-1][columnCheck+1] >=1){
                            if(boardArray[rowCheck-2][columnCheck+2] == 0){
                                isRedJumpAvailable = true
                                let saveSpaces = [rowCheck,columnCheck]
                                availableRedJumps.push(saveSpaces)
                            }
                        }
                        if(boardArray[rowCheck-1][columnCheck-1] >=1){
                            if(boardArray[rowCheck-2][columnCheck-2] == 0){
                                isRedJumpAvailable = true
                                let saveSpaces = [rowCheck,columnCheck]
                                availableRedJumps.push(saveSpaces)
                            }
                        }
                    }
                    
                } else if (boardArray[rowCheck+1][columnCheck+1] >= 1 || boardArray[rowCheck+1][columnCheck-1] >= 1 || boardArray[rowCheck-1][columnCheck+1] >= 1 ||  boardArray[rowCheck-1][columnCheck-1] >= 1){
                    if(boardArray[rowCheck+1][columnCheck+1] <= -1){
                        if(boardArray[rowCheck+2][columnCheck+2] == 0){
                            isRedJumpAvailable = true
                            let saveSpaces = [rowCheck,columnCheck]
                            availableRedJumps.push(saveSpaces)
                        }
                      }
                      if(boardArray[rowCheck+1][columnCheck-1] <= -1){
                        if(boardArray[rowCheck+2][columnCheck-2] == 0){
                            isRedJumpAvailable = true
                            let saveSpaces = [rowCheck,columnCheck]
                            availableRedJumps.push(saveSpaces)
                        }
                      }
                      if(boardArray[rowCheck-1][columnCheck+1] <= -1){
                        if(boardArray[rowCheck-2][columnCheck+2] == 0){
                            isRedJumpAvailable = true
                            let saveSpaces = [rowCheck,columnCheck]
                            availableRedJumps.push(saveSpaces)
                        }
                      }
                      if(boardArray[rowCheck-1][columnCheck-1] <= -1){
                        if(boardArray[rowCheck-2][columnCheck-2] == 0){
                            isRedJumpAvailable = true
                            let saveSpaces = [rowCheck,columnCheck]
                            availableRedJumps.push(saveSpaces)
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
const checkIfChipIsInJumpArray = function(array, row, column){
    for(i = 0; i < array.length; i ++){
        if(array[i][0] == row && array[i][1] == column){
            return true
        }
    }
}
const makeBlackJumpHappen = function(event){
    if(changeTurn(currentPlayerTurn) == true){
        if (blackJumpPart2 == true){
            movedToSpaceRow = parseInt(event.target.id.slice(0,1)) - 1
            movedToSpaceColumn = parseInt(event.target.id.slice(-1)) - 1
            if(selectedChip.classList.contains('nonBlackKing')){
                if((selectedChipRow+2 == movedToSpaceRow && selectedChipColumn-2 == movedToSpaceColumn) || (selectedChipRow+2 == movedToSpaceRow && selectedChipColumn+2 == movedToSpaceColumn)){
                    if(boardArray[movedToSpaceRow][movedToSpaceColumn]== 0){
                        if (selectedChipRow+2 == movedToSpaceRow && selectedChipColumn-2 == movedToSpaceColumn && boardArray[selectedChipRow+1][selectedChipColumn-1] < 0){
                            boardArray[movedToSpaceRow].splice(movedToSpaceColumn, 1, 1)
                            boardArray[selectedChipRow].splice(selectedChipColumn, 1, 0)
                            boardArray[selectedChipRow+1].splice((selectedChipColumn-1), 1, 0)
                            let newChip = document.createElement('div')
                            newChip.classList.add('chip', 'redChip', 'nonRedKing')
                            actualCapturedRedChips.append(newChip)
                            loggedJumpRow = parseInt(event.target.id.slice(0,1)) - 1
                            loggedJumpColumn = parseInt(event.target.id.slice(-1)) - 1
                        }
                        if (selectedChipRow+2 == movedToSpaceRow && selectedChipColumn+2 == movedToSpaceColumn && boardArray[selectedChipRow+1][selectedChipColumn+1] < 0){
                            boardArray[movedToSpaceRow].splice(movedToSpaceColumn, 1, 1)
                            boardArray[selectedChipRow].splice(selectedChipColumn, 1, 0)
                            boardArray[selectedChipRow+1].splice((selectedChipColumn+1), 1, 0)
                            let newChip = document.createElement('div')
                            newChip.classList.add('chip', 'redChip', 'nonRedKing')
                            actualCapturedRedChips.append(newChip)
                            loggedJumpRow = parseInt(event.target.id.slice(0,1)) - 1
                            loggedJumpColumn = parseInt(event.target.id.slice(-1)) - 1
                        }
        
        
                    }

                    canBlackJumpAgain(loggedJumpRow, loggedJumpColumn)
                }
            } else if(selectedChip.classList.contains('blackKing')){
                if((selectedChipRow+2 == movedToSpaceRow && selectedChipColumn-2 == movedToSpaceColumn) || (selectedChipRow+2 == movedToSpaceRow && selectedChipColumn+2 == movedToSpaceColumn) || (selectedChipRow-2 == movedToSpaceRow && selectedChipColumn+2 == movedToSpaceColumn) ||(selectedChipRow-2 == movedToSpaceRow && selectedChipColumn-2 == movedToSpaceColumn)){
                    if(boardArray[movedToSpaceRow][movedToSpaceColumn]== 0){

                        if (selectedChipRow+2 == movedToSpaceRow && selectedChipColumn-2 == movedToSpaceColumn && boardArray[selectedChipRow+1][selectedChipColumn-1] < 0 ){
                            boardArray[movedToSpaceRow].splice(movedToSpaceColumn, 1, 2)
                            boardArray[selectedChipRow].splice(selectedChipColumn, 1, 0)
                            boardArray[selectedChipRow+1].splice((selectedChipColumn-1), 1, 0)
                            let newChip = document.createElement('div')
                            newChip.classList.add('chip', 'redChip', 'nonRedKing')
                            actualCapturedRedChips.append(newChip)
                            loggedJumpRow = parseInt(event.target.id.slice(0,1)) - 1
                            loggedJumpColumn = parseInt(event.target.id.slice(-1)) - 1
                        }else if (selectedChipRow+2 == movedToSpaceRow && selectedChipColumn+2 == movedToSpaceColumn && boardArray[selectedChipRow+1][selectedChipColumn+1] < 0){
                            boardArray[movedToSpaceRow].splice(movedToSpaceColumn, 1, 2)
                            boardArray[selectedChipRow].splice(selectedChipColumn, 1, 0)
                            boardArray[selectedChipRow+1].splice((selectedChipColumn+1), 1, 0)
                            let newChip = document.createElement('div')
                            newChip.classList.add('chip', 'redChip', 'nonRedKing')
                            actualCapturedRedChips.append(newChip)
                            loggedJumpRow = parseInt(event.target.id.slice(0,1)) - 1
                            loggedJumpColumn = parseInt(event.target.id.slice(-1)) - 1
                        }else if (selectedChipRow-2 == movedToSpaceRow && selectedChipColumn+2 == movedToSpaceColumn && boardArray[selectedChipRow-1][selectedChipColumn+1] < 0){
                            boardArray[movedToSpaceRow].splice(movedToSpaceColumn, 1, 2)
                            boardArray[selectedChipRow].splice(selectedChipColumn, 1, 0)
                            boardArray[selectedChipRow-1].splice((selectedChipColumn+1), 1, 0)
                            let newChip = document.createElement('div')
                            newChip.classList.add('chip', 'redChip', 'nonRedKing')
                            actualCapturedRedChips.append(newChip)
                            loggedJumpRow = parseInt(event.target.id.slice(0,1)) - 1
                            loggedJumpColumn = parseInt(event.target.id.slice(-1)) - 1
                        }else if(selectedChipRow-2 == movedToSpaceRow && selectedChipColumn-2 == movedToSpaceColumn && boardArray[selectedChipRow-1][selectedChipColumn+1] < 0){
                            boardArray[movedToSpaceRow].splice(movedToSpaceColumn, 1, 2)
                            boardArray[selectedChipRow].splice(selectedChipColumn, 1, 0)
                            boardArray[selectedChipRow-1].splice((selectedChipColumn-1), 1, 0)
                            let newChip = document.createElement('div')
                            newChip.classList.add('chip', 'redChip', 'nonRedKing')
                            actualCapturedRedChips.append(newChip)
                            loggedJumpRow = parseInt(event.target.id.slice(0,1)) - 1
                            loggedJumpColumn = parseInt(event.target.id.slice(-1)) - 1
                        }
                    }
                    canBlackKingJumpAgain(loggedJumpRow, loggedJumpColumn)
                }
            }
            changeTurn(currentPlayerTurn)
            checkWin()
        }
        makeAKing()  
        showOpenSpace()

    }
}
const makeRedJumpHappen = function(event){
    if(changeTurn(currentPlayerTurn) == false){
        if (redJumpPart2 == true){
            movedToSpaceRow = parseInt(event.target.id.slice(0,1)) - 1
            movedToSpaceColumn = parseInt(event.target.id.slice(-1)) - 1
            if(selectedChip.classList.contains('nonRedKing')){
                if((selectedChipRow-2 == movedToSpaceRow && selectedChipColumn+2 == movedToSpaceColumn) || (selectedChipRow-2 == movedToSpaceRow && selectedChipColumn-2 == movedToSpaceColumn)){
                    if(boardArray[movedToSpaceRow][movedToSpaceColumn]== 0){
                        if (selectedChipRow-2 == movedToSpaceRow && selectedChipColumn-2 == movedToSpaceColumn && boardArray[selectedChipRow-1][selectedChipColumn-1] > 0){
                            boardArray[movedToSpaceRow].splice(movedToSpaceColumn, 1, -1)
                            boardArray[selectedChipRow].splice(selectedChipColumn, 1, 0)
                            boardArray[selectedChipRow-1].splice((selectedChipColumn-1), 1, 0)
                            let newChip = document.createElement('div')
                            newChip.classList.add('chip', 'blackChip', 'nonBlackKing')
                            actualCapturedBlackChips.append(newChip)
                            loggedJumpRow = parseInt(event.target.id.slice(0,1)) - 1
                            loggedJumpColumn = parseInt(event.target.id.slice(-1)) - 1
                        }
                        if (selectedChipRow-2 == movedToSpaceRow && selectedChipColumn+2 == movedToSpaceColumn && boardArray[selectedChipRow-1][selectedChipColumn+1] > 0){
                            boardArray[movedToSpaceRow].splice(movedToSpaceColumn, 1, -1)
                            boardArray[selectedChipRow].splice(selectedChipColumn, 1, 0)
                            boardArray[selectedChipRow-1].splice((selectedChipColumn+1), 1, 0)
                            let newChip = document.createElement('div')
                            newChip.classList.add('chip', 'blackChip', 'nonBlackKing')
                            actualCapturedBlackChips.append(newChip)
                            loggedJumpRow = parseInt(event.target.id.slice(0,1)) - 1
                            loggedJumpColumn = parseInt(event.target.id.slice(-1)) - 1
    
                        }
        
        
                    }
                    canRedJumpAgain(loggedJumpRow, loggedJumpColumn)

                }
            } else if(selectedChip.classList.contains('redKing')){
                if((selectedChipRow+2 == movedToSpaceRow && selectedChipColumn-2 == movedToSpaceColumn) || (selectedChipRow+2 == movedToSpaceRow && selectedChipColumn+2 == movedToSpaceColumn) || (selectedChipRow-2 == movedToSpaceRow && selectedChipColumn+2 == movedToSpaceColumn) ||(selectedChipRow-2 == movedToSpaceRow && selectedChipColumn-2 == movedToSpaceColumn)){
                    if(boardArray[movedToSpaceRow][movedToSpaceColumn]==0){
                        if (selectedChipRow+2 == movedToSpaceRow && selectedChipColumn-2 == movedToSpaceColumn && boardArray[selectedChipRow+1][selectedChipColumn-1] > 0 ){
                            boardArray[movedToSpaceRow].splice(movedToSpaceColumn, 1, -2)
                            boardArray[selectedChipRow].splice(selectedChipColumn, 1, 0)
                            boardArray[selectedChipRow+1].splice((selectedChipColumn-1), 1, 0)
                            let newChip = document.createElement('div')
                            newChip.classList.add('chip', 'blackChip', 'nonBlackKing')
                            actualCapturedBlackChips.append(newChip)
                            loggedJumpRow = parseInt(event.target.id.slice(0,1)) - 1
                            loggedJumpColumn = parseInt(event.target.id.slice(-1)) - 1
                        }else if(selectedChipRow+2 == movedToSpaceRow && selectedChipColumn+2 == movedToSpaceColumn && boardArray[selectedChipRow+1][selectedChipColumn+1] > 0){
                            boardArray[movedToSpaceRow].splice(movedToSpaceColumn, 1, -2)
                            boardArray[selectedChipRow].splice(selectedChipColumn, 1, 0)
                            boardArray[selectedChipRow+1].splice((selectedChipColumn+1), 1, 0)
                            let newChip = document.createElement('div')
                            newChip.classList.add('chip', 'blackChip', 'nonBlackKing')
                            actualCapturedBlackChips.append(newChip)
                            loggedJumpRow = parseInt(event.target.id.slice(0,1)) - 1
                            loggedJumpColumn = parseInt(event.target.id.slice(-1)) - 1
                        } else if(selectedChipRow-2 == movedToSpaceRow && selectedChipColumn+2 == movedToSpaceColumn && boardArray[selectedChipRow-1][selectedChipColumn+1] > 0){
                            boardArray[movedToSpaceRow].splice(movedToSpaceColumn, 1, -2)
                            boardArray[selectedChipRow].splice(selectedChipColumn, 1, 0)
                            boardArray[selectedChipRow-1].splice((selectedChipColumn+1), 1, 0)
                            let newChip = document.createElement('div')
                            newChip.classList.add('chip', 'blackChip', 'nonBlackKing')
                            actualCapturedBlackChips.append(newChip)
                            loggedJumpRow = parseInt(event.target.id.slice(0,1)) - 1
                            loggedJumpColumn = parseInt(event.target.id.slice(-1)) - 1
                        } else if(selectedChipRow-2 == movedToSpaceRow && selectedChipColumn-2 == movedToSpaceColumn && boardArray[selectedChipRow-1][selectedChipColumn+1] < 0){
                            boardArray[movedToSpaceRow].splice(movedToSpaceColumn, 1, -2)
                            boardArray[selectedChipRow].splice(selectedChipColumn, 1, 0)
                            boardArray[selectedChipRow-1].splice((selectedChipColumn-1), 1, 0)
                            let newChip = document.createElement('div')
                            newChip.classList.add('chip', 'blackChip', 'nonBlackKing')
                            actualCapturedBlackChips.append(newChip)
                            loggedJumpRow = parseInt(event.target.id.slice(0,1)) - 1
                            loggedJumpColumn = parseInt(event.target.id.slice(-1)) - 1
                        }
                    }
                    
                    canRedKingJumpAgain(loggedJumpRow, loggedJumpColumn)
                }
            }
            changeTurn(currentPlayerTurn)
            checkWin()
        }
        
        makeAKing()
        showOpenSpace()
    }
    
}
const canBlackJumpAgain = function(movedToSpaceRow, movedToSpaceColumn){
    if(movedToSpaceRow < 6){
        if(movedToSpaceColumn <= 2){
            if(boardArray[movedToSpaceRow+1][movedToSpaceColumn+1] <= -1){
                if(boardArray[movedToSpaceRow+2][movedToSpaceColumn+2] == 0){
                    return
                }
            }
        } else if(movedToSpaceColumn >= 6){
            if(boardArray[movedToSpaceRow+1][movedToSpaceColumn-1] <= -1){
                if(boardArray[movedToSpaceRow+2][movedToSpaceColumn-2] == 0){
                    return
                }
            }
        }
        if(boardArray[movedToSpaceRow+1][movedToSpaceColumn+1] <= -1){
            if(boardArray[movedToSpaceRow+2][movedToSpaceColumn+2] == 0){
                return
            }
        }
        if(boardArray[movedToSpaceRow+1][movedToSpaceColumn-1] <= -1){
            if(boardArray[movedToSpaceRow+2][movedToSpaceColumn-2] == 0){
                return
            }
        }
            spaceOpen = false
            moveRedChipPart1 = true
            isBlackJumpAvailable = false
            availableBlackJumps.length = 0
            currentPlayerTurn = 'Red'
        }else{
        spaceOpen = false
        moveRedChipPart1 = true
        isBlackJumpAvailable = false
        availableBlackJumps.length = 0
        currentPlayerTurn = 'Red'
    }
} 
const canRedJumpAgain = function(movedToSpaceRow, movedToSpaceColumn){
    if(movedToSpaceRow >= 2){
        if(movedToSpaceColumn < 2){
            if(boardArray[movedToSpaceRow-1][movedToSpaceColumn+1] >= 1){
                if(boardArray[movedToSpaceRow-2][movedToSpaceColumn+2] == 0){
                    return
                }
            }
        }

        if(movedToSpaceColumn >= 6){

            if(boardArray[movedToSpaceRow-1][movedToSpaceColumn-1] >= 1){
                if(boardArray[movedToSpaceRow-2][movedToSpaceColumn-2] == 0){
                    return
                }
            }
        }
        if(boardArray[movedToSpaceRow-1][movedToSpaceColumn+1] >= 1){
            if(boardArray[movedToSpaceRow-2][movedToSpaceColumn+2] == 0){
                return
            }
        }  
        if(boardArray[movedToSpaceRow-1][movedToSpaceColumn-1] >= 1){
            if(boardArray[movedToSpaceRow-2][movedToSpaceColumn-2] == 0){
                return
            }
        }
        spaceOpen = false
        moveBlackChipPart1 = true
        isRedJumpAvailable = false
        availableRedJumps.length = 0
        currentPlayerTurn = 'Black'

    }else{
        spaceOpen = false
        moveBlackChipPart1 = true
        isRedJumpAvailable = false
        availableRedJumps.length = 0
        currentPlayerTurn = 'Black'
    }
} 
const canBlackKingJumpAgain = function(movedToSpaceRow, movedToSpaceColumn){
    if(movedToSpaceRow<2){
        if(movedToSpaceColumn<2){
            if(boardArray[movedToSpaceRow+1][movedToSpaceColumn+1] <= -1){
                if(boardArray[movedToSpace+2][movedToSpaceColumn+2] == 0){
                    return
                }
            }
        } else if (movedToSpaceColumn>6){
            if(boardArray[movedToSpaceRow+1][movedToSpaceColumn-1]<=-1){
                if(boardArray[movedToSpaceRow+2][movedToSpaceColumn-2]==0){
                    return
                }
            }
        } else if(boardArray[movedToSpaceRow+1][movedToSpaceColumn+1] <= -1 || boardArray[movedToSpaceRow+1][movedToSpaceColumn-1]<=-1){
            if(boardArray[movedToSpaceRow+1][movedToSpaceColumn+1] <= -1){
                if(boardArray[movedToSpace+2][movedToSpaceColumn+2] == 0){
                    return
                }
            } else if(boardArray[movedToSpaceRow+1][movedToSpaceColumn-1]<=-1){
                if(boardArray[movedToSpaceRow+2][movedToSpaceColumn-2]==0){
                    return
                }
            }
        } 
            spaceOpen = false
            moveRedChipPart1 = true
            isBlackJumpAvailable = false
            availableBlackJumps.length = 0
            currentPlayerTurn = 'Red'
    
    } else if(movedToSpaceRow > 6){
        if(movedToSpaceColumn<=2){
            if(boardArray[movedToSpaceRow-1][movedToSpaceColumn+1] <= -1){
                if(boardArray[movedToSpace-2][movedToSpaceColumn+2] == 0){
                    return
                }
            }
        } else if (movedToSpaceColumn>=6){
            if(boardArray[movedToSpaceRow-1][movedToSpaceColumn-1]<=-1){
                if(boardArray[movedToSpaceRow-2][movedToSpaceColumn-2]==0){
                    return
                }
            }
        } else if(boardArray[movedToSpaceRow-1][movedToSpaceColumn+1] <= -1 || boardArray[movedToSpaceRow-1][movedToSpaceColumn-1]<=-1){
            if(boardArray[movedToSpaceRow+1][movedToSpaceColumn+1] <= -1){
                if(boardArray[movedToSpaceRow+2][movedToSpaceColumn+2] == 0){
                    return
                }
            } else if(boardArray[movedToSpaceRow-1][movedToSpaceColumn-1]<=-1){
                if(boardArray[movedToSpaceRow-2][movedToSpaceColumn-2]==0){
                    return
                }
            }

            spaceOpen = false
            moveRedChipPart1 = true
            isBlackJumpAvailable = false
            availableBlackJumps.length = 0
            currentPlayerTurn = 'Red'
        }
            spaceOpen = false
            moveRedChipPart1 = true
            isBlackJumpAvailable = false
            availableBlackJumps.length = 0
            currentPlayerTurn = 'Red'
        
    } else {
        if(boardArray[movedToSpaceRow+1][movedToSpaceColumn+1] <= -1 || boardArray[movedToSpaceRow+1][movedToSpaceColumn-1]<=-1 || boardArray[movedToSpaceRow-1][movedToSpaceColumn+1] <= -1 || boardArray[movedToSpaceRow-1][movedToSpaceColumn-1]<=-1){
            if(movedToSpaceRow < 6){
                if(boardArray[movedToSpaceRow+1][movedToSpaceColumn+1] <= -1){
                    if(boardArray[movedToSpaceRow+2][movedToSpaceColumn+2] == 0){
                        return
                    }
                } 
                if(boardArray[movedToSpaceRow+1][movedToSpaceColumn-1]<=-1){
                    if(boardArray[movedToSpaceRow+2][movedToSpaceColumn-2]==0){
                        return
                    }
                } 
            }
            if(movedToSpaceColumn > 1){
                if(boardArray[movedToSpaceRow-1][movedToSpaceColumn+1] <= -1){
                    if(boardArray[movedToSpaceRow-2][movedToSpaceColumn+2] == 0){
                        return
                    }
                } 
                if(boardArray[movedToSpaceRow-1][movedToSpaceColumn-1]<=-1){
                    if(boardArray[movedToSpaceRow-2][movedToSpaceColumn-2]==0){
                        return
                    }
                } 
            }


            spaceOpen = false
            moveRedChipPart1 = true
            isBlackJumpAvailable = false
            availableBlackJumps.length = 0
            currentPlayerTurn = 'Red'
        } else{
            spaceOpen = false
            moveRedChipPart1 = true
            isBlackJumpAvailable = false
            availableBlackJumps.length = 0
            currentPlayerTurn = 'Red'
        }
    }
}
const canRedKingJumpAgain = function(movedToSpaceRow, movedToSpaceColumn){
    if(movedToSpaceRow<2){
        if(movedToSpaceColumn<2){
            if(boardArray[movedToSpaceRow+1][movedToSpaceColumn+1] >= 1){
                if(boardArray[movedToSpace+2][movedToSpaceColumn+2] == 0){
                    return
                }
            }
        } else if (movedToSpaceColumn>=6){
            if(boardArray[movedToSpaceRow+1][movedToSpaceColumn-1]>= 1){
                if(boardArray[movedToSpaceRow+2][movedToSpaceColumn-2]==0){
                    return
                }
            }
        } else if(boardArray[movedToSpaceRow+1][movedToSpaceColumn+1] >= -1 || boardArray[movedToSpaceRow+1][movedToSpaceColumn-1]>=1){
            if(boardArray[movedToSpaceRow+1][movedToSpaceColumn+1] <= -1){
                if(boardArray[movedToSpace+2][movedToSpaceColumn+2] == 0){
                    return
                }
            } else if(boardArray[movedToSpaceRow+1][movedToSpaceColumn-1]<=-1){
                if(boardArray[movedToSpaceRow+2][movedToSpaceColumn-2]==0){
                    return
                }
            }
        } 
            spaceOpen = false
            moveBlackChipPart1 = true
            isRedJumpAvailable = false
            availableRedJumps.length = 0
            currentPlayerTurn = 'Black'
    
    } else if(movedToSpaceRow > 6){
        if(movedToSpaceColumn<=2){
            if(boardArray[movedToSpaceRow-1][movedToSpaceColumn+1] >= 1){
                if(boardArray[movedToSpace-2][movedToSpaceColumn+2] == 0){
                    return
                }
            }
        } else if (movedToSpaceColumn>6){
            if(boardArray[movedToSpaceRow-1][movedToSpaceColumn-1]>= 1){
                if(boardArray[movedToSpaceRow-2][movedToSpaceColumn-2]==0){
                    return
                }
            }
        } else if(boardArray[movedToSpaceRow-1][movedToSpaceColumn+1] >= 1 || boardArray[movedToSpaceRow-1][movedToSpaceColumn-1]>= 1){
            if(boardArray[movedToSpaceRow+1][movedToSpaceColumn+1] <= -1){
                if(boardArray[movedToSpace+2][movedToSpaceColumn+2] == 0){
                    return
                }
            } else if(boardArray[movedToSpaceRow-1][movedToSpaceColumn-1] >= 1){
                if(boardArray[movedToSpaceRow-2][movedToSpaceColumn-2]==0){
                    return
                }
            }
            spaceOpen = false
            moveBlackChipPart1 = true
            isRedJumpAvailable = false
            availableRedJumps.length = 0
            currentPlayerTurn = 'Black'
        }

        spaceOpen = false
        moveBlackChipPart1 = true
        isRedJumpAvailable = false
        availableRedJumps.length = 0
        currentPlayerTurn = 'Black'
        
    } else {
        if(boardArray[movedToSpaceRow+1][movedToSpaceColumn+1] >= 1 || boardArray[movedToSpaceRow+1][movedToSpaceColumn-1] >=1 || boardArray[movedToSpaceRow-1][movedToSpaceColumn+1] >= 1 || boardArray[movedToSpaceRow-1][movedToSpaceColumn-1] >= 1){
            if(movedToSpaceRow < 6){
                if(boardArray[movedToSpaceRow+1][movedToSpaceColumn+1] >= 1){
                    if(boardArray[movedToSpaceRow+2][movedToSpaceColumn+2] == 0){
                        return
                    }
                } 
                if(boardArray[movedToSpaceRow+1][movedToSpaceColumn-1] >= 1){
                    if(boardArray[movedToSpaceRow+2][movedToSpaceColumn-2]==0){
                        return
                    }
                } 
            }
            if(movedToSpaceRow>1){
                if(boardArray[movedToSpaceRow-1][movedToSpaceColumn+1] >= 1){
                    if(boardArray[movedToSpaceRow-2][movedToSpaceColumn+2] == 0){
                        return
                    }
                } 
                if(boardArray[movedToSpaceRow-1][movedToSpaceColumn-1] >= 1){
                    if(boardArray[movedToSpaceRow-2][movedToSpaceColumn-2]==0){
                        return
                    }
                } 
            }

            spaceOpen = false
            moveBlackChipPart1 = true
            isRedJumpAvailable = false
            availableRedJumps.length = 0
            currentPlayerTurn = 'Black'
        } else{
            spaceOpen = false
            moveBlackChipPart1 = true
            isRedJumpAvailable = false
            availableRedJumps.length = 0
            currentPlayerTurn = 'Black'
        }
    }
}
const makeAKing = function(){
    let rowCount = 0
    let columnCheck = 0
    boardArray.forEach(function(row){

        row.forEach(function(blackTile, index, array){
            if(rowCount == 7 && boardArray[rowCount][columnCheck] == 1){
                blackTile = 2
                array[index] = blackTile
            }
            if(rowCount == 0 && boardArray[rowCount][columnCheck] == -1){
               blackTile = -2
               array[index] = blackTile 
            }

            columnCheck = columnCheck + 1 
        })
    rowCount = rowCount + 1
    columnCheck = 0
    })
}

const checkWin = function(){
    let didBlackWin = true
    let didRedWin = true
    let cantBlackMove = false
    let cantRedMove = false
    let numOfRedChips = 0
    let numOfRedChipsThatCantMove = 0
    let numOfBlackChips = 0
    let numOfBlackChipsThatCantMove = 0
    boardArray.forEach(function(row){
        row.forEach(function(blackTile){
            if(blackTile == 1 || blackTile == 2){
                didRedWin = false
                numOfBlackChips = numOfBlackChips + 1
            }
            if(blackTile == -1 || blackTile == -2){
                didBlackWin = false
                numOfRedChips = numOfRedChips + 1
            }
        })
    })
    let rowCheck = 0
    let columnCheck = 0 
    boardArray.forEach(function(row){
        row.forEach(function(blackTile){
            if(blackTile == 1){
                if (rowCheck < 7){
                    checkOpenSpaceNotKingBlack(rowCheck,columnCheck)
                }
                if (spaceOpen == false){
                    numOfBlackChipsThatCantMove = numOfRedChipsThatCantMove + 1
                }
                spaceOpen = false
            }
            if(blackTile == 2){
                checkOpenSpaceKing(rowCheck, columnCheck)
                if (spaceOpen == false){
                    numOfBlackChipsThatCantMove = numOfRedChipsThatCantMove + 1
                }
                spaceOpen = false
            }
            if(blackTile == -1){
                if(rowCheck > 0){
                    checkOpenSpaceNotKingRed(rowCheck, columnCheck)
                }
                if (spaceOpen == false){
                    numOfRedChipsThatCantMove = numOfRedChipsThatCantMove + 1
                }
                spaceOpen = false
            }
            if(blackTile == -2){
                checkOpenSpaceKing(rowCheck, columnCheck)
                if(spaceOpen == false){
                    numOfRedChipsThatCantMove = numOfRedChipsThatCantMove + 1
                }
                spaceOpen = false
            }
            columnCheck = columnCheck + 1
        })
        rowCheck = rowCheck + 1
        columnCheck = 0
    })
    if (numOfBlackChips == numOfBlackChipsThatCantMove && numOfBlackChips != 0){
        cantBlackMove = true
    }
    if (numOfRedChips == numOfRedChipsThatCantMove && numOfRedChips != 0){
        cantRedMove = true
    }
    if (didBlackWin == true){
        numOfBlackWins = numOfBlackWins + 1
        document.getElementById('numOfBlackWins').innerText = numOfBlackWins
        moveBlackChipPart1 = false
        moveBlackChipPart2 = false
        moveRedChipPart1 = false
        moveRedChipPart2 = false
        document.getElementById('endGameState').innerText = 'Black Wins! Press Resart to play again!'
    }
    if (didRedWin == true){
        numOfRedWins = numOfRedWins + 1
        document.getElementById('numOfRedWins').innerText = numOfRedWins
        document.getElementById('endGameState').innerText = 'Red Wins! Press Resart to play again!'
        moveBlackChipPart1 = false
        moveBlackChipPart2 = false
        moveRedChipPart1 = false
        moveRedChipPart2 = false

    }
    if (cantBlackMove == true){
        numOfRedWins = numOfRedWins + 1
        document.getElementById('numOfRedWins').innerText = numOfRedWins
        document.getElementById('endGameState').innerText = 'Black has no more moves! Red Wins! Press Reset to play again!'
        moveBlackChipPart1 = false
        moveBlackChipPart2 = false
        moveRedChipPart1 = false
        moveRedChipPart2 = false

    }
    if (cantRedMove == true){
        numOfBlackWins = numOfBlackWins + 1
        document.getElementById('numOfBlackWins').innerText = numOfBlackWins
        document.getElementById('endGameState').innerText = 'Red has no more moves! Black Wins! Press Reset to play again!'
        moveBlackChipPart1 = false
        moveBlackChipPart2 = false
        moveRedChipPart1 = false
        moveRedChipPart2 = false
    }

}
// ADD TO EVERY JUMP
const showOpenSpace = function(){
    let rowCheck = 0
    let columnCheck = 0
    if(currentPlayerTurn == 'Black'){
        boardArray.forEach(function(row){
            row.forEach(function(blackTile){
                isBlackJumpAvailable = false
                if(blackTile == 1 || blackTile == 1.5){
                    checkForBlackJump(boardArray)
                    if(isBlackJumpAvailable == true){
                        if(rowCheck != 6 || rowCheck != 7){
                            if(boardArray[rowCheck+1][columnCheck+1] <= -1 && boardArray[rowCheck+2][columnCheck+2]== 0){
                                boardArray[rowCheck+2].splice([columnCheck+2], 1, .5)
                            }
                            if(boardArray[rowCheck+1][columnCheck-1] <= -1 && boardArray[rowCheck+2][columnCheck-2]== 0){
                                boardArray[rowCheck+2].splice([columnCheck-2], 1, .5)
                            }
                        }

                    }
                }
                if(blackTile == 2 || blackTile == 2.5){
                    checkForBlackJump(boardArray)
                    if(isBlackJumpAvailable == true){
                        if(rowCheck != 6 && rowCheck != 7){
                            if(boardArray[rowCheck+1][columnCheck+1] <= -1 && boardArray[rowCheck+2][columnCheck+2]== 0){
                                boardArray[rowCheck+2].splice([columnCheck+2], 1, .5)
                            }
                            if(boardArray[rowCheck+1][columnCheck-1] <= -1 && boardArray[rowCheck+2][columnCheck-2]== 0){
                                boardArray[rowCheck+2].splice([columnCheck-2], 1, .5)
                            }
                        }
                        if(rowCheck !=0 & rowCheck != 1){
                            if(columnCheck != 6 || columnCheck != 7){
                                if(boardArray[rowCheck-1][columnCheck+1] <= -1 && boardArray[rowCheck-2][columnCheck+2]== 0){
                                    boardArray[rowCheck-2].splice([columnCheck+2], 1, .5)
                                }  
                            }
                            if(columnCheck != 0 || columnCheck !=1){
                                if(boardArray[rowCheck-1][columnCheck-1] <= -1 && boardArray[rowCheck-2][columnCheck-2]== 0){
                                    boardArray[rowCheck-2].splice([columnCheck-2], 1, .5)
                                }
                            }
                        }

                    }
                }
                columnCheck = columnCheck +1
            })
            rowCheck = rowCheck +1
            columnCheck = 0
        })
    }
    console.log(boardArray)
    createChips(boardArray)
    rowCheck = 0
    columnCheck = 0
    boardArray.forEach(function(row){
        row.forEach(function(blackTile){
            if(blackTile == .5){
                boardArray[rowCheck].splice([columnCheck], 1,0)
            }
            columnCheck = columnCheck +1
        })
        rowCheck = rowCheck +1
        columnCheck = 0
    })
}

const resetBoard = function(){
boardArray = [
    [0 , 1 , 0 , 1 , 0, 1 , 0 , 1 ],
    [1 , 0 , 1 , 0 , 1 , 0 , 1 , 0 ],
    [0 ,1, 0 ,1, 0 ,1, 0 , 1 ],
    [0, 0, 0 , 0, 0, 0, 0, 0 ],
    [0, 0, 0 , 0 , 0, 0, 0, 0 ],
    [-1 , 0 , -1 , 0 , -1 , 0, -1 , 0 ],
    [0 , -1 , 0 , -1 , 0, -1, 0, -1  ],
    [-1 , 0 , -1 , 0 , -1 , 0 , -1 , 0 ],
]
while (actualCapturedBlackChips.firstChild){
    actualCapturedBlackChips.removeChild(actualCapturedBlackChips.firstChild)
}
while (actualCapturedRedChips.firstChild){
    actualCapturedRedChips.removeChild(actualCapturedRedChips.firstChild)
}
moveBlackChipPart1 = true
moveBlackChipPart2 = false
moveRedChipPart1 = false
moveRedChipPart2 = false
spaceOpen = false
isBlackJumpAvailable = false
isRedJumpAvailable = false
blackJumpPart2 = false
redJumpPart2 = false
currentPlayerTurn = 'Black'
document.getElementById('endGameState').innerText = ''
createChips(boardArray)
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
        makeBlackJumpHappen(chip)
        makeRedJumpHappen(chip)
    }
    if (chip.target.classList.contains('jumpHere')){
        moveRedPiecePart2(chip)
        moveBlackPiecePart2(chip)
        makeBlackJumpHappen(chip)
        makeRedJumpHappen(chip)
    }

})
button.addEventListener('click', () => resetBoard())
createChips(boardArray)
