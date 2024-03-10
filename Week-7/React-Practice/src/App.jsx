import { useState } from 'react'
import './App.css'

const obj = {
  link: <a href="www.google.com">Click me to visit Google</a>
}

function App() {

  return (
    <div>
      {obj.link}
    </div>
  )
}

function customRender({obj, path}) {
  return <div>
    <h1>{obj.link}</h1>
  </div>
}

export default App
