import { Plano } from "./Plano";

export class Vector {
  x: number = 0;
  y: number = 0;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  plano: Plano;
  color: string;

  constructor(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    plano: Plano,
    color: string = "#fff"
  ) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.plano = plano;
    this.color = color;
  }

  mover(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  cambiarCoordenadas(x1: number, y1: number, x2: number, y2: number) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  /*

  estaIntersectando(vector: Vector) {
    const o1 = this.orientacion(
      this.x1,
      this.y1,
      this.x2,
      this.y2,
      vector.x1,
      vector.y1
    );
    const o2 = this.orientacion(
      this.x1,
      this.y1,
      this.x2,
      this.y2,
      vector.x2,
      vector.y2
    );
    const o3 = this.orientacion(
      this.x1,
      vector.y1,
      this.x2,
      vector.y2,
      this.x1,
      this.y1
    );
    const o4 = this.orientacion(
      this.x1,
      vector.y1,
      this.x2,
      vector.y2,
      this.x2,
      this.y2
    );

    if (o1 * o2 < 0 && o3 * o4 < 0) return true;
    return false;
  }
 orientacion(
    Px: number,
    Py: number,
    Qx: number,
    Qy: number,
    Rx: number,
    Ry: number
  ) {
    return (Qx - Px) * (Ry - Py) - (Qy - Py) * (Rx - Px);
  }
*/

  obtenerInterseccion(vector: Vector) {
    const det =
      (this.x1 - this.x2) * (vector.y1 - vector.y2) -
      (this.y1 - this.y2) * (vector.x1 - vector.x2);

    if (det === 0) return null; // rectas paralelas o coincidentes

    const det1 = this.x1 * this.y2 - this.y1 * this.x2;
    const det2 = vector.x1 * vector.y2 - vector.y1 * vector.x2;

    const x =
      (det1 * (vector.x1 - vector.x2) - (this.x1 - this.x2) * det2) / det;
    const y =
      (det1 * (vector.y1 - vector.y2) - (this.y1 - this.y2) * det2) / det;

    return { x, y };
  }
}
