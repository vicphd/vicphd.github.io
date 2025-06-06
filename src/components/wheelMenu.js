const topics = [
  { name: "AI", icon: "🤖", link: "src/pages/ai.html" },
  { name: "Web", icon: "🌐", link: "src/pages/web.html" },
  { name: "Data", icon: "📈", link: "src/pages/data.html" },
  { name: "Security", icon: "🔒", link: "src/pages/security.html" },
  { name: "DevOps", icon: "⚙️", link: "src/pages/devops.html" },
  { name: "Cloud", icon: "☁️", link: "src/pages/cloud.html" },
  { name: "Embedded", icon: "🧩", link: "src/pages/embedded.html" },
  { name: "Graphics", icon: "🎨", link: "src/pages/graphics.html" },
];

export function createWheelMenu(container) {
  const spinner = document.createElement('div');
  spinner.className = 'spinner';

  const iconRefs = []; // Track icon spans

  topics.forEach((topic, i) => {
    const angle = (i / topics.length) * 2 * Math.PI;
    const radius = 150;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    const item = document.createElement('a');
    item.className = 'wheel-item';
    item.href = topic.link;
    item.title = topic.name;
    item.style.left = `calc(50% + ${x}px)`;
    item.style.top = `calc(50% + ${y}px)`;
    item.style.transform = 'translate(-50%, -50%)';

    const icon = document.createElement('span');
    icon.className = 'icon';
    icon.innerText = topic.icon;
    iconRefs.push({ icon, angle });

    item.appendChild(icon);
    spinner.appendChild(item);
  });

  // Continuously update icon rotation
  function updateIconRotations() {
    const rotation = getComputedStyle(spinner).transform;
    if (rotation !== 'none') {
      const matrix = new DOMMatrix(rotation);
      const currentAngle = Math.atan2(matrix.b, matrix.a) * (180 / Math.PI);

      iconRefs.forEach(({ icon, angle }) => {
        const iconAngle = 0;
        icon.style.transform = `rotate(${-currentAngle - iconAngle}deg)`;
      });
    }
    requestAnimationFrame(updateIconRotations);
  }
  requestAnimationFrame(updateIconRotations);
  container.appendChild(spinner);
}
