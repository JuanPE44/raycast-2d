import { Plano } from "./Plano";
import "./style.css";

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

const canvas = document.createElement("canvas");
canvas.id = "canvas";
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const plano = new Plano(canvas);
document.querySelector<HTMLDivElement>("#app")?.appendChild(plano.getCanvas());
