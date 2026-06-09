import { useState, useEffect } from 'react'

function App() {
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    fetch('https://prueba-railway-render-production.up.railway.app/pokemon', {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc4MTAzODE5NX0.5hJH9pa3ll58_mA4UJvQgtKgnkQdq-3YlmsbsT4eHcM'
      }
    })
      .then(res => res.json())
      .then(data => setPokemons(data))
  }, [])

  return (
    <div>
      <h1>PokeAPI</h1>
      <p>Cantidad de pokemons: {pokemons.length}</p>
    </div>
  )
}

export default App