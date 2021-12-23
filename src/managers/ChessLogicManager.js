import { getSpaceUntilMaxLength } from "@testing-library/user-event/dist/utils"

const isPieceAtPosition = (chessBoard, letter, number) => {
    if (chessBoard[letter][number].piece.type === null) {
        return false
    }
    return true
}

const isEnemyPieceAtPosition = (chessBoard, current, toMove) => {
    var letter = toMove[0]
    var number = toMove[1]

    if (chessBoard[letter][number].piece.type === null) {
        return false
    }
    if (chessBoard[letter][number].piece.color === chessBoard[current[0]][current[1]].piece.color) {
        return false
    }
    return true
}

const checkValidChessBoard = (chessBoard, colorTurn) => {
    var kingCoords = findKingOfColor(chessBoard, colorTurn)
    var colorOpposite = colorTurn === 'l' ? 'd' : 'l'
    for (var i = 1; i <= 8; i++) {
        for (var j = 1; j <= 8; j++) {
            
            if (isPieceAtPosition(chessBoard, i, j)) {
                if (chessBoard[i][j].piece.color === colorOpposite) {
                    var possibleMoves = getPossibleMoves(chessBoard, i, j, false)
                    if (possibleMoves !== null) {
                        if (possibleMoves.some(coord => coord[0] === kingCoords[0] && coord[1] === kingCoords[1])) {
                            return false;
                        }
                    }
                }
            }
        }
    }
    return true
}

const findKingOfColor = (chessBoard, color) => {
    for (var i = 1; i <= 8; i++) {
        for (var j = 1; j <= 8; j++) {
            if (chessBoard[i][j].piece !== null) {
                if (chessBoard[i][j].piece.type === 'k') {
                    if (chessBoard[i][j].piece.color === color) {
                        return [i, j]
                    }
                }
            }
        }
    }
    return null
}

const addCapturablePiecesPawn = (chessBoard, current, toMove, possibleMoves, verifyPossible) => {
    var letter = toMove[0]
    var number = toMove[1]

    if (isLocationWithinBounds(toMove)) {
        if (isEnemyPieceAtPosition(chessBoard, current, toMove)) {        
            var chessPiece = chessBoard[current[0]][current[1]].piece
            var newChessBoard = JSON.parse(JSON.stringify(chessBoard))
            newChessBoard[current[0]][current[1]].piece = {
                type: null,
                color: null,
            }
            newChessBoard[letter][number].piece = chessPiece
            if (verifyPossible) {
                if (checkValidChessBoard(newChessBoard, chessPiece.color)) {
                    possibleMoves.push([letter, number])
                }
            } else {
                possibleMoves.push([letter, number])
            }
        }
    }    
}


const isLocationWithinBounds = (toMove) => {
    var letter = toMove[0]
    var number = toMove[1]

    return ((letter >= 1) && (letter <= 8)) && ((number >= 1) && (number <= 8))
}


const showPossibleMoves = (chessBoard, possibleMovesToShow) => {
    const newChessBoard = chessBoard
    for (var i = 0; i < possibleMovesToShow.length; i++) {
        const letterIndexToShow = possibleMovesToShow[i][0]
        const numberIndexToShow = possibleMovesToShow[i][1]

        newChessBoard[letterIndexToShow][numberIndexToShow].indicatorMoveHere = true
    }
    return newChessBoard
}

const addPossibleMove = (chessBoard, current, toMove, possibleMoves, verifyPossible) => {
    if (isLocationWithinBounds(toMove)) {
        var letter = toMove[0]
        var number = toMove[1]
    
        var newChessBoard = JSON.parse(JSON.stringify(chessBoard))
        var chessPiece = newChessBoard[current[0]][current[1]].piece
        newChessBoard[current[0]][current[1]].piece = {
            type: null,
            color: null,
        }
        newChessBoard[letter][number].piece = chessPiece

        if (!isPieceAtPosition(chessBoard, letter, number)) {
            if (verifyPossible) {
                if (checkValidChessBoard(newChessBoard, chessPiece.color)) {
                    possibleMoves.push([letter, number])
                    return true
                }
            } 
            else {
                possibleMoves.push([letter, number])
                return true
            }
        }
        else if (chessPiece.color !== chessBoard[letter][number].piece.color) {
            if (chessPiece.type !== 'p') {
                if (verifyPossible) {
                    if (checkValidChessBoard(newChessBoard, chessPiece.color)) {
                        possibleMoves.push([letter, number])
                        return false
                    }
                } 
                else {
                    possibleMoves.push([letter, number])
                    return false
                }
            }
        }
    }
    return false
}

