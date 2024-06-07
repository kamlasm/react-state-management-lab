import './App.css'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const zombieFighters = [
  {
    name: 'Survivor',
    price: 12,
    strength: 6,
    agility: 4,
    img: 'https://via.placeholder.com/150/92c952',
  },
  {
    name: 'Scavenger',
    price: 10,
    strength: 5,
    agility: 5,
    img: 'https://via.placeholder.com/150/771796',
  },
  {
    name: 'Shadow',
    price: 18,
    strength: 7,
    agility: 8,
    img: 'https://via.placeholder.com/150/24f355',
  },
  {
    name: 'Tracker',
    price: 14,
    strength: 7,
    agility: 6,
    img: 'https://via.placeholder.com/150/d32776',
  },
  {
    name: 'Sharpshooter',
    price: 20,
    strength: 6,
    agility: 8,
    img: 'https://via.placeholder.com/150/1ee8a4',
  },
  {
    name: 'Medic',
    price: 15,
    strength: 5,
    agility: 7,
    img: 'https://via.placeholder.com/150/66b7d2',
  },
  {
    name: 'Engineer',
    price: 16,
    strength: 6,
    agility: 5,
    img: 'https://via.placeholder.com/150/56acb2',
  },
  {
    name: 'Brawler',
    price: 11,
    strength: 8,
    agility: 3,
    img: 'https://via.placeholder.com/150/8985dc',
  },
  {
    name: 'Infiltrator',
    price: 17,
    strength: 5,
    agility: 9,
    img: 'https://via.placeholder.com/150/392537',
  },
  {
    name: 'Leader',
    price: 22,
    strength: 7,
    agility: 6,
    img: 'https://via.placeholder.com/150/602b9e',
  },
]

const App = () => {

  const [team, setTeam] = useState([])
  const [money, setMoney] = useState(100)
  const [strength, setStrength] = useState(0)
  const [agility, setAgility] = useState(0)
  const [searchValue, setSearchValue] = useState(null)

  function handleAddFighter(fighter) {
    if (fighter.price > money) {
      toast("Not enough money!")
    } else {
      const newTeam = structuredClone(team)
      newTeam.push(fighter)
      setTeam(newTeam)
      setMoney(money - fighter.price)
      setStrength(strength + fighter.strength)
      setAgility(agility + fighter.agility)
    }
  }

  function handleRemoveFighter(fighter, index) {
    const newTeam = structuredClone(team)
    newTeam.splice(index, 1)
    setTeam(newTeam)
    setMoney(money + fighter.price)
    setStrength(strength - fighter.strength)
    setAgility(agility - fighter.agility) 
  }

  function logInput(e) {
    setSearchValue(e.target.value)
  }

  const filteredFighters = zombieFighters.filter((fighter) => {
        
    if (!searchValue) {
        return fighter
    } else {
        const regex = new RegExp(`${searchValue}`, 'i')
        return regex.test(fighter.name)
        //  or can write as:
        // fighter.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    }
}) 

  return (<>
    <h1>Zombie Fighters</h1>

    < ToastContainer />

    <h3>Money: {money}</h3>
    <h3>Team Strength: {strength}</h3>
    <h3>Team Agility: {agility}</h3>
    
    <h3>Team</h3>
    <p>{team.length === 0 && 'Pick some team members!'}</p>
    <div className='fightersDiv'>
      {team.map((fighter, index) => {
        return <ul key={index}>
          <img src={fighter.img}/>
          <li>{fighter.name}</li>
          <li>Price: {fighter.price}</li>
          <li>Strength: {fighter.strength}</li>
          <li>Agility: {fighter.agility}</li>
          <button onClick={()=> handleRemoveFighter(fighter, index)}>Remove</button>
      </ul>
      })}
    </div>

    <h3>Fighters</h3>
    <input placeholder='search' onChange={logInput}></input>
    <div className='fightersDiv'>
      {filteredFighters.map((fighter, index) => {
        return <ul key={index}>
          <img src={fighter.img} alt={fighter.name}/>
          <li>{fighter.name}</li>
          <li>Price: {fighter.price}</li>
          <li>Strength: {fighter.strength}</li>
          <li>Agility: {fighter.agility}</li>
          <button onClick={()=> handleAddFighter(fighter)}>Add</button>
      </ul>
      })}
    </div>
  </>)
}

export default App