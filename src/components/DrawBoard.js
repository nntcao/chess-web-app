import kinglight from '../images/Chess_klt45.svg'
import kingdark from '../images/Chess_kdt45.svg'
import queenlight from '../images/Chess_qlt45.svg'
import queendark from '../images/Chess_qdt45.svg'
import bishoplight from '../images/Chess_blt45.svg'
import bishopdark from '../images/Chess_bdt45.svg'
import knightlight from '../images/Chess_nlt45.svg'
import knightdark from '../images/Chess_ndt45.svg'
import rooklight from '../images/Chess_rlt45.svg'
import rookdark from '../images/Chess_rdt45.svg'
import pawnlight from '../images/Chess_plt45.svg'
import pawndark from '../images/Chess_pdt45.svg'
import marker from '../images/circle-64.png'

import css from '../css/ChessBoard.css'

const pieceImages = {
    kl: kinglight,
    kd: kingdark,
    ql: queenlight,
    qd: queendark,
    bl: bishoplight,
    bd: bishopdark,
    nl: knightlight,
    nd: knightdark,
    rl: rooklight,
    rd: rookdark,
    pl: pawnlight,
    pd: pawndark 
}

const numberToLetter = {
    1: 'a',
    2: 'b',
    3: 'c',
    4: 'd',
    5: 'e',
    6: 'f',
    7: 'g',
    8: 'h'
}
  
const DrawBoard = ({ chessBoard, onPieceClickHandler }) => {
  const LENGTH = Math.min(window.innerWidth, window.innerHeight)
  const BOARD_LENGTH = Math.round(LENGTH * 0.80)

  const styleBoard = {
    width: `${BOARD_LENGTH}px`,
    height: `${BOARD_LENGTH}px`,
    position: 'absolute',
    margin: 'auto',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }


  return (
    <div style={styleBoard}>
      <DrawRows chessBoard={chessBoard} onPieceClickHandler={onPieceClickHandler}/>
    </div>
  )
}

const DrawRows = ({ chessBoard, onPieceClickHandler }) => {
  const rowStyles = {
    display:'grid', 
    gridTemplateColumns:'12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5%',
    height: '100%',
    width: '100%'
  }
  return (
    <div style={rowStyles}>
      {Object.keys(chessBoard).map(letter => <DrawColumns key={letter} letter={letter} chessBoard={chessBoard} onPieceClickHandler={onPieceClickHandler}/>)}
    </div>
  )
}

const DrawColumns = ({ letter, chessBoard, onPieceClickHandler }) => {
  var columnCounter = 1
  const columnStyles = {
    display:'grid', 
    gridTemplateRows:'12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5%',
    gridTemplateColumns: '100%'
  }
  return (
    <div style={columnStyles}>
      {Object.keys(chessBoard[letter]).slice(0).reverse().map(number => {
        const squareStyle = {
          backgroundColor: chessBoard[letter][number].color,
          gridColStart: columnCounter,
          gridColEnd: columnCounter + 1,
          display: 'block',
          position: 'relative'
        }
        columnCounter++
        return <DrawSquare key={`${letter}${number}`} letter={letter} number={number} squareStyle={squareStyle} chessBoard={chessBoard} onPieceClickHandler={onPieceClickHandler}/>
      })}
    </div>
  )
}

const DrawSquare = ({ letter, number, squareStyle, chessBoard, onPieceClickHandler }) => {
  const chessPiece = chessBoard[letter][number].piece

  return (
    <div style={squareStyle} onClick={() => {onPieceClickHandler(chessPiece, letter, number)}}>
      <div style={{}}>
        {numberToLetter[letter]}{number}
      </div>
      <DrawChessPiece letter={letter} number={number} chessBoard={chessBoard}/>
    </div>
  )
}

const DrawChessPiece = ({ letter, number, chessBoard }) => {
  const imageDivStyle = {
    overflow: "hidden",
    position: 'absolute',
    top: 0,
    left: 0,
    minWidth: '100%',
    minHeight: '100%'
  }
  
  const chessPiece = chessBoard[letter][number].piece

  if (chessPiece.type === null) {
    if (chessBoard[letter][number].indicatorMoveHere === true) {
      return (
        <div style={imageDivStyle}>
          <img className='marker' src={marker} alt='chess marker' />
        </div>
      )    
    }
    return null
  }
  else {
    var pieceType = chessBoard[letter][number].piece.type
    var pieceColor = chessBoard[letter][number].piece.color
    if (chessBoard[letter][number].indicatorMoveHere === true) {
      return (
        <div style={imageDivStyle}>
          <img className='chessPiece' src={pieceImages[`${pieceType}${pieceColor}`]} alt='chess piece' />
          <img className='marker' src={marker} alt='chess marker'/>
        </div>        
      )
    }
    return (
      <div style={imageDivStyle}>
        <img className='chessPiece' src={pieceImages[`${pieceType}${pieceColor}`]} alt='chess piece'/>
      </div>
    )
  }
}

export default DrawBoard