import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app.jsx'
import facilitator from './facilitator.js'
import store from './store.js'

const render = (state) => {
  ReactDOM.render(
    <div>
      <App 
        banKomas={state.banKomas}
        komadaiKomas={state.komadaiKomas}
        selectedKoma={state.selectedKoma}
        selectedKomaMovablePositions={state.selectedKomaMovablePositions} />
    </div>,
    document.getElementById('container')
  )
}

store.subscribe(render)

facilitator.init()
facilitator.setStore(store)
facilitator.update()