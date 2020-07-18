import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Editor, Editable, Settings, ImageField } from 'haiku-light-editor'
import 'haiku-light-editor/dist/index.css'

const settings: Settings = {
  width: 300,
  height: 200
}

const editable: Editable = {
  width: 20,
  height: 20
}

const imageField: ImageField = {
  type: 'image',
  id: '1',
  x: 5,
  y: 5,
  width: 10,
  height: 10,
  angle: 0,
  scale: 0.05,
  cx: 0,
  cy: 0,
  imageWidth: 200,
  imageHeight: 200,
  imageUrl: '/wolf.png',
  imageFlip: false,
  imageRotation: 0
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
        <Route path='/image'>
          <Editor
            settings={settings}
            editable={{ ...editable, fields: [imageField] }}
          />
        </Route>
        <Route path='/'></Route>
      </Switch>
    </Router>
  )
}

export default App
