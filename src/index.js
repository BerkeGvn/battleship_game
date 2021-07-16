import './scss/main.scss';
import { hitEvent } from './modules/game';
import dragAndRotate from './modules/dragAndRotate';
import { startBtn, renderBtn } from './modules/domElements';
import render from './modules/render';

startBtn.addEventListener('click', () => {
  hitEvent();
  startBtn.classList.remove('fadein');
  startBtn.classList.add('fadeout');
  startBtn.classList.add('invisible');
  const aiMainDiv = document.querySelector('.ai-grid-container');
  aiMainDiv.classList.remove('none');
  setTimeout(() => {
    aiMainDiv.classList.remove('invisible');
    aiMainDiv.classList.add('fadein');
  }, 500);
});
renderBtn.addEventListener('click', render);
dragAndRotate.drag();
dragAndRotate.rotate();
