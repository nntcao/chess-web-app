
const clearBoard = (chessBoard) => {
    for (var i = 1; i <= 8; i++) {
        for (var j = 1; j <= 8; j++) {
            chessBoard[i][j].indicatorMoveHere = false
        }
    }
    return chessBoard
}



export default {
    clearBoard
}