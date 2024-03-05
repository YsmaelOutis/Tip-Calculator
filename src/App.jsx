import { useState } from 'react'
import './App.css'

function App() {
  const [selectedTip, setSelectedTip] = useState("")
  const [bill, setBill] = useState("")
  const [people, setPeople] = useState("")


  function handleTipSelection(e) {
    let tip = e.target.textContent
    tip = tip.replace('%', '')

    if ( tip === selectedTip) {
      setSelectedTip(null)
      return
    }

    setSelectedTip(tip)
  }

  function isInvalidInput() {
    // If either bill or people is empty or 0, return 0
    return (bill === "" || Number(bill) === 0) || (people === "" || Number(people) === 0)
  }

  function getTotalTipAmount() {
    if (isInvalidInput()) return "0.00"

    let totalTipAmount = (bill * selectedTip) / 100
    return totalTipAmount
  }

  function getTotalAmount() {
    if (isInvalidInput()) return "0.00"

    let totalAmount = (bill / people) + getTotalTipAmount()
    totalAmount = totalAmount.toFixed(2)
    return totalAmount
  }

  function handleReset() {
    setBill("")
    setPeople("")
    setSelectedTip("")
  }

  return (
    <>
      <h1>SPLI<br/>TTER</h1>
      <main>

        <div className="desktop-division forms">
          <div className="bill">
            <div>
              <label htmlFor="bill">Bill</label>
              {(bill !== "" && Number(bill) === 0) && <p className='error'>Can&apos;t be 0</p>}
            </div>
            <input
                type="number" 
                id="bill" 
                name="bill" 
                placeholder="0" 
                value={bill} 
                className={bill !== "" && Number(bill) === 0 ? "error" : ""}
                onChange={(e) => setBill(e.target.value)}
                onFocus={() => setBill("")}
            />
          </div>

          <div className="select-tip">
            <h4>Select Tip %</h4>
            <div className="buttons-container">
              <button onClick={handleTipSelection} className={selectedTip === "5" ? "is-selected" : ""}>5%</button>
              <button onClick={handleTipSelection} className={selectedTip === "10" ? "is-selected" : ""}>10%</button>
              <button onClick={handleTipSelection} className={selectedTip === "15" ? "is-selected" : ""}>15%</button>
              <button onClick={handleTipSelection} className={selectedTip === "25" ? "is-selected" : ""}>25%</button>
              <button onClick={handleTipSelection} className={selectedTip === "50" ? "is-selected" : ""}>50%</button>
              <input 
                type='number'
                id='custom'
                name='custom'
                placeholder='Custom'
                value={selectedTip}
                onChange={(e) => setSelectedTip(e.target.value)}
              />
            </div>
          </div>

          <div className="number-of-people">
            <div>
              <label htmlFor="people">Number of people</label>
              {(people !== "" && Number(people) === 0) && <p>Can&apos;t be 0</p>}
            </div>
            <input
              type="number" 
              id="people" 
              name="people"
              placeholder="0"
              value={people}
              className={(people !== "" && Number(people) === 0) ? "error" : ""}
              onFocus={() => setPeople("")}
              onChange={(e) => setPeople(e.target.value)}
            />
          </div>
        </div>

        <div className="desktop-division">
          <div className="total">
            <div>
              <div className="tip-amount">
                <div>
                  <h4>Tip Amount</h4>
                  <p>/ person</p>
                </div>
                <span>$
                {
                  people && Number(people) !== 0 && bill && !isNaN(getTotalTipAmount()) 
                    ? (getTotalTipAmount() / Number(people)).toFixed(2) 
                    : "0.00"
                }
                </span>
              </div>
              
              <div className="total-amount">
                <div>
                  <h4>Total</h4>
                  <p>/ person</p>
                </div>
                <span>${people && bill ? getTotalAmount() : "0.00"}</span>
              </div>
            </div>
            <button onClick={handleReset}>RESET</button>
          </div>
        </div>

      </main>
    </>
  )
}

export default App
