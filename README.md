# Checkers

# Background

Game Choice: Checkers
12 pieces per player (Light vs Dark Pieces)
All pieces go on the same color squares
Player with Dark Pieces goes first
Each players turn gets to move one piece
Objective is to either capture all of your opponent's pieces, or prevent your opponent from making a legal move
Normal pieces can move into open forward diagonal square (Normal Move)
King pieces can move forwards and backwards (Normal King Move)
If a normal piece makes it to the opponents back row, then it becomes a king 
All pieces can capture an opponet's piece if there is an open space behind the piece (Normal Jump)
A piece can chain captures together (Chain Jump)
If a piece can capture an opponet's piece, it MUST capture it, no other normally move

# WireFrame

```
Create player pieces
Create 64 space board (32 dark, 32 light)
Create reset board button

boardArray = [
    [-1, -1,-1 ,-1, -1, -1, -1, -1 ]
    [-1, -1,-1 ,-1, -1, -1, -1, -1 ]
    [-1, -1,-1 ,-1, -1, -1, -1, -1 ]
    [-1, -1,-1 ,-1, -1, -1, -1, -1 ]
    [-1, -1,-1 ,-1, -1, -1, -1, -1 ]
    [-1, -1,-1 ,-1, -1, -1, -1, -1 ]
    [-1, -1,-1 ,-1, -1, -1, -1, -1 ]
    [-1, -1,-1 ,-1, -1, -1, -1, -1 ]
]
If boardArray[row][col] == -1, spot is empty
If boardArray[row][col] == 0, player1 (light) has a piece there
If boardArray[row][col] == 1, player2 (dark) has a piece there

ternary for player turn

function for piece move
    - check if capture is possible to allow a nomral move to happen
        - check if the diagonal space is occupied by opponent AND that the diagonal space behind that opponent piece is empty
        - If check fails, allow a normal move
    - If there is a normal move available for a player then
        - allow one piece to be moved to an open diagonal space
        - end the player's turn
    - If there is a capture available for a piece then:
        - show players that there is a forced capture for that specific piece(s)
        - when a piece is captured, remove it from the board
        - if there are multiple different captures from different pieces, only allow one piece to be able to capture
        - if there is a chain capture, continue turn until all chain captures are executed
        - then end the player's turn

function for checking end of game
    -have all pieces been captured? Assign winner to the player who captured all the pieces
    -are there any legal moves left for current player?
        - is there a normal move available?
            - check if for each player piece if there is an open space that can be moved to
        - is there a jump available?
            - check for each piece if there is an open space that can be jumped to
        - if neither are true, that player loses


function for making a Piece a King
    - check if a piece moves, and then is in the last row of their opponents, then make that piece a King

function for resetting Game
    - if a player wins or hits reset Button
        -update player win counter for player who won
        -move all pieces back to starting positions
        -reset starting boardArray
        -reset player going first
        -set pieces take counter to 0
```

