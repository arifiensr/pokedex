import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [pokeData, setPokeData] = useState([])
  const [selectedPoke, setSelectedPoke] = useState()
  async function getData() {
    const response = await fetch('https://pokeapi.co/api/v2/berry')
    const { results } = await response.json()
    await results.sort((a, b) =>
      // if (a.name < b.name) return -1
      // if (a.name > b.name) return 1
      // return 0
      a.name.localeCompare(b.name)
    )
    setPokeData(results)
  }

  function handleData(e) {
    const filteredData = pokeData.find((item) => item.name === e.target.value)
    if (filteredData) setSelectedPoke(filteredData)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <datalist id="suggestion">
        {pokeData.map((item, i) => {
          return (
            <option key={i} value={item.name}>
              {item.name}
            </option>
          )
        })}
      </datalist>
      <input type="text" placeholder="Search" onChange={(e) => handleData(e)} list="suggestion" />
      <select onChange={(e) => handleData(e)}>
        <option value=""></option>
        {pokeData.map((item, i) => {
          return (
            <option key={i} value={item.name}>
              {item.name}
            </option>
          )
        })}
      </select>

      {selectedPoke && (
        <>
          <p>Name: {selectedPoke.name}</p>
          <p>URL: {selectedPoke.url}</p>
        </>
      )}
    </>
  )
}

export default App
