import React, { useState } from 'react'
import VolunteerForm from './VolunteerForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <VolunteerForm/>
    </div>
  )
}

export default App
