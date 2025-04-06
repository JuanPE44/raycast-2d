import { Plano } from "./Plano";

export class Vector {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  plano: Plano;
  color: string;

  constructor(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    plano: Plano,
    color: string = "#fff"
  ) {
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
    this.plano = plano;
    this.color = color;
  }

  cambiarCoordenadas(x0: number, y0: number, x1: number, y1: number) {
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
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

  estaIntersectando(vector: Vector) {
    const o1 = this.orientacion(
      -this.plano.origenX,

      this.y0,
      this.plano.origenX,

      this.y1,
      vector.x0,
      vector.y0
    );
    const o2 = this.orientacion(
      -this.plano.origenX,

      this.y0,
      this.plano.origenX,

      this.y1,
      vector.x1,
      vector.y1
    );
    const o3 = this.orientacion(
      -this.plano.origenX,

      vector.y0,
      this.plano.origenX,

      vector.y1,
      -this.plano.origenX,
      this.y0
    );
    const o4 = this.orientacion(
      -this.plano.origenX,

      vector.y0,
      this.plano.origenX,

      vector.y1,
      this.plano.origenX,
      this.y1
    );

    if (o1 * o2 < 0 && o3 * o4 < 0) return true;
    return false;
  }

  obtenerInterseccion(vector: Vector) {
    const x0 = -this.plano.origenX;
    const x1 = this.plano.origenX;
    const det =
      (x0 - x1) * (vector.y0 - vector.y1) -
      (this.y0 - this.y1) * (vector.x0 - vector.x1);

    if (det === 0) return null; // rectas paralelas o coincidentes

    const det1 = x0 * this.y1 - this.y0 * x1;
    const det2 = vector.x0 * vector.y1 - vector.y0 * vector.x1;

    const x = (det1 * (vector.x0 - vector.x1) - (x0 - x1) * det2) / det;
    const y =
      (det1 * (vector.y0 - vector.y1) - (this.y0 - this.y1) * det2) / det;

    return { x, y };
  }
}
