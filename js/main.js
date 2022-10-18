//elements
const board = document.getElementById('board')
const tiles = board.childNodes

let moveBlackChipPart1 = true
let moveBlackChipPart2 = false
let moveRedChipPart1 = true
let moveRedChipPart2 = false

let spaceOpen = false

let isBlackJumpAvailable = false
let isRedJumpAvailable = false
let blackJumpPart2 = false
let redJumpPart2 = false


let currentPlayerTurn = 'black'



let selectedChip = ''
let selectedChipRow = ''
let selectedChipColumn = ''
let movedToSpaceRow = ''
let movedToSpaceColumn = ''
let loggedJumpRow = ''
let loggedJumpColumn = ''


const boardArray = [
    [0 , 1 , 0 , 1 , 0, 1 , 0 , 1 ],
    [1 , 0 , 1 , 0 , 1 , 0 , 1 , 0 ],
    [0 ,1, 0 ,1, 0 ,2, 0 , 1 ],
    [0, 0, 0 , 0, -1, 0, 0, 0 ],
    [0, 0, 0 , 0 , 0, 0, 0, 0 ],
    [-1 , 0 , -1 , 0 , -1 , 0, -1 , 0 ],
    [0 , 0 , 0 , -1 , 0, -1, 0, -1  ],
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
            if (blackTile == 2){
                newChip.classList.add('chip', 'blackChip', 'blackKing')
                newChip.innerHTML = 'K'
                tiles[placer].appendChild(newChip)
            }
            if (blackTile == -1){
                newChip.classList.add('chip', 'redChip', 'nonRedKing')
                tiles[placer].appendChild(newChip)
            }
            if(blackTile == -2){
                newChip.classList.add('chip', 'redChip', 'redKing')
                newChip.innerHTML = 'K'
                tiles[placer].appendChild(newChip)
            }
            placer = placer + 2
        })
    })
}

const changeTurn = function(currentPlayerTurn){
    return currentPlayerTurn == 'black'
}

