import * as React from 'react'
import styles from './styles.module.css'

interface Margins {
  vertical: number
  horizontal: number
}

export interface Settings {
  width: number
  height: number
  margins?: Margins
  backgroundColor?: string
}

const marginsDefaults: Margins = {
  vertical: 10,
  horizontal: 10
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
  const { width, height, backgroundColor } = settings
  const margins = settings.margins || marginsDefaults
  const ppmm = Math.min(
    (width - margins.horizontal * 2) / editable.width,
    (height - margins.vertical * 2) / editable.height
  )

  const editableWidth = editable.width * ppmm
  const editableHeight = editable.height * ppmm

  const x = (width - editableWidth) / 2
  const y = (height - editableHeight) / 2

  return (
    <div
      data-testid='editor'
      style={{
        width: width,
        height: height,
        background: backgroundColor || '#eeeeee'
      }}
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
