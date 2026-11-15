import { escapeHtml } from '../utils/dom.js';
import { vehicleName } from './inventory.js';

let formerFocus = null;

export function closeModal() {
  document.getElementById('modal-root').innerHTML = '';
  document.body.classList.remove('modal-open');
  formerFocus?.focus?.();
  formerFocus = null;
}

export function showVehicleDetails(vehicle,onEnquire) {
  formerFocus = document.activeElement;
  const root = document.getElementById('modal-root');
  root.innerHTML = `<div class="modal-scrim" data-scrim="true">
    <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-vehicle-title">
      <button class="modal-close" type="button" aria-label="Close vehicle details">×</button>
      <div class="modal-layout">
        <img class="modal-image" src="${escapeHtml(vehicle.image)}" alt="Placeholder concept image for ${escapeHtml(vehicleName(vehicle))}" />
        <div class="modal-info">
          <p class="eyebrow">GARDI MOTORS SHOWCASE</p>
          <h2 id="modal-vehicle-title">${escapeHtml(vehicleName(vehicle))}</h2>
          <p>${escapeHtml(vehicle.description)}</p>
          <div class="modal-specs">
            <span>Body style <strong>${escapeHtml(vehicle.body)}</strong></span>
            <span>Fuel <strong>${escapeHtml(vehicle.fuel)}</strong></span>
            <span>Transmission <strong>${escapeHtml(vehicle.transmission)}</strong></span>
            <span>Quotation <strong>On request</strong></span>
          </div>
          <button class="btn btn-primary" type="button" data-modal-enquire="true">Request a car inspection ↗</button>
          <p class="modal-disclaimer">This is a demonstration listing. The image is a placeholder; confirm actual features, model, stock and prices before buying.</p>
        </div>
      </div>
    </div>
  </div>`;
  document.body.classList.add('modal-open');
  const dismiss = () => closeModal();
  root.querySelector('.modal-close').addEventListener('click', dismiss);
  root.querySelector('.modal-scrim').addEventListener('click', event => {
    if (event.target.dataset.scrim === 'true') dismiss();
  });
  root.querySelector('[data-modal-enquire]').addEventListener('click', () => {
    closeModal();
    onEnquire(vehicle);
  });
  root.querySelector('.modal-close').focus();
}

document.addEventListener('keydown', event => {
  const root = document.getElementById('modal-root');
  if (!root?.firstChild) return;
  if (event.key === 'Escape') { closeModal(); return; }
  if (event.key === 'Tab') {
    const focusables = [...root.querySelectorAll('button,[href],[tabindex]:not([tabindex="-1"])')].filter(x => !x.disabled);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length-1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