const checkDiagonals = (chessBoard, letter, number, possibleMoves, verifyPossible) => {
    for (var i = 1; i <= 7; i++) {
        if (!addPossibleMove(chessBoard, [letter, number], [letter - i, number + i], possibleMoves, verifyPossible)) {
            if (isLocationWithinBounds([letter - i, number + i])) {
                if (isPieceAtPosition(chessBoard, letter - i, number + i)){
                    break
                }    
            }
        }

    }
    for (var i = 1; i <= 7; i++) {
        if (!addPossibleMove(chessBoard, [letter, number], [letter + i, number + i], possibleMoves, verifyPossible)) {
            if (isLocationWithinBounds([letter + i, number + i])) {
                if (isPieceAtPosition(chessBoard, letter + i, number + i)){
                    break
                }    
            }
        }
    }
    for (var i = 1; i <= 7; i++) {
        if (!addPossibleMove(chessBoard, [letter, number], [letter - i, number - i] , possibleMoves, verifyPossible)) {
            if (isLocationWithinBounds([letter - i, number - i])) {
                if (isPieceAtPosition(chessBoard, letter - i, number - i)){
                    break
                }
            }
        }
    }
    for (var i = 1; i <= 7; i++) {
        if (!addPossibleMove(chessBoard, [letter, number], [letter + i, number - i], possibleMoves, verifyPossible)) {
            if (isLocationWithinBounds([letter + i, number - i])) {
                if (isPieceAtPosition(chessBoard, letter + i, number - i)){
                    break
                }
            }
        }
    }
}

const checkVertHori = (chessBoard, letter, number, possibleMoves, verifyPossible) => {
    for (var i = 1; i <= 7; i++) {
        if (!addPossibleMove(chessBoard, [letter, number], [letter + i, number], possibleMoves, verifyPossible)) {
            if (isLocationWithinBounds([letter + i, number])) {
                if (isPieceAtPosition(chessBoard, letter + i, number)){
                    break
                }
            }
        }
    }
    for (var i = 1; i <= 7; i++) {
        console.log(letter - i, number);
        if (!addPossibleMove(chessBoard, [letter, number], [letter - i, number], possibleMoves, verifyPossible)) {
            if (isLocationWithinBounds([letter - i, number])) {
                if (isPieceAtPosition(chessBoard, letter - i, number)){
                    break
                }
            }
        }
    }
    for (var i = 1; i <= 7; i++) {
        if (!addPossibleMove(chessBoard, [letter, number], [letter, number + i], possibleMoves, verifyPossible)) {
            if (isLocationWithinBounds([letter, number + i])) {
                if (isPieceAtPosition(chessBoard, letter, number + i)){
                    break
                }
            }
        }
    }
    for (var i = 1; i <= 7; i++) {
        if (!addPossibleMove(chessBoard, [letter, number], [letter, number - i], possibleMoves, verifyPossible)) {
            if (isLocationWithinBounds([letter, number - i])) {
                if (isPieceAtPosition(chessBoard, letter, number - i)){
                    break
                }
            }
        }
    }
}

const getPossibleMovesKnight = (chessBoard, letter, number, verifyPossible) => {
    const possibleMoves = []
    const checkPositions = [
        [letter + 2, number - 1], [letter + 2, number + 1], 
        [letter - 2, number - 1], [letter - 2, number + 1],
        [letter - 1, number - 2], [letter + 1, number - 2],
        [letter - 1, number + 2], [letter + 1, number + 2]
    ]

    for (var i = 0; i < checkPositions.length; i++) {
        addPossibleMove(chessBoard, [letter, number], checkPositions[i], possibleMoves, verifyPossible)
    }
    return possibleMoves
}

