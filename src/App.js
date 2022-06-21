import React from 'react';
import './App.css';
import Die from './components/Die';
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

function App() {
  const [dice, setDice] = React.useState(allNewDice())
  
  const [tenzies, setTenzies] = React.useState(false)

  const [score, setScore] = React.useState(0)

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true)
        console.log("You won!")
    }
  }, [dice])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice(){
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function rollDice() {
    setDice(prev => prev.map(die => die.isHeld ? die : generateNewDie()))
    setScore(prev => prev+1)
  }

  function holdDice(id) {
    setDice(prev => prev.map((die => die.id===id ? {...die, isHeld : !die.isHeld} : die)))
  }

  function newGame() {
    setTenzies(false)
    setDice(allNewDice())
    setScore(0)
  }

  const diceElements = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>)
  
  return (
    <main>
      {tenzies && <Confetti/>}
      <h1 className="title">Tenzies</h1>
      <h3>Number of tries: {score}</h3>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-dice" onClick={tenzies ? newGame : rollDice}>{tenzies ? "New game" : "Roll"}</button>
    </main>
  );
}

export default App;
