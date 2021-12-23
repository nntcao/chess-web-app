import './css/ChessApp.css';

import { useState } from 'react'
import DrawBoard from './components/DrawBoard'
import ChessLogicManager from './managers/ChessLogicManager'
import InitializerManager from './managers/InitializerManager'
import ChessBoardManager from './managers/ChessBoardManager'

const ChessApp = () => {

  const [chessBoard, setChessBoard] = useState(InitializerManager.initializeChessBoard())
  const [isWhiteTurn, setIsWhiteTurn] = useState(true)
  const [squareClicked, setSquareClicked] = useState(null)

  const onPieceClickHandler = (letter, number) => {
    console.log(letter);

    letter = parseInt(letter)
    number = parseInt(number)

    var newChessBoard = JSON.parse(JSON.stringify(chessBoard)) // deep clone chessBoard

    console.log(letter);
    console.log(number);

    const chessSquare = chessBoard[letter][number]
    const chessPiece = chessSquare.piece

    console.log(squareClicked);
    console.log([letter, number]);

    if (squareClicked !== null && chessSquare.indicatorMoveHere === true) {
        newChessBoard[letter][number].piece = chessBoard[squareClicked[0]][squareClicked[1]].piece
        newChessBoard[squareClicked[0]][squareClicked[1]].piece = {
          type: null,
          color: null
        }
        ChessBoardManager.clearBoard(newChessBoard)
        
        setIsWhiteTurn(!isWhiteTurn)
        setChessBoard(newChessBoard)
        setSquareClicked(null)
    }
    else if (JSON.stringify(squareClicked) === JSON.stringify([letter, number]) ) {
      ChessBoardManager.clearBoard(newChessBoard)
      setChessBoard(newChessBoard)
      setSquareClicked(null)
    }
    else if ((isWhiteTurn && chessPiece.color === 'l') || (!isWhiteTurn && chessPiece.color === 'd')){
      var possibleMoves = []

      ChessBoardManager.clearBoard(newChessBoard)
      // newChessBoard[letter][number].clicked = true
      possibleMoves = ChessLogicManager.getPossibleMoves(newChessBoard, letter, number)
      newChessBoard = ChessLogicManager.showPossibleMoves(newChessBoard, possibleMoves)
      // console.log(newChessBoard)
      setChessBoard(newChessBoard)
      setSquareClicked([letter, number])
    }
    else if (squareClicked !== null) {
      console.log('clickedaskljhd');
      ChessBoardManager.clearBoard(newChessBoard)
      setChessBoard(newChessBoard)
      setSquareClicked(null)
    }
  }

  return (
    <div>
      <DrawBoard chessBoard={chessBoard} onPieceClickHandler={onPieceClickHandler}/>
    </div>
  )

}


export default ChessApp
