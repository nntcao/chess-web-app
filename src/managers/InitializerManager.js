const initialPieces = {
    1: 'r',
    2: 'n',
    3: 'b',
    4: 'q',
    5: 'k',
    6: 'b',
    7: 'n',
    8: 'r'
}

const initializeChessBoard = () => {
  const board = {}
  const letterIds = [1, 2, 3, 4, 5, 6, 7, 8]
  // 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'
  const numberIds = [1, 2, 3, 4, 5, 6, 7, 8]
  var dark = true
  for (var letter of letterIds) {
    const squares = {}
    for (var number of numberIds) {
      var colorPiece = null
      var typePiece = null

      if (number === 1 || number === 2) {
        colorPiece = 'l'
        if (number === 1 || number === 8) {
          typePiece = initialPieces[letter]
        }
        else {
          typePiece = 'p'
        }
      }
      else if (number === 7 || number === 8) {
        colorPiece = 'd'
        if (number === 1 || number === 8) {
          typePiece = initialPieces[letter]
        }
        else {
          typePiece = 'p'
        }
      }

      var pickedPiece = {
        type: typePiece,
        color: colorPiece,
      }
      // console.log(pickedPiece);

      squares[number] = {
        color: dark ? 'darkGray' : 'lightGray',
        indicatorMoveHere: false,
        piece: pickedPiece
        // piece: null
        // piece: {
        //   type: 'q',
        //   color: 'l'
        // }
      }
      dark = !dark
    }
    dark = !dark
    board[letter] = squares
  }
  console.log(board);
  return board
}
  
export default { initializeChessBoard }