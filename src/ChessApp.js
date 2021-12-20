import './css/ChessApp.css';

import { useState } from 'react'
import DrawBoard from './components/DrawBoard'
import ChessLogicManager from './managers/ChessLogicManager'
import InitializerManager from './managers/InitializerManager'
import ChessBoardManager from './managers/ChessBoardManager'

const ChessApp = () => {

  const [chessBoard, setChessBoard] = useState(InitializerManager.initializeChessBoard())
  const [isWhiteTurn, setIsWhiteTurn] = useState(true)
  const [pieceClicked, setPieceClicked] = useState(null)

  const onPieceClickHandler = (chessPiece, letter, number) => {
    letter = parseInt(letter)
    number = parseInt(number)

    var newChessBoard = JSON.parse(JSON.stringify(chessBoard)) // deep clone chessBoard
    
    const chessSquare = chessBoard[letter][number]


    var possibleMoves = []

    ChessBoardManager.clearBoard(newChessBoard)
    // newChessBoard[letter][number].clicked = true
    switch (chessPiece.type) {
      case null:
        break;
      case 'k':
        possibleMoves = ChessLogicManager.getPossibleMovesKing(newChessBoard, letter, number)
        break;
      case 'q':
        break;
      case 'b':
        break;
      case 'n':
        break;
      case 'r':
        break;
      case 'p':
        possibleMoves = ChessLogicManager.getPossibleMovesPawn(newChessBoard, letter, number)
        newChessBoard = ChessLogicManager.showPossibleMoves(newChessBoard, possibleMoves)
        break;
      default:
        break;
    }
    console.log(newChessBoard);
    setChessBoard(newChessBoard)
  }

  return (
    <div>
      <DrawBoard chessBoard={chessBoard} onPieceClickHandler={onPieceClickHandler}/>
    </div>
  )
}


export default ChessApp