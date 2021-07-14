import './scss/main.scss';
import { game } from './modules/game';
import dragAndRotate from './modules/dragAndRotate';
import { startBtn, renderBtn } from './modules/domElements';
import render from './modules/render';

startBtn.addEventListener('click', game);
renderBtn.addEventListener('click', render);
dragAndRotate.drag();
dragAndRotate.rotate();
