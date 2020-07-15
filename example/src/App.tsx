import React from 'react'

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
  return <Editor settings={settings} editable={editable} />
}

export default App
