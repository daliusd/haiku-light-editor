import * as React from 'react';
import styles from './styles.module.css';

interface Margins {
  vertical: number;
  horizontal: number;
}

export interface Settings {
  width: number;
  height: number;
  margins?: Margins;
  backgroundColor?: string;
}

const marginsDefaults: Margins = {
  vertical: 10,
  horizontal: 10
};

export interface ImageField {
  type: 'image';
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number;
  scale: number;
  cx: number;
  cy: number;
  imageWidth: number;
  imageHeight: number;
  imageUrl: string;
  imageFlip: boolean;
  imageRotation: number;
}

export type Field = ImageField;

export interface Editable {
  width: number;
  height: number;
  fields?: Field[];
}

interface Props {
  settings: Settings;
  editable: Editable;
}

export const Editor = ({ settings, editable }: Props): JSX.Element => {
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
          editable.fields.map((field) => {
            const imageShift =
              field.imageRotation % 2 === 1
                ? ((field.imageRotation === 3 ? -1 : 1) *
                    ((field.imageWidth - field.imageHeight) *
                      ppmm *
                      field.scale)) /
                  2
                : 0;

            return (
              <div
                key={field.id}
                style={{
                  position: 'absolute',
                  top: field.y * ppmm,
                  left: field.x * ppmm,
                  width: field.width * ppmm,
                  height: field.height * ppmm,
                  transform: `rotate(${field.angle}rad)`
                }}
              >
                <img
                  src={field.imageUrl}
                  alt=''
                  style={{
                    width: field.imageWidth * ppmm * field.scale,
                    height: field.imageHeight * ppmm * field.scale,
                    position: 'absolute',
                    left: field.cx * ppmm,
                    top: field.cy * ppmm,
                    transform: `scaleX(${field.imageFlip ? -1 : 1}) rotate(${
                      field.imageRotation * 90
                    }deg) translate(${imageShift}px, ${
                      imageShift * (field.imageFlip ? -1 : 1)
                    }px)`
                  }}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};
