import * as React from 'react'
import styles from './styles.module.css'

export interface Editable {
  width: number
  height: number
}

interface Props {
  width: number
  height: number
  editable: Editable
}

export const Editor = ({ width, height, editable }: Props) => {
  // TODO: 10px margin default now
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
      style={{ width: `${width}px`, height: `${height}px` }}
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