const moveRedPiecePart1 = function(event){
    console.log(currentPlayerTurn + ' redFunction')
    if(changeTurn(currentPlayerTurn) == false){
        if (moveRedChipPart1 == true){
            selectedChipRow = parseInt(event.target.parentNode.id.slice(0,1))-1
            selectedChipColumn = parseInt(event.target.parentNode.id.slice(-1))-1
            checkForRedJump(boardArray)
            if (event.target.classList.contains('redChip')){
                checkOpenSpaceNotKingRed(selectedChipRow, selectedChipColumn)
            }
            if (spaceOpen == true && isRedJumpAvailable == false){
                moveRedChipPart2 = true
                selectedChip = event.target
            }
            if(isRedJumpAvailable == true && checkIfChipIsInJumpArray(availableRedJumps, selectedChipRow, selectedChipColumn)){
                redJumpPart2 = true
                selectedChip = event.target
            }
        }
    }

}
const moveBlackPiecePart1 = function(event){
    console.log(currentPlayerTurn + ' blackFunction')
    if(changeTurn(currentPlayerTurn) == true){
        if (moveBlackChipPart1 == true){
            selectedChipRow = parseInt(event.target.parentNode.id.slice(0,1))-1
            selectedChipColumn = parseInt(event.target.parentNode.id.slice(-1))-1
            checkForBlackJump(boardArray)
            if (event.target.classList.contains('nonBlackKing')){
                checkOpenSpaceNotKingBlack(selectedChipRow, selectedChipColumn)
            }
            if (event.target.classList.contains('blackKing')){
                checkOpenSpaceKingBlack(selectedChipRow, selectedChipColumn)
            }

            if (spaceOpen == true && isBlackJumpAvailable == false){
                moveBlackChipPart2 = true
                selectedChip = event.target
            }
            console.log(isBlackJumpAvailable +' isBlackJumpAvailable')
            console.log(checkIfChipIsInJumpArray(availableBlackJumps, selectedChipRow, selectedChipColumn))
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
        
        if((selectedChipRow-1 == movedToSpaceRow && selectedChipColumn-1 == movedToSpaceColumn) || (selectedChipRow-1 == movedToSpaceRow && selectedChipColumn+1 == movedToSpaceColumn)){
            boardArray[movedToSpaceRow].splice(movedToSpaceColumn,1 ,-1)
            boardArray[selectedChipRow].splice(selectedChipColumn, 1, 0)
            createChips(boardArray)
            spaceOpen = false
            moveBlackChipPart1 = true
            moveRedChipPart2 = false
            currentPlayerTurn = 'black'
        }  
    }
}
const moveBlackPiecePart2 = function(event){
    if (moveBlackChipPart2 == true && spaceOpen == true){
        console.log('this is running')
        movedToSpaceRow = parseInt(event.target.id.slice(0,1)) - 1
        movedToSpaceColumn = parseInt(event.target.id.slice(-1)) - 1
        if(selectedChip.classList.contains('nonBlackKing')){
            if ((selectedChipRow+1 == movedToSpaceRow && selectedChipColumn-1 == movedToSpaceColumn) || (selectedChipRow+1 == movedToSpaceRow && selectedChipColumn+1 == movedToSpaceColumn)){
                boardArray[movedToSpaceRow].splice(movedToSpaceColumn, 1, 1)
                boardArray[selectedChipRow].splice(selectedChipColumn, 1, 0)
                createChips(boardArray)
                spaceOpen = false
                moveRedChipPart1 = true
                moveBlackChipPart2 = false
                currentPlayerTurn = 'red'
            } 
        }else if (selectedChip.classList.contains('blackKing')){
            if((selectedChipRow+1 == movedToSpaceRow && selectedChipColumn-1 == movedToSpaceColumn) || (selectedChipRow+1 == movedToSpaceRow && selectedChipColumn+1 == movedToSpaceColumn) || (selectedChipRow-1 == movedToSpaceRow && selectedChipColumn-1 == movedToSpaceColumn) || (selectedChipRow-1 == movedToSpaceRow && selectedChipColumn+1 == movedToSpaceColumn)){
                boardArray[movedToSpaceRow].splice(movedToSpaceColumn, 1, 2)
                boardArray[selectedChipRow].splice(selectedChipColumn, 1, 0)
                createChips(boardArray)
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
const checkOpenSpaceKingBlack = function(movedToSpaceRow, movedToSpaceColumn){
    if(boardArray[movedToSpaceRow+1][movedToSpaceColumn-1] == 0 || boardArray[movedToSpaceRow+1][movedToSpaceColumn+1] == 0 || boardArray[movedToSpaceRow-1][movedToSpaceColumn-1] == 0 || [movedToSpaceRow-1][movedToSpaceColumn+1] == 0) {
        spaceOpen = true
    }
}

const checkForBlackJump = function(boardArray){
    let rowCheck = 0
    let columnCheck = 0
    boardArray.forEach(function(row){
        row.forEach(function(blackTile){
            if(blackTile == 1){
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
                
            } else if (blackTile == 2){
                console.log(columnCheck)
                if (columnCheck <= 1){
                    if(rowCheck != 7 && rowCheck != 6){
                        if(boardArray[rowCheck+1][columnCheck+1] <= -1){
                            if(boardArray[rowCheck+2][columnCheck+2] == 0){
                                isBlackJumpAvailable = true
                                let saveSpaces = [rowCheck , columnCheck]
                                availableBlackJumps.push(saveSpaces)
                            }
                        }
                    }
                    if(rowCheck != 0 && rowCheck != 1){
                        if(boardArray[rowCheck-1][columnCheck+1] <= -1){
                            if(boardArray[rowCheck-2][columnCheck+2] == 0){
                                isBlackJumpAvailable = true
                                let saveSpaces = [rowCheck , columnCheck]
                                availableBlackJumps.push(saveSpaces)
                            }
                        }
                    }
                } else if (columnCheck >= 6){
                    if(rowCheck != 0 && rowCheck != 0){
                        if(boardArray[rowCheck-1][columnCheck-1] <= -1){
                            if(boardArray[rowCheck-2][column-2] == 0){
                                isBlackJumpAvailable = true
                                let saveSpaces = [rowCheck , columnCheck]
                                availableBlackJumps.push(saveSpaces)
                            }
                        }
                    }
                    if (rowCheck != 7 && rowCheck != 6){
                        if(boardArray[rowCheck+1][columnCheck-1] <= -1){
                            if(boardArray[rowCheck+2][columnCheck-2] == 0){
                                isBlackJumpAvailable = true
                                let saveSpaces = [rowCheck , columnCheck]
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
    let rowCheck = 0
    let columnCheck = 0
    boardArray.forEach(function(row){
        row.forEach(function(blackTile){
            if(blackTile == -1){
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
                                isRedJumpAvailable = true
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
                        boardArray[movedToSpaceRow].splice(movedToSpaceColumn, 1, 1)
                        boardArray[selectedChipRow].splice(selectedChipColumn, 1, 0)
                        if (selectedChipRow+2 == movedToSpaceRow && selectedChipColumn-2 == movedToSpaceColumn && boardArray[selectedChipRow+1][selectedChipColumn-1] < 0){
                            boardArray[selectedChipRow+1].splice((selectedChipColumn-1), 1, 0)
                            let newChip = document.createElement('div')
                            newChip.classList.add('chip', 'redChip', 'nonRedKing')
                            actualCapturedRedChips.append(newChip)
                            loggedJumpRow = parseInt(event.target.id.slice(0,1)) - 1
                            loggedJumpColumn = parseInt(event.target.id.slice(-1)) - 1
                        }
                        if (selectedChipRow+2 == movedToSpaceRow && selectedChipColumn+2 == movedToSpaceColumn && boardArray[selectedChipRow+1][selectedChipColumn+1] < 0){
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
                console.log('here')
                if((selectedChipRow+2 == movedToSpaceRow && selectedChipColumn-2 == movedToSpaceColumn) || (selectedChipRow+2 == movedToSpaceRow && selectedChipColumn+2 == movedToSpaceColumn) || (selectedChipRow-2 == movedToSpaceRow && selectedChipColumn+2 == movedToSpaceColumn) ||(selectedChipRow-2 == movedToSpaceRow && selectedChipColumn-2 == movedToSpaceColumn)){
                    if(boardArray[movedToSpaceRow][movedToSpaceColumn]== 0){
                        boardArray[movedToSpaceRow].splice(movedToSpaceColumn, 1, 2)
                        boardArray[selectedChipRow].splice(selectedChipColumn, 1, 0)
                        if (selectedChipRow+2 == movedToSpaceRow && selectedChipColumn-2 == movedToSpaceColumn && boardArray[selectedChipRow+1][selectedChipColumn-1] < 0 ){
                            boardArray[selectedChipRow+1].splice((selectedChipColumn-1), 1, 0)
                            let newChip = document.createElement('div')
                            newChip.classList.add('chip', 'redChip', 'nonRedKing')
                            actualCapturedRedChips.append(newChip)
                            loggedJumpRow = parseInt(event.target.id.slice(0,1)) - 1
                            loggedJumpColumn = parseInt(event.target.id.slice(-1)) - 1
                        }else if (selectedChipRow+2 == movedToSpaceRow && selectedChipColumn+2 == movedToSpaceColumn && boardArray[selectedChipRow+1][selectedChipColumn+1] < 0){
                            boardArray[selectedChipRow+1].splice((selectedChipColumn+1), 1, 0)
                            let newChip = document.createElement('div')
                            newChip.classList.add('chip', 'redChip', 'nonRedKing')
                            actualCapturedRedChips.append(newChip)
                            loggedJumpRow = parseInt(event.target.id.slice(0,1)) - 1
                            loggedJumpColumn = parseInt(event.target.id.slice(-1)) - 1
                        }else if (selectedChipRow-2 == movedToSpaceRow && selectedChipColumn+2 == movedToSpaceColumn && boardArray[selectedChipRow-1][selectedChipColumn+1] < 0){
                            boardArray[selectedChipRow-1].splice((selectedChipColumn+1), 1, 0)
                            let newChip = document.createElement('div')
                            newChip.classList.add('chip', 'redChip', 'nonRedKing')
                            actualCapturedRedChips.append(newChip)
                            loggedJumpRow = parseInt(event.target.id.slice(0,1)) - 1
                            loggedJumpColumn = parseInt(event.target.id.slice(-1)) - 1
                        }else if(selectedChipRow-2 == movedToSpaceRow && selectedChipColumn-2 == movedToSpaceColumn && boardArray[selectedChipRow-1][selectedChipColumn+1] < 0){
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
    
        }  
        createChips(boardArray)
    }
    
}
const makeRedJumpHappen = function(event){
    if(changeTurn(currentPlayerTurn) == false){
        if (redJumpPart2 == true){
            movedToSpaceRow = parseInt(event.target.id.slice(0,1)) - 1
            movedToSpaceColumn = parseInt(event.target.id.slice(-1)) - 1
            if((selectedChipRow-2 == movedToSpaceRow && selectedChipColumn+2 == movedToSpaceColumn) || (selectedChipRow-2 == movedToSpaceRow && selectedChipColumn-2 == movedToSpaceColumn)){
    
                if(boardArray[movedToSpaceRow][movedToSpaceColumn]== 0){
                    boardArray[movedToSpaceRow].splice(movedToSpaceColumn, 1, -1)
                    boardArray[selectedChipRow].splice(selectedChipColumn, 1, 0)
                    if (selectedChipRow-2 == movedToSpaceRow && selectedChipColumn-2 == movedToSpaceColumn){
                        console.log(selectedChipRow+1)
                        console.log(selectedChipRow-1)
                        boardArray[selectedChipRow-1].splice((selectedChipColumn-1), 1, 0)
                        let newChip = document.createElement('div')
                        newChip.classList.add('chip', 'blackChip', 'nonBlackKing')
                        actualCapturedBlackChips.append(newChip)
                        loggedJumpRow = parseInt(event.target.id.slice(0,1)) - 1
                        loggedJumpColumn = parseInt(event.target.id.slice(-1)) - 1
                        console.log(boardArray)
                    }
                    if (selectedChipRow-2 == movedToSpaceRow && selectedChipColumn+2 == movedToSpaceColumn){
                        boardArray[selectedChipRow-1].splice((selectedChipColumn+1), 1, 0)
                        let newChip = document.createElement('div')
                        newChip.classList.add('chip', 'blackChip', 'nonBlackKing')
                        actualCapturedBlackChips.append(newChip)
                        loggedJumpRow = parseInt(event.target.id.slice(0,1)) - 1
                        loggedJumpColumn = parseInt(event.target.id.slice(-1)) - 1
                        console.log(boardArray)
                    }
    
    
                }
                canRedJumpAgain(loggedJumpRow, loggedJumpColumn)
            }
        }  
        createChips(boardArray)
    }
    
}
const canBlackJumpAgain = function(movedToSpaceRow, movedToSpaceColumn){
    if(movedToSpaceRow < 6){
        console.log(boardArray[movedToSpaceRow+1][movedToSpaceColumn-1])
        console.log(boardArray[movedToSpaceRow+2][movedToSpaceColumn-2])
        if(movedToSpaceColumn <= 2){
            if(boardArray[movedToSpaceRow+1][movedToSpaceColumn+1] <= -1){
                if(boardArray[movedToSpaceRow+2][movedToSpaceColumn+2] == 0){
                    return
                }
            }
        }
        if(movedToSpaceColumn >= 6){
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
        } else if(boardArray[movedToSpaceRow+1][movedToSpaceColumn-1] <= -1){
            if(boardArray[movedToSpaceRow+2][movedToSpaceColumn-2] == 0){
                return
            }
        } else {
            console.log("why am i here")
            spaceOpen = false
            moveRedChipPart1 = true
            isBlackJumpAvailable = false
            availableBlackJumps.length = 0
            currentPlayerTurn = 'red'
        }

    }else if(movedToSpaceRow >= 6){
  
        spaceOpen = false
        moveRedChipPart1 = true
        isBlackJumpAvailable = false
        availableBlackJumps.length = 0
        currentPlayerTurn = 'red'
    }
} 
const canRedJumpAgain = function(movedToSpaceRow, movedToSpaceColumn){
    if(movedToSpaceRow > 2){
        if(movedToSpaceColumn <= 2){
            if(boardArray[movedToSpaceRow-1][movedToSpaceColumn+1] <= -1){
                if(boardArray[movedToSpaceRow-2][movedToSpaceColumn+2] == 0){
                    return
                }
            }
        }
        if(movedToSpaceColumn >= 6){
            if(boardArray[movedToSpaceRow-1][movedToSpaceColumn-1] <= -1){
                if(boardArray[movedToSpaceRow-2][movedToSpaceColumn-2] == 0){
                    return
                }
            }
        }
        if(boardArray[movedToSpaceRow+1][movedToSpaceColumn+1] <= -1){
            if(boardArray[movedToSpaceRow-2][movedToSpaceColumn+2] == 0){
                return
            }
        } else if(boardArray[movedToSpaceRow-1][movedToSpaceColumn-1] <= -1){
            if(boardArray[movedToSpaceRow-2][movedToSpaceColumn-2] == 0){
                return
            }
        } else {
            spaceOpen = false
            moveBlackChipPart1 = true
            isRedJumpAvailable = false
            availableRedJumps.length = 0
            currentPlayerTurn = 'black'
        }

    }else if(movedToSpaceRow  <= 2 ){
        spaceOpen = false
        moveBlackChipPart1 = true
        isRedJumpAvailable = false
        availableRedJumps.length = 0
        currentPlayerTurn = 'black'
    }
} 
const canBlackKingJumpAgain = function(movedToSpaceRow, movedToSpaceColumn){
    console.log('start of func')
    if(movedToSpaceRow<=2){
        console.log('first if')
        if(movedToSpaceColumn<=2){
            if(boardArray[movedToSpaceRow+1][movedToSpaceColumn+1] <= -1){
                if(boardArray[movedToSpace+2][movedToSpaceColumn+2] == 0){
                    return
                }
            }
        } else if (movedToSpaceColumn>=6){
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
        } else {
            spaceOpen = false
            moveRedChipPart1 = true
            isBlackJumpAvailable = false
            availableBlackJumps.length = 0
            currentPlayerTurn = 'red'
        }
    } else if(movedToSpaceRow >= 6){
        console.log('second if')
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
                if(boardArray[movedToSpace+2][movedToSpaceColumn+2] == 0){
                    return
                }
            } else if(boardArray[movedToSpaceRow-1][movedToSpaceColumn-1]<=-1){
                if(boardArray[movedToSpaceRow-2][movedToSpaceColumn-2]==0){
                    return
                }
            }
        } else {
            spaceOpen = false
            moveRedChipPart1 = true
            isBlackJumpAvailable = false
            availableBlackJumps.length = 0
            currentPlayerTurn = 'red'
        }
    } else {
        if(boardArray[movedToSpaceRow+1][movedToSpaceColumn+1] <= -1 || boardArray[movedToSpaceRow+1][movedToSpaceColumn-1]<=-1 || boardArray[movedToSpaceRow-1][movedToSpaceColumn+1] <= -1 || boardArray[movedToSpaceRow-1][movedToSpaceColumn-1]<=-1){
            if(boardArray[movedToSpaceRow+1][movedToSpaceColumn+1] <= -1){
                if(boardArray[movedToSpaceRow+2][movedToSpaceColumn+2] == 0){
                    return
                }
            } else if(boardArray[movedToSpaceRow+1][movedToSpaceColumn-1]<=-1){
                if(boardArray[movedToSpaceRow+2][movedToSpaceColumn-2]==0){
                    return
                }
            } else if(boardArray[movedToSpaceRow+1][movedToSpaceColumn+1] <= -1){
                if(boardArray[movedToSpaceRow+2][movedToSpaceColumn+2] == 0){
                    return
                }
            } else if(boardArray[movedToSpaceRow-1][movedToSpaceColumn-1]<=-1){
                if(boardArray[movedToSpaceRow-2][movedToSpaceColumn-2]==0){
                    return
                }
            } else {
                spaceOpen = false
                moveRedChipPart1 = true
                isBlackJumpAvailable = false
                availableBlackJumps.length = 0
                currentPlayerTurn = 'red'
            }
        }
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
        makeBlackJumpHappen(chip)
        makeRedJumpHappen(chip)
    }
})

createChips(boardArray)