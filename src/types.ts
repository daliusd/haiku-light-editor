export interface Margins {
  vertical: number;
  horizontal: number;
}

export interface Settings {
  width: number;
  height: number;
  margins?: Margins;
  backgroundColor?: string;
}

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

export interface Props {
  settings: Settings;
  editable: Editable;
}

export type PanStartCallback = (x: number, y: number, touch: boolean) => void;

export type PanMoveCallback = (
  x: number,
  y: number,
  dx: number,
  dy: number,
  touch: boolean,
  ctrlKey: boolean,
  event: MouseEvent | TouchEvent
) => void;
