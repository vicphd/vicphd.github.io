import './css/style.css'
import { content } from './modules/content.js'
import { renderHero, renderAbout, renderExperience, renderEducation, renderSkills, renderBlogIndex, renderBlogPost, renderContact } from './modules/sections.js'
import { marked } from 'marked';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import DOMPurify from 'dompurify';

const app = document.querySelector('#app')

// Theme Initialization
const initTheme = () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
};
initTheme();

const getThemeIcon = () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  // Simple SVG icons
  const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  return isDark ? sunIcon : moonIcon;
};

const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);

  // Update icon manually if button exists
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.innerHTML = getThemeIcon();
};

// Configure Marked to use Katex for math
// Theme handling logic ended above.



const renderMain = () => {
  app.innerHTML = `
    <nav class="navbar">
      <div class="logo"><a href="#" style="color:var(--accent-color)">VM</a></div>
      <div class="nav-links">
        <button id="theme-toggle" class="nav-btn" style="background:none; border:none; font-size:1.2rem; cursor:pointer; margin-right:1rem;">${getThemeIcon()}</button>
        <a href="#blog" class="nav-btn">Blog</a>
      </div>
    </nav>
    <main>
      ${renderHero(content.hero)}
      ${renderAbout(content.about)}
      ${renderExperience(content.experience)}
      ${renderEducation(content.education)}
      ${renderSkills(content.skills)}
      ${renderContact(content.contact)}
    </main>
  `;
  attachObserver();
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
}

const renderBlog = () => {
  app.innerHTML = `
    <nav class="navbar">
      <div class="logo"><a href="#" style="color:var(--accent-color)">VM</a></div>
      <div class="nav-links">
        <button id="theme-toggle" class="nav-btn" style="background:none; border:none; font-size:1.2rem; cursor:pointer; margin-right:1rem;">${getThemeIcon()}</button>
        <a href="#" class="nav-btn">Home</a>
      </div>
    </nav>
    <main style="padding-top: 100px;">
        ${renderBlogIndex(content.blogPosts)}
    </main>
    `;
  attachObserver();
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
}

const renderPost = (postId) => {
  const post = content.blogPosts.find(p => p.id === postId);
  if (!post) {
    app.innerHTML = '<h1>Article non trouvé</h1><a href="#blog">Retour</a>';
    return;
  }

  // Process content (simple fake math support: replace $$...$$ with KaTeX)
  // Actually, let's use a regex replacer for $$...$$ before passing to marked.
  let md = post.content;
  md = md.replace(/\$\$([\s\S]*?)\$\$/g, (_, tex) => katex.renderToString(tex, { displayMode: true, throwOnError: false }));

  // simple inline $...$ support (risky but requested)
  // Avoid replacing inside code blocks? Too complex for regex.
  // Just simple replace.
  md = md.replace(/\$([^\$\n]+?)\$/g, (_, tex) => katex.renderToString(tex, { displayMode: false, throwOnError: false }));

  const htmlContent = DOMPurify.sanitize(marked.parse(md));

  app.innerHTML = `
    <nav class="navbar">
      <div class="logo"><a href="#" style="color:var(--accent-color)">VM</a></div>
      <div class="nav-links">
        <button id="theme-toggle" class="nav-btn" style="background:none; border:none; font-size:1.2rem; cursor:pointer; margin-right:1rem;">${getThemeIcon()}</button>
        <a href="#blog">Retour</a>
        <a href="#" class="nav-btn">Home</a>
      </div>
    </nav>
    <main style="padding-top: 100px;">
        ${renderBlogPost(htmlContent)}
    </main>
    `;
  // Re-attach listeners for this view
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
}

const attachObserver = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show')
      }
    })
  })

  const hiddenElements = document.querySelectorAll('.section, .timeline-item, .project-card, .project-tags li, .blog-item')
  hiddenElements.forEach((el) => {
    el.classList.add('hidden')
    observer.observe(el)
  })
}

const router = () => {
  const hash = window.location.hash;

  if (hash === '#blog') {
    renderBlog();
  } else if (hash.startsWith('#blog/')) {
    const postId = hash.split('/')[1];
    renderPost(postId);
  } else {
    // Default / Main Section
    renderMain();
    // If hash is a section anchor (e.g. #contact), browser handles scroll automatically
    // IF the element exists. Since we just re-rendered, it might be tricky.
    // But re-rendering same view is fine.
  }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
