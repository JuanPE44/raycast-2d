import { Linea } from "./Linea";
import { Plano } from "./Plano";

export class PuntoOrigen {
  x: number = 0;
  y: number = 0;
  plano: Plano;
  lineas: Linea[] = [];
  constructor(plano: Plano) {
    this.plano = plano;

    this.generarLineas();
  }

  generarLineas() {
    const rMax = Math.min(this.plano.ancho, this.plano.alto) / 2;

    for (let angulo = 0; angulo < 360; angulo += 10) {
      const rad = angulo * (Math.PI / 180);
      const dx = Math.cos(rad) * rMax;
      const dy = Math.sin(rad) * rMax;

      this.lineas.push(new Linea({ x: 0, y: 0 }, { x: dx, y: dy }));
    }
  }

  estaIzquierda(x1: number) {
    return this.x < x1;
  }

  estaDerecha(x1: number) {
    return this.x > x1;
  }

  estaArriba(y1: number) {
    return this.y > y1;
  }

  estaAbajo(y1: number) {
    return this.y < y1;
  }

  dibujarLineas() {
    this.lineas.forEach((linea) => {
      this.plano.dibujarLinea(linea.x1, linea.y1, linea.x2, linea.y2);
    });
  }

  comprobarColisionLineas() {
    this.lineas.forEach((linea) => {
      let interseccionMasCercana: { x: number; y: number } | null = null;
      let distanciaMinima = Infinity;

      this.plano.paredes.forEach((pared) => {
        if (linea.estaIntersectando(pared)) {
          const interseccion = linea.obtenerInterseccion(pared);
          if (interseccion) {
            const dx = interseccion.x - linea.x1;
            const dy = interseccion.y - linea.y1;
            const distancia = Math.sqrt(dx * dx + dy * dy);

            if (distancia < distanciaMinima) {
              distanciaMinima = distancia;
              interseccionMasCercana = interseccion;
            }
          }
        }
      });

      if (interseccionMasCercana) {
        linea.cambiarCoodernadas(
          linea.x1,
          linea.y1,
          interseccionMasCercana.x,
          interseccionMasCercana.y
        );
      }
    });
  }

  cambiarCoordenadas(x: number, y: number) {
    this.x = x;
    this.y = y;

    this.lineas.forEach((linea) => {
      linea.mover(x, y);
    });
  }
}
