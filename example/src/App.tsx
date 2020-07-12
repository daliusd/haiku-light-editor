import React from 'react'

import { Editor, Editable } from 'haiku-light-editor'
import 'haiku-light-editor/dist/index.css'

const editable: Editable = {
  width: 20,
  height: 20
}

const App = () => {
  return <Editor width={600} height={400} editable={editable} />
}

export default App
