import * as React from 'react'
import styles from './styles.module.css'

export interface Settings {
  width: number
  height: number
}

export interface Editable {
  width: number
  height: number
}

interface Props {
  settings: Settings
  editable: Editable
}

export const Editor = ({ settings, editable }: Props) => {
  // TODO: 10px margin default now
  const { width, height } = settings
  const ppmm = Math.min(
    (width - 20) / editable.width,
    (height - 20) / editable.height
  )

  const editableWidth = editable.width * ppmm
  const editableHeight = editable.height * ppmm

  const x = (width - editableWidth) / 2
  const y = (height - editableHeight) / 2

  return (
    <div
      data-testid='editor'
      style={{ width: width, height: height }}
      className={styles.editor}
    >
      <div
        style={{
          width: editableWidth,
          height: editableHeight,
          left: x,
          top: y,
          position: 'absolute',
          background: '#ffffff'
        }}
      />
    </div>
  )
}
