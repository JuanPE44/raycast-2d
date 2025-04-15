import { Plano } from "./Plano";
import { Vector } from "./Vector";

export class Linea {
  punto: { x: number; y: number };
  direccion: { x: number; y: number };
  x1: number = 0;
  y1: number = 0;
  x2: number = 0;
  y2: number = 0;
  constructor(
    punto: { x: number; y: number },
    direccion: { x: number; y: number }
  ) {
    this.punto = punto;
    this.direccion = direccion;
    this.generarRecta();
  }

  mover(x: number, y: number) {
    this.punto.x = x;
    this.punto.y = y;
    this.generarRecta();
  }

  generarRecta(longitud = 100) {
    this.x1 = this.punto.x;
    this.y1 = this.punto.y;
    this.x2 = this.punto.x + this.direccion.x * longitud;
    this.y2 = this.punto.y + this.direccion.y * longitud;
  }

  cambiarCoodernadas(x1: number, y1: number, x2: number, y2: number) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  dibujar(plano: Plano) {
    plano.ctx!.beginPath();
    const canvasX1 = plano.origenX + this.x1;
    const canvasY1 = plano.origenY - this.y1;
    const canvasX2 = plano.origenX + this.x2 * plano.escala;
    const canvasY2 = plano.origenY - this.y2 * plano.escala;
    console.log(canvasX1, canvasY1, canvasX2, canvasY2, this.x1, this.y1);
    plano.ctx!.strokeStyle = "#fff";
    plano.ctx!.moveTo(canvasX1, canvasY1);
    plano.ctx!.lineTo(canvasX2, canvasY2);
    plano.ctx!.stroke();
  }

  obtenerInterseccion(vector: Vector) {
    const det =
      (this.x1 - this.x2) * (vector.y1 - vector.y2) -
      (this.y1 - this.y2) * (vector.x1 - vector.x2);

    if (det === 0) return null; // paralelas o coincidentes

    const det1 = this.x1 * this.y2 - this.y1 * this.x2;
    const det2 = vector.x1 * vector.y2 - vector.y1 * vector.x2;

    const x =
      (det1 * (vector.x1 - vector.x2) - (this.x1 - this.x2) * det2) / det;
    const y =
      (det1 * (vector.y1 - vector.y2) - (this.y1 - this.y2) * det2) / det;

    // Nuevo: chequeo que esté "hacia adelante" en la dirección del rayo
    const dx = x - this.x1;
    const dy = y - this.y1;
    const dot = dx * this.direccion.x + dy * this.direccion.y;

    if (dot < 0) return null; // la intersección está "atrás" del rayo

    return { x, y };
  }

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
}
