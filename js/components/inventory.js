import { vehicles } from '../data/vehicles.js';
import { escapeHtml, toast } from '../utils/dom.js';

const storageKey = 'gardi-elite-favorites';
let favorites;
try { favorites = new Set(JSON.parse(localStorage.getItem(storageKey) || '[]')); }
catch (_) { favorites = new Set(); }

export function getVehicle(id) { return vehicles.find(vehicle => vehicle.id === id); }

export function vehicleName(vehicle) {
  return `${vehicle.year ? vehicle.year + ' ' : ''}${vehicle.make} ${vehicle.model}`;
}

function getFilters() {
  return {
    search: document.getElementById('vehicle-search').value.trim().toLowerCase(),
    fuel: document.getElementById('fuel-filter').value,
    sort: document.getElementById('sort-filter').value,
    favoritesOnly: document.getElementById('favorites-filter').checked,
  };
}

function card(vehicle) {
  const loved = favorites.has(vehicle.id);
  return `<article class="vehicle-card" data-vehicle-id="${escapeHtml(vehicle.id)}">
    <div class="vehicle-photo">
      <img src="${escapeHtml(vehicle.image)}" alt="Concept placeholder illustration for ${escapeHtml(vehicleName(vehicle))}" loading="lazy" />
      <span class="vehicle-badge">${escapeHtml(vehicle.label)}</span>
      <button type="button" class="vehicle-fav" data-action="favorite" data-id="${escapeHtml(vehicle.id)}" aria-label="${loved ? 'Remove from' : 'Add to'} saved vehicles: ${escapeHtml(vehicleName(vehicle))}" aria-pressed="${loved}" title="Save vehicle">${loved ? '♥' : '♡'}</button>
    </div>
    <div class="vehicle-body">
      <p class="vehicle-year">${vehicle.year ? vehicle.year + ' MODEL' : 'MODEL ON REQUEST'}</p>
      <h3>${escapeHtml(vehicle.make)} ${escapeHtml(vehicle.model)}</h3>
      <p class="vehicle-trim">${escapeHtml(vehicle.trim)}</p>
      <div class="vehicle-specs"><span>${escapeHtml(vehicle.body)}</span><span>${escapeHtml(vehicle.fuel)}</span><span>${escapeHtml(vehicle.transmission)}</span></div>
      <div class="vehicle-bottom"><div class="vehicle-price"><small>Current quotation</small><strong>On request</strong></div><div class="card-actions">
        <button class="btn btn-outline btn-sm" type="button" data-action="details" data-id="${escapeHtml(vehicle.id)}">Details</button>
        <button class="btn btn-dark btn-sm" type="button" data-action="enquire" data-id="${escapeHtml(vehicle.id)}">Inspect ↗</button>
      </div></div>
    </div>
  </article>`;
}

export function renderVehicles() {
  const filters = getFilters();
  let result = vehicles.filter(vehicle => {
    const term = `${vehicleName(vehicle)} ${vehicle.trim} ${vehicle.fuel} ${vehicle.body}`.toLowerCase();
    return (!filters.search || term.includes(filters.search)) &&
      (!filters.fuel || vehicle.fuel === filters.fuel) &&
      (!filters.favoritesOnly || favorites.has(vehicle.id));
  });
  if (filters.sort === 'name') result.sort((a,b) => vehicleName(a).localeCompare(vehicleName(b)));
  else if (filters.sort === 'newest') result.sort((a,b) => (b.year || 0) - (a.year || 0));
  document.getElementById('vehicle-grid').innerHTML = result.length ? result.map(card).join('') : `
    <div class="empty-state"><h3>No vehicles match your filters.</h3><p>Try changing your search, fuel filter or saved vehicles option.</p><button id="reset-filters" class="btn btn-dark" type="button">Clear filters</button></div>`;
  document.getElementById('vehicle-count').textContent = `${result.length} vehicle${result.length === 1 ? '' : 's'} shown`;
}

export function mountInventory({ onDetails, onEnquire }) {
  const section = document.getElementById('inventory');
  section.innerHTML = `<div class="container">
    <div class="inventory-intro"><div><p class="eyebrow">THE GARDI COLLECTION</p><h2 id="inventory-heading" class="section-title">Find your next <em>drive.</em></h2><p class="section-lead">Explore our sample showcase of SUVs and premium vehicle options.</p></div>
      <p class="section-note">Illustrations are placeholders. Models, prices, specifications and availability are subject to direct confirmation.</p></div>
    <div class="filters" role="search" aria-label="Filter vehicles">
      <label class="filter-input"><span aria-hidden="true">⌕</span><span class="sr-only">Search by vehicle name</span><input type="search" id="vehicle-search" aria-label="Search vehicles" placeholder="Search make or model..." /></label>
      <label><span class="sr-only">Filter by fuel</span><select id="fuel-filter" aria-label="Fuel type"><option value="">All fuel types</option><option>Petrol</option><option>Hybrid</option><option>Plug-in hybrid</option><option>Other</option></select></label>
      <label><span class="sr-only">Sort vehicles</span><select id="sort-filter" aria-label="Sort vehicles"><option value="default">Featured order</option><option value="newest">Newest first</option><option value="name">Name A–Z</option></select></label>
      <label style="white-space:nowrap;font-size:12px;color:#777"><input type="checkbox" id="favorites-filter" /> Saved only</label>
      <span id="vehicle-count" class="count" aria-live="polite"></span>
    </div>
    <div id="vehicle-grid" class="vehicle-grid"></div>
  </div>`;
  ['vehicle-search','fuel-filter','sort-filter','favorites-filter'].forEach(id => document.getElementById(id).addEventListener(id === 'vehicle-search' ? 'input' : 'change', renderVehicles));
  section.addEventListener('click', event => {
    const reset = event.target.closest('#reset-filters');
    if (reset) {
      document.getElementById('vehicle-search').value = '';
      document.getElementById('fuel-filter').value = '';
      document.getElementById('sort-filter').value = 'default';
      document.getElementById('favorites-filter').checked = false;
      renderVehicles();
      return;
    }
    const trigger = event.target.closest('[data-action][data-id]');
    if (!trigger) return;
    const vehicle = getVehicle(trigger.dataset.id);
    if (!vehicle) return;
    if (trigger.dataset.action === 'details') onDetails(vehicle);
    if (trigger.dataset.action === 'enquire') onEnquire(vehicle);
    if (trigger.dataset.action === 'favorite') {
      if (favorites.has(vehicle.id)) favorites.delete(vehicle.id);
      else favorites.add(vehicle.id);
      try { localStorage.setItem(storageKey,JSON.stringify([...favorites])); } catch (_) { /* nonpersistent in private mode */ }
      renderVehicles();
      toast(favorites.has(vehicle.id) ? 'Vehicle added to saved list.' : 'Vehicle removed from saved list.');
    }
  });
  renderVehicles();
}
