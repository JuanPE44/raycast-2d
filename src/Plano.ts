import { Linea } from "./Linea";
import { PuntoCentral } from "./PuntoCentral";
import { Vector } from "./Vector";

export class Plano {
  private canvas;
  ctx;
  ancho: number;
  alto: number;
  origenX: number;
  origenY: number;
  escala = 20;
  private colorLinea = "#fff";
  paredes = [
    new Vector(-10, 11, 20, 20, this),
    new Vector(10, -11, 0, 0, this),
  ];
  private puntoCentral: PuntoCentral;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.ancho = canvas.width;
    this.alto = canvas.height;
    this.origenX = this.ancho / 2;
    this.origenY = this.alto / 2;
    this.puntoCentral = new PuntoCentral(this);

    const linea1 = new Linea({ x: 0, y: 0 }, { x: 1, y: 1 });
    const linea2 = new Linea({ x: 0, y: 0 }, { x: 1, y: 3 });
    linea1.dibujar(this);
    linea2.dibujar(this);

    canvas.addEventListener("mousemove", (e) => {
      this.limpiarPlano();
      const position = canvas.getBoundingClientRect();
      const x = (e.clientX - position.left) / 20 - this.origenX / 20;
      const y = ((e.clientY - position.top) / 20 - this.origenY / 20) * -1;
      linea1.mover(x, y);
      linea1.dibujar(this);
      linea2.mover(x, y);
      linea2.dibujar(this);
      //this.puntoCentral.cambiarCoordenadas(x, y);
      //this.dibujarPlano();
    });
  }

  dibujarPlano() {
    this.limpiarPlano();

    // actualiza lineas del punto
    this.puntoCentral.actualizarLineas();

    this.dibujarParedes();

    this.dibujarPunto(this.puntoCentral.x, this.puntoCentral.y);

    this.puntoCentral.lineas.forEach((linea) => {
      linea.cambiarCoordenadas(linea.x1, linea.y1, linea.x2, linea.y2);
      this.dibujarLinea(linea.x1, linea.y1, linea.x2, linea.y2, linea.color);
    });

    //this.dibujarEjes();
    //this.dibujarMarcas();
  }

  dibujarEjes() {
    this.ctx!.beginPath();
    this.ctx!.strokeStyle = this.colorLinea;
    this.ctx!.lineWidth = 2;

    // Eje X
    this.ctx!.moveTo(0, this.origenY);
    this.ctx!.lineTo(this.ancho, this.origenY);

    // Eje Y
    this.ctx!.moveTo(this.origenX, 0);
    this.ctx!.lineTo(this.origenX, this.alto);

    this.ctx!.stroke();
  }

  // Dibujar marcas en los ejes
  dibujarMarcas() {
    this.ctx!.fillStyle = "#000";
    this.ctx!.font = "10px Arial";

    for (let x = this.origenX; x < this.ancho; x += this.escala) {
      this.ctx!.beginPath();
      this.ctx!.moveTo(x, this.origenY - 5);
      this.ctx!.lineTo(x, this.origenY + 5);
      this.ctx!.stroke();
    }

    for (let x = this.origenX; x > 0; x -= this.escala) {
      this.ctx!.beginPath();
      this.ctx!.moveTo(x, this.origenY - 5);
      this.ctx!.lineTo(x, this.origenY + 5);
      this.ctx!.stroke();
    }

    for (let y = this.origenY; y < this.alto; y += this.escala) {
      this.ctx!.beginPath();
      this.ctx!.moveTo(this.origenX - 5, y);
      this.ctx!.lineTo(this.origenX + 5, y);
      this.ctx!.stroke();
    }

    for (let y = this.origenY; y > 0; y -= this.escala) {
      this.ctx!.beginPath();
      this.ctx!.moveTo(this.origenX - 5, y);
      this.ctx!.lineTo(this.origenX + 5, y);
      this.ctx!.stroke();
    }
  }

  // Dibujar punto en coordenadas matemáticas (x, y)
  dibujarPunto(x: number, y: number, color = "red") {
    const escala = 20; // pixeles por unidad

    const canvasX = this.origenX + x * escala;
    const canvasY = this.origenY - y * escala;

    this.ctx!.beginPath();
    this.ctx!.arc(canvasX, canvasY, 4, 0, Math.PI * 2);
    this.ctx!.fillStyle = color;
    this.ctx!.fill();
  }

  dibujarLinea(x1: number, y1: number, x2: number, y2: number, color = "red") {
    this.ctx!.beginPath();
    this.ctx!.moveTo(
      this.origenX + x1 * this.escala,
      this.origenY - y1 * this.escala
    );
    this.ctx!.lineTo(
      this.origenX + x2 * this.escala,
      this.origenY - y2 * this.escala
    );
    this.ctx!.strokeStyle = color;
    this.ctx!.stroke();
  }

  dibujarParedes() {
    this.paredes.forEach((pared) => {
      this.dibujarLinea(pared.x1, pared.y1, pared.x2, pared.y2, pared.color);
    });
  }

  limpiarPlano() {
    this.ctx!.clearRect(0, 0, this.ancho, this.alto);
  }

  getCanvas() {
    return this.canvas;
  }
}
