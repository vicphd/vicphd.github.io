const topics = [
  { name: "AI", icon: "🤖", link: "src/pages/ai.html" },
  { name: "Web", icon: "🌐", link: "src/pages/web.html" },
  { name: "Data", icon: "📊", link: "src/pages/data.html" },
  { name: "Security", icon: "🔒", link: "src/pages/security.html" },
  { name: "DevOps", icon: "⚙️", link: "src/pages/devops.html" },
  { name: "Cloud", icon: "☁️", link: "src/pages/cloud.html" },
  { name: "Embedded", icon: "🧩", link: "src/pages/embedded.html" },
  { name: "Graphics", icon: "🎨", link: "src/pages/graphics.html" },
];

export function createWheelMenu(container) {
  const spinner = document.createElement('div');
  spinner.className = 'spinner';

  const wheel = document.createElement('div');
  wheel.className = 'wheel';

  topics.forEach((topic, i) => {
    const angle = (i / topics.length) * 2 * Math.PI;
    const x = 150 * Math.cos(angle);
    const y = 150 * Math.sin(angle);

    const item = document.createElement('a');
    item.className = 'wheel-item';
    item.href = topic.link;
    item.title = topic.name;
    item.style.transform = `translate(${x}px, ${y}px)`;
    item.innerHTML = `<span>${topic.icon}</span>`;
    wheel.appendChild(item);
  });

  spinner.appendChild(wheel);
  container.appendChild(spinner);
}
