export function mountHero() {
  document.getElementById('home').innerHTML = `
    <div class="container hero-layout">
      <div class="hero-copy">
        <p class="eyebrow">WELCOME TO GARDI MOTORS</p>
        <h1 id="hero-heading">Elevate<br />every <em>journey.</em></h1>
        <p class="hero-description">Premium SUVs, thoughtful details and a drive that feels exceptional. Discover vehicle options selected for people who expect more.</p>
        <div class="hero-buttons">
          <a class="btn btn-primary" href="#inventory">Explore Collection <span aria-hidden="true">→</span></a>
          <a class="btn btn-ghost" href="#about">Our Story <span aria-hidden="true">↗</span></a>
        </div>
        <div class="hero-stat-row">
          <div class="hero-stat"><strong>Premium</strong><small>Vehicle selection</small></div>
          <div class="hero-stat"><strong>Ghana</strong><small>Our home market</small></div>
          <div class="hero-stat"><strong>Personal</strong><small>Buying support</small></div>
        </div>
      </div>
      <div class="hero-visual"><img src="./assets/images/hero-suv.svg" alt="Concept illustration of a premium SUV in a night showroom" />
        <div class="hero-visual-label"><strong>THE ELITE DRIVE</strong><small>DESIGNED FOR YOUR NEXT MOVE</small></div>
      </div>
    </div>`;
}
