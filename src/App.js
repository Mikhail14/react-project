import logo from './logo.svg';
import './App.css';
import {useState} from 'react'

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

function App() {
  // Ячейки, текущий ход и победитель
  const [cells, setCells] = useState(new Array(9).fill(null))
  const [currentStep, setCurrentStep] = useState(SYMBOL_O)
  const [winnerSequence, setWinnerSequence] = useState()
  const [isDraw, setIsDraw] = useState(false)

  // Получить имя класса
  const getSymbolClassName = (symbol) => {
    if (symbol === SYMBOL_O) return 'symbol--o'
    if (symbol === SYMBOL_X) return 'symbol--x'
    return ''
  }

  // Рендер символов
  const renderSymbol = (symbol) => <span className={`symbol ${getSymbolClassName(symbol)}`}>{symbol}</span>

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

  // Рендер страницы
  return (
    <div className="App">
      <div className='game'>
        <div className='game-info'>
          {winnerSequence ? 'Победитель: ' : isDraw ? '' : 'Ход: '} {!isDraw ? renderSymbol(winnerSymbol ?? currentStep) : 'Ничья!'}
        </div>
        
        <div className='game-field'>
          {
            cells.map((symbol, index) => {
              // ? - не будет вызывать в случае underfined
              const isWinner = winnerSequence?.includes(index)
              return <button 
                      key={index} 
                      className={`cell ${isWinner ? 'cell--win' : ''}`} 
                      onClick={() => handleCellClick(index)}>{symbol ? renderSymbol(symbol) : null}</button>
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

export default App;




{/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}


      // Урок 2. Домашнее задание
      // 1. Сделать кнопку сброс
      // 2. Реализовать сценарий ничьи