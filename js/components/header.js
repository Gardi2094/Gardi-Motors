export function brandMarkup() {
  return `<a class="brand" href="#home" aria-label="Gardi Motors, home"><span class="brand-symbol"><span>G</span></span><span class="brand-text"><strong>GARDI MOTORS</strong><small>ELITE DRIVE</small></span></a>`;
}

export function mountHeader() {
  document.getElementById('site-header').innerHTML = `
    <div class="container header-inner">${brandMarkup()}
      <nav id="nav-links" class="nav-links" aria-label="Main navigation">
        <a href="#home">Home</a><a href="#inventory">Our Collection</a><a href="#about">About Us</a><a href="#faq">FAQs</a><a href="#contact" class="btn btn-primary btn-sm">Contact Us <span aria-hidden="true">↗</span></a>
      </nav>
      <button class="mobile-toggle" type="button" aria-controls="nav-links" aria-expanded="false" aria-label="Toggle navigation">☰</button>
    </div>`;
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.getElementById('nav-links');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? '×' : '☰';
  });
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    }
  });
}
