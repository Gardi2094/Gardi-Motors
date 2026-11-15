import { mountHeader } from './components/header.js';
import { mountHero } from './components/hero.js';
import { mountInventory } from './components/inventory.js';
import { showVehicleDetails } from './components/modal.js';
import { mountContact, selectVehicleForEnquiry } from './components/contact.js';
import { mountFooter } from './components/footer.js';

mountHeader();
mountHero();
mountContact();
mountInventory({
  onDetails: vehicle => showVehicleDetails(vehicle,selectVehicleForEnquiry),
  onEnquire: selectVehicleForEnquiry,
});
mountFooter();

const backToTop = document.getElementById('to-top');
window.addEventListener('scroll',() => backToTop.classList.toggle('visible',window.scrollY > 500),{passive:true});
backToTop.addEventListener('click',() => window.scrollTo({ top:0,behavior:'smooth' }));

// Remember incoming links to a specific section (e.g. #inventory) after render.
if (location.hash && document.getElementById(location.hash.slice(1))) {
  requestAnimationFrame(() => document.getElementById(location.hash.slice(1)).scrollIntoView());
}
