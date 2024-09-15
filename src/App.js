import logo from './logo.svg';
import './App.css';
import { useState } from 'react'

// Символы
const SYMBOL_X = 'X'
const SYMBOL_O = 'O'

// Расчет победителя
const computeWinner = (cells) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (
      cells[a] && cells[a] === cells[b] && cells[a] === cells[c]
    ) {
      return [a, b, c]
    }
  }
}

// Рендер страницы
function App() {
  // Ячейки, текущий ход и победитель
  const [cells, setCells] = useState(new Array(9).fill(null))
  const [currentStep, setCurrentStep] = useState(SYMBOL_O)
  const [winnerSequence, setWinnerSequence] = useState()
  const [isDraw, setIsDraw] = useState(false)


  // Символ победителя
  const winnerSymbol = winnerSequence ? cells[winnerSequence[0]] : undefined

  // Обработка клика по ячейке
  const handleCellClick = (index) => {
    if (cells[index] || winnerSequence) {
      return
    }
    const cellsCopy = cells.slice()
    cellsCopy[index] = currentStep
    const winner = computeWinner(cellsCopy)

    setCells(cellsCopy)
    setCurrentStep(currentStep === SYMBOL_O ? SYMBOL_X : SYMBOL_O)
    setWinnerSequence(winner)
    const findNullCell = cellsCopy.find(c => c === null)
    setIsDraw(findNullCell !== null && !winner)
  }

  return (
    <div className="App">
      <div className='game'>
        <GameInfo
          winnerSymbol={winnerSymbol}
          isDraw={isDraw}
          currentStep={currentStep}
        />

        <div className='game-field'>
          {
            cells.map((symbol, index) => {
              // ? - не будет вызывать в случае underfined
              const isWinner = winnerSequence?.includes(index)
              return (
                <GameCell
                  key={index}
                  isWinner={isWinner}
                  onClick={() => handleCellClick(index)}
                  symbol={symbol}
                />
              ) 
            })
          }
        </div>

        <div>
          <button
            onClick={() => {
              setCells(new Array(9).fill(null))
              setWinnerSequence(null)
              setIsDraw(false)
            }}
            className='reset'>Начать заново</button>
        </div>
      </div>
    </div>
  );
}

// Рендер символов
function GameSymbol({ symbol }) {
  // Получить имя класса
  const getSymbolClassName = (symbol) => {
    if (symbol === SYMBOL_O) return 'symbol--o'
    if (symbol === SYMBOL_X) return 'symbol--x'
    return ''
  }
  return <span className={`symbol ${getSymbolClassName(symbol)}`}>{symbol}</span>
}

// Информационная панель
function GameInfo({ winnerSymbol, isDraw, currentStep }) {
  if (isDraw) {
    return (
      <div className='game-info'>Ничья!</div>
    )
  }

  if (winnerSymbol) {
    return (
      <div className='game-info'>
        Победитель: <GameSymbol symbol={winnerSymbol} />
      </div>
    )
  }

  return (
    <div className='game-info'>
      Ход: <GameSymbol symbol={currentStep} />
    </div>
  )
}

// Игровые ячейки
function GameCell({ isWinner, onClick, symbol }) {
  return (
    <button
      className={`cell ${isWinner ? 'cell--win' : ''}`}
      onClick={onClick}>{symbol ? <GameSymbol symbol={symbol} /> : null}
    </button>
  )
}

export default App;