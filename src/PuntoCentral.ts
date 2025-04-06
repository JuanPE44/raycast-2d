import { Plano } from "./Plano";
import { Vector } from "./Vector";

export class PuntoCentral {
  x: number = 0;
  y: number = 0;
  plano: Plano;
  lineas: Vector[] = [];
  constructor(plano: Plano) {
    this.plano = plano;

    console.log({ plano: this.plano.origenX });
    this.lineas = [
      new Vector(
        -this.plano.origenX,
        0,
        this.plano.origenX,
        0,
        this.plano,
        "#0f0"
      ),
      new Vector(
        0,
        -this.plano.origenY,
        0,
        this.plano.origenY,
        this.plano,
        "#0f0"
      ),
    ];
  }

  estaIzquierda(x0: number) {
    return this.x < x0;
  }

  actualizarLineas() {
    console.log(this.lineas);
    this.lineas.forEach((linea) => {
      for (let pared of this.plano.paredes) {
        if (linea.estaIntersectando(pared)) {
          const punto = linea.obtenerInterseccion(pared);
          console.log(punto);
          console.log("esta izquierda: " + this.estaIzquierda(punto!.x));
          if (this.estaIzquierda(punto!.x)) {
            linea.cambiarCoordenadas(linea.x0, linea.y0, punto!.x, punto!.y);
          } else {
            linea.cambiarCoordenadas(punto!.x, punto!.y, linea.x1, linea.y1);
          }
          this.plano.dibujarPunto(punto!.x, punto!.y);
          break;
        } else {
          linea.cambiarCoordenadas(
            -this.plano.origenX,
            linea.y0,
            this.plano.origenX,
            linea.y1
          );
        }
      }
    });
  }

  cambiarCoordenadas(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
