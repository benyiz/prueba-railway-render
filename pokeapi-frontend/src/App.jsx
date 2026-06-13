import { useState, useEffect } from 'react'

function App() {
  const [pokemons, setPokemons] = useState([])
  const [nombre, setNombre] = useState('')

  useEffect(() => {
    fetch('https://prueba-railway-render-production.up.railway.app/pokemon', {
      headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc4MTAzODE5NX0.5hJH9pa3ll58_mA4UJvQgtKgnkQdq-3YlmsbsT4eHcM' }
    })
      .then(res => res.json())
      .then(data => setPokemons(data))
  }, [])

  async function agregarPokemon() {
    const res = await fetch('https://prueba-railway-render-production.up.railway.app/pokemon', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc4MTAzODE5NX0.5hJH9pa3ll58_mA4UJvQgtKgnkQdq-3YlmsbsT4eHcM',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre })
    })
    const nuevo = await res.json()
    setPokemons([...pokemons, nuevo])
    setNombre('')
  }

  return (
    <div>
      <h1>PokeAPI</h1>
      <input 
        value={nombre} 
        onChange={e => setNombre(e.target.value)} 
        placeholder="Nombre del pokemon"
      />
      <button onClick={agregarPokemon}>Agregar</button>
      <ul>
        {pokemons.map(pokemon => (
          <li key={pokemon.id}>{pokemon.nombre}</li>
        ))}
      </ul>
    </div>
  )
}

export default App