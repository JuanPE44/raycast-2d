import { Plano } from "./Plano";

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

  generarRecta(longitud = 1000) {
    this.x1 = this.punto.x - this.direccion.x * longitud;
    this.y1 = this.punto.y - this.direccion.y * longitud;
    this.x2 = this.punto.x + this.direccion.x * longitud;
    this.y2 = this.punto.y + this.direccion.y * longitud;
  }

  dibujar(plano: Plano) {
    plano.ctx!.beginPath();
    const canvasX1 = plano.origenX + this.x1 * plano.escala;
    const canvasY1 = plano.origenY - this.y1 * plano.escala;
    const canvasX2 = plano.origenX + this.x2 * plano.escala;
    const canvasY2 = plano.origenY - this.y2 * plano.escala;
    console.log(canvasX1, canvasY1, canvasX2, canvasY2, this.x1, this.y1);
    plano.ctx!.strokeStyle = "#fff";
    plano.ctx!.moveTo(canvasX1, canvasY1);
    plano.ctx!.lineTo(canvasX2, canvasY2);
    plano.ctx!.stroke();
  }
}
