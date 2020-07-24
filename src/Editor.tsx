import React from 'react';
import styles from './styles.module.css';
import { Margins, Props } from './types';
import FieldComponent from './FieldComponent';

const marginsDefaults: Margins = {
  vertical: 10,
  horizontal: 10
};

export const Editor = ({ settings, editable }: Props) => {
  const { width, height, backgroundColor } = settings;
  const margins = settings.margins || marginsDefaults;
  const ppmm = Math.min(
    (width - margins.horizontal * 2) / editable.width,
    (height - margins.vertical * 2) / editable.height
  );

  const editableWidth = editable.width * ppmm;
  const editableHeight = editable.height * ppmm;

  const x = (width - editableWidth) / 2;
  const y = (height - editableHeight) / 2;

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
      >
        {editable.fields &&
          editable.fields.map((field) => (
            <FieldComponent key={field.id} field={field} ppmm={ppmm} />
          ))}
      </div>
    </div>
  );
};