const getPossibleMovesBishop = (chessBoard, letter, number, verifyPossible) => {
    const possibleMoves = []
    const chessPiece = chessBoard[letter][number].piece

    checkDiagonals(chessBoard, letter, number, possibleMoves, verifyPossible)    

    return possibleMoves
}

const getPossibleMovesRook = (chessBoard, letter, number, verifyPossible) => {
    const possibleMoves = []
    const chessPiece = chessBoard[letter][number].piece

    checkVertHori(chessBoard, letter, number, possibleMoves, verifyPossible)

    return possibleMoves
}

const getPossibleMovesKing = (chessBoard, letter, number, verifyPossible) => {
    const possibleMoves = []

    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            addPossibleMove(chessBoard, [letter, number], [letter + i, number + j], possibleMoves, verifyPossible)
        }
    }
    return possibleMoves 
}

const getPossibleMovesPawn = (chessBoard, letter, number, verifyPossible) => {
    const possibleMoves = []
    if (chessBoard[letter][number].piece.color === 'l') {
        if (number === 2 && chessBoard[letter][number + 1].piece.type === null) {
            addPossibleMove(chessBoard, [letter, number], [letter, number + 1], possibleMoves, verifyPossible)
            addPossibleMove(chessBoard, [letter, number], [letter, number + 2], possibleMoves, verifyPossible) 
        } else {
            addPossibleMove(chessBoard, [letter, number], [letter, number + 1], possibleMoves, verifyPossible)
        }
        addCapturablePiecesPawn(chessBoard, [letter, number], [letter - 1, number + 1], possibleMoves, verifyPossible)
        addCapturablePiecesPawn(chessBoard, [letter, number], [letter + 1, number + 1], possibleMoves, verifyPossible)
    }
    else {
        if (number === 7 && chessBoard[letter][number - 1].piece.type === null) {
            addPossibleMove(chessBoard, [letter, number], [letter, number - 1], possibleMoves, verifyPossible)
            addPossibleMove(chessBoard, [letter, number], [letter, number - 2], possibleMoves, verifyPossible) 
        } else {
            addPossibleMove(chessBoard, [letter, number], [letter, number - 1], possibleMoves, verifyPossible)
        }
        addCapturablePiecesPawn(chessBoard, [letter, number], [letter - 1, number - 1], possibleMoves, verifyPossible)
        addCapturablePiecesPawn(chessBoard, [letter, number], [letter + 1, number - 1], possibleMoves, verifyPossible)
    }
    return possibleMoves 
}

const getPossibleMovesQueen = (chessBoard, letter, number, verifyPossible) => {
    const possibleMoves = []
    const chessPiece = chessBoard[letter][number].piece

    checkVertHori(chessBoard, letter, number, possibleMoves, verifyPossible)
    checkDiagonals(chessBoard, letter, number, possibleMoves, verifyPossible)

    return possibleMoves
}

const getPossibleMoves = (chessBoard, letter, number, verifyPossible=true) => {
    var possibleMoves = []
    switch (chessBoard[letter][number].piece.type) {
        case null:
            break;
        case 'k':
            possibleMoves = getPossibleMovesKing(chessBoard, letter, number, verifyPossible)
            break;
        case 'q':
            possibleMoves = getPossibleMovesQueen(chessBoard, letter, number, verifyPossible)
            break;
        case 'b':
            possibleMoves = getPossibleMovesBishop(chessBoard, letter, number, verifyPossible)
            break;
        case 'n':
            possibleMoves = getPossibleMovesKnight(chessBoard, letter, number, verifyPossible)
            break;
        case 'r':
            possibleMoves = getPossibleMovesRook(chessBoard, letter, number, verifyPossible)
            break;
        case 'p':
            possibleMoves = getPossibleMovesPawn(chessBoard, letter, number, verifyPossible)
            break;
        default:
           break;
    }
    return possibleMoves
}

export default {
    showPossibleMoves,
    getPossibleMoves
}