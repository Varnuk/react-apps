import React,{useEffect} from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import ReactConfetti from "react-confetti"

export default function App() {
    const [count, setCount] = React.useState(0)
    const [tenzies, setTenzies] = React.useState(false)
    const [dice, setDice] = React.useState(allNewDice())
    
    useEffect(()=>{
      const allHeld = dice.every(die => die.isHeld)
      const firstValue = dice[0].value
      const allValue = dice.every(die => firstValue === die.value)
      if(allHeld && allValue){
        setTenzies(true)
      } 
      if(tenzies){
        setTenzies(false)
        setDice(allNewDice())
        setCount(0)
      }
    },[dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
      }

    function rollDice() {
      setCount(oldCount=>oldCount+1);
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? 
        die :
        generateNewDie() 
      }))
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
      <>
        <main>
          <p className="counter">Current turn : {count}</p>
          <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game?" : "Roll"}</button>
        </main>
      {(tenzies && <ReactConfetti/>)}
      </>
    )
}