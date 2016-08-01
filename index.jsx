import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app.jsx'

const render = () => {
  ReactDOM.render(
    <div>
      <App />
    </div>,
    document.getElementById('container')
  )
}

render()