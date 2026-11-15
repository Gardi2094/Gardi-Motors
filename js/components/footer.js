import { SITE } from '../config.js';
import { brandMarkup } from './header.js';

export function mountFooter() {
  const socials = [
    ['Instagram', SITE.instagram],
    ['TikTok', SITE.tiktok],
  ].filter(([,url]) => /^https:\/\//i.test(url));
  const socialLinks = socials.map(([name,url]) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${name} ↗</a>`).join('');
  document.getElementById('site-footer').innerHTML = `
    <div class="container footer-layout">
      <div class="footer-about">${brandMarkup()}<p>Premium cars. Exceptional value. Explore a thoughtfully presented showcase and contact Gardi Motors for verified availability and pricing.</p></div>
      <div class="footer-column"><h3>Explore</h3><a href="#home">Home</a><a href="#inventory">Our Collection</a><a href="#about">Our Story</a><a href="#faq">FAQs</a></div>
      <div class="footer-column"><h3>Get in touch</h3><a href="#contact">Vehicle Enquiries</a><a href="#contact">Request a Quotation</a><a href="#contact">Based in Ghana</a>${socialLinks}</div>
    </div>
    <div class="container footer-bottom"><span>© <span id="copyright-year"></span> Gardi Motors. All rights reserved.</span><span>Elite Drive — Curated for your journey.</span></div>`;
  document.getElementById('copyright-year').textContent = String(new Date().getFullYear());
}
