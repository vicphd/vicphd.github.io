
export const renderHero = (data) => `
  <section id="hero" class="hero-section">
    <div class="hero-content">
      <h4 class="hero-greeting">Bonjour, je suis</h4>
      <h1 class="hero-name">${data.name}</h1>
      <h2 class="hero-title">${data.title}</h2>
      <p class="hero-subtitle">${data.subtitle}</p>
      <a href="#blog" class="btn btn-primary">${data.cta}</a>
    </div>
  </section>
`;

export const renderAbout = (data) => `
  <section id="about" class="section">
    <h2 class="section-title"><span>01.</span> ${data.title}</h2>
    <div class="about-content">
      <div class="about-text">
        ${data.description.split('\n\n').map(p => `<p>${p}</p>`).join('')}
      </div>
    </div>
  </section>
`;

export const renderExperience = (data) => `
  <section id="experience" class="section">
    <h2 class="section-title"><span>02.</span> Expérience</h2>
    <div class="timeline">
      ${data.map(item => `
        <div class="timeline-item">
          <div class="timeline-header" style="display: flex; align-items: center;">
            ${item.logo ? `<img src="${item.logo}" alt="${item.company} logo" class="timeline-logo" style="height: 50px; margin-right: 15px; border-radius: 4px;">` : ''}
            <div>
                <h3 class="role">${item.role}</h3>
                <span class="company">@ ${item.company}</span>
            </div>
          </div>
          <span class="period">${item.period}</span>
          <div class="description">
            ${item.description.split('\n\n').map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  </section>
`;

export const renderEducation = (data) => `
  <section id="education" class="section">
    <h2 class="section-title"><span>03.</span> Formation</h2>
    <div class="timeline">
      ${data.map(item => `
        <div class="timeline-item">
          <div class="timeline-header" style="display: flex; align-items: center;">
             ${item.logo ? `<img src="${item.logo}" alt="${item.school} logo" class="timeline-logo" style="height: 50px; margin-right: 15px; border-radius: 4px;">` : ''}
             <div>
                <h3 class="role">${item.degree}</h3>
                <span class="company">@ ${item.school}</span>
             </div>
          </div>
          <span class="period">${item.period}</span>
          <p class="description">${item.description}</p>
        </div>
      `).join('')}
    </div>
  </section>
`;

export const renderSkills = (data) => `
  <section id="skills" class="section">
    <h2 class="section-title"><span>04.</span> Compétences</h2>
    <ul class="project-tags" style="justify-content: flex-start; margin-top: 2rem;">
      ${data.map(skill => `<li>${skill.name}</li>`).join('')}
    </ul>
  </section>
`;

// New Blog Views
// New Blog Views
export const renderBlogIndex = (posts) => `
  <section id="blog-index" class="section">
    <h2 class="section-title">Blog</h2>
    <div class="blog-list">
      ${posts.map(post => `
        <div class="blog-item">
            <span class="blog-date">${post.date}</span>
            <h3 class="blog-title"><a href="#blog/${post.id}">${post.title}</a></h3>
            <p class="blog-desc">${post.description}</p>
        </div>
      `).join('')}
    </div>
  </section>
`;

export const renderBlogPost = (postContent) => `
    <section class="section blog-post-content">
        <div class="markdown-body">
            ${postContent}
        </div>
        <div style="margin-top: 4rem; text-align: center;">
             <a href="#blog" class="btn">Retour au blog</a>
        </div>
    </section>
`;

export const renderContact = (data) => `
  <section id="contact" class="section text-center">
    <h2 class="section-title"><span>05.</span> Contact</h2>
    <p class="contact-text">
      Que vous ayez une question ou juste envie de dire bonjour, n'hésitez pas !
    </p>
    <div class="contact-info" style="margin-bottom: 2rem; color: var(--slate);">
        <p>${data.location}</p>
    </div>
    <a href="mailto:${data.email}" class="btn btn-primary">Me contacter</a>
  </section>
  
  <footer class="footer">
    <p>V. Mamet, 2025</p>
  </footer>
`;
