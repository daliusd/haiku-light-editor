import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Editor, Editable, Settings } from 'haiku-light-editor'
import 'haiku-light-editor/dist/index.css'

const settings: Settings = {
  width: 300,
  height: 200
}

const editable: Editable = {
  width: 20,
  height: 20
}

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/black'>
          <Editor
            settings={{
              ...settings,
              backgroundColor: '#000000'
            }}
            editable={editable}
          />
        </Route>
        <Route path='/simple'>
          <Editor settings={settings} editable={editable} />
        </Route>
        <Route path='/'></Route>
      </Switch>
    </Router>
  )
}

export default App
