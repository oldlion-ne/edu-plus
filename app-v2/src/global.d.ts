declare module 'dotted-map' {
  export interface DottedMapOptions {
    height?: number;
    width?: number;
    grid?: 'diagonal' | 'vertical' | 'horizontal';
  }

  export interface Point {
    x: number;
    y: number;
  }

  export default class DottedMap {
    constructor(options: DottedMapOptions);
    getPoints(): Point[];
  }
}
