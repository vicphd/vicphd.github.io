import { createWheelMenu } from './components/wheelMenu.js';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('wheel-menu');
  createWheelMenu(container);
});

document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.sidebar a');
  const sections = document.querySelectorAll('.section');

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = link.getAttribute('data-section');

      sections.forEach(sec => {
        sec.classList.remove('active');
      });

      document.getElementById(target).classList.add('active');
    });
  });
});
