import { SITE } from '../config.js';
import { vehicles } from '../data/vehicles.js';
import { vehicleName } from './inventory.js';
import { copyText, escapeHtml, toast } from '../utils/dom.js';

function contactMarkup() {
  const method = SITE.whatsapp ? `WhatsApp: +${SITE.whatsapp}` : SITE.email ? SITE.email : 'Business contact details to be configured';
  return `<div class="container contact-layout">
    <div class="contact-copy"><p class="eyebrow">WE'RE HERE TO HELP</p><h2 class="section-title" id="contact-heading">Let's find your <em>perfect drive.</em></h2><p class="section-lead">Tell us which car you are interested in and your preferred features. We'll help you prepare a clear enquiry about the model and price.</p>
      <div class="contact-method"><span class="contact-icon" aria-hidden="true">✉</span><div><strong>Vehicle enquiries</strong><small>${escapeHtml(method)}</small></div></div>
      <div class="contact-method"><span class="contact-icon" aria-hidden="true">⌖</span><div><strong>Ghana</strong><small>Contact us to confirm a viewing location</small></div></div>
      <p class="section-note">No messages are stored on this demo website. Configure your business email or WhatsApp number in <code>js/config.js</code> before publishing.</p>
    </div>
    <form id="contact-form" class="contact-form"><h3>Request a vehicle inspection</h3><p>Complete the fields and open WhatsApp, email, or copy your enquiry text.</p>
      <div class="form-grid">
        <div class="form-field"><label for="contact-name">Your name *</label><input id="contact-name" name="name" required maxlength="100" autocomplete="name" placeholder="Full name" /></div>
        <div class="form-field"><label for="contact-phone">Phone number *</label><input id="contact-phone" name="phone" type="tel" required maxlength="40" autocomplete="tel" placeholder="Your contact number" /></div>
        <div class="form-field full"><label for="contact-model">Vehicle of interest</label><select id="contact-model" name="vehicle"><option value="">General enquiry / other model</option>${vehicles.map(vehicle => `<option value="${escapeHtml(vehicle.id)}">${escapeHtml(vehicleName(vehicle))}</option>`).join('')}</select></div>
        <div class="form-field"><label for="inspection-date">Preferred inspection date *</label><input id="inspection-date" name="inspectionDate" type="date" required /></div>
        <div class="form-field"><label for="inspection-time">Preferred inspection time *</label><input id="inspection-time" name="inspectionTime" type="time" required /></div>
        <div class="form-field full"><label for="contact-message">Your message *</label><textarea id="contact-message" name="message" required maxlength="2500" placeholder="Tell us about the model, preferred features and your questions..."></textarea></div>
      </div>
      <div class="form-actions"><button class="btn btn-dark" type="submit" id="send-enquiry">${SITE.whatsapp ? 'Open WhatsApp ↗' : SITE.email ? 'Prepare Email ↗' : 'Copy Enquiry →'}</button></div>
      <p class="form-help">${SITE.whatsapp || SITE.email ? 'Submitting opens your messaging app for review. You must press Send there to deliver the enquiry.' : 'No delivery destination is configured yet; your message will be copied for you to send manually.'}</p>
      <div class="sr-only" id="form-status" role="status" aria-live="polite"></div>
    </form>
  </div>`;
}

export function selectVehicleForEnquiry(vehicle) {
  const select = document.getElementById('contact-model');
  const message = document.getElementById('contact-message');
  select.value = vehicle.id;
  if (!message.value.trim()) message.value = `Hello Gardi Motors, I would like to inspect the ${vehicleName(vehicle)}. Please share its current availability, specifications and price.`;
  document.getElementById('contact').scrollIntoView({ behavior:'smooth', block:'start' });
  setTimeout(() => document.getElementById('contact-name').focus({ preventScroll:true }), 250);
}

export function mountContact() {
  document.getElementById('contact').innerHTML = contactMarkup();
  document.getElementById('contact-form').addEventListener('submit',async event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const selected = vehicles.find(v => v.id === data.get('vehicle'));
    const subject = `Gardi Motors vehicle inspection request${selected ? ' — ' + vehicleName(selected) : ''}`;
    const body = [
      `Hello Gardi Motors,`, '',
      `Name: ${String(data.get('name')).trim()}`,
      `Phone: ${String(data.get('phone')).trim()}`,
      `Vehicle: ${selected ? vehicleName(selected) : 'General enquiry'}`, '',
      String(data.get('message')).trim(), '',
      `Preferred inspection date: ${data.get('inspectionDate') || 'Not specified'}`,
      `Preferred inspection time: ${data.get('inspectionTime') || 'Not specified'}`,
      `Please contact me to confirm inspection availability and location.`,
    ].join('\n');
    const status = document.getElementById('form-status');
    if (SITE.whatsapp) {
      const number = SITE.whatsapp.replace(/\D/g,'');
      if (number) {
        const url = `https://wa.me/${number}?text=${encodeURIComponent(body)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
        status.textContent = 'WhatsApp opened; remember to send your message there.';
        toast(status.textContent);
        return;
      }
    }
    if (SITE.email) {
      const address = SITE.email.trim();
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) {
        window.location.href = `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        status.textContent = 'Your email application was opened; please send the message there.';
        toast(status.textContent);
        return;
      }
    }
    const copied = await copyText(`${subject}\n\n${body}`);
    if (copied) {
      status.textContent = 'Enquiry copied. Paste it into your preferred messaging app to send.';
      toast(status.textContent);
    } else {
      status.textContent = 'Automatic copying was blocked. Select and copy the generated text below.';
      toast(status.textContent);
      let output = document.getElementById('copy-fallback');
      if (!output) {
        output = document.createElement('textarea');
        output.id = 'copy-fallback';
        output.setAttribute('aria-label', 'Copyable enquiry text');
        output.readOnly = true;
        output.style.cssText = 'width:100%;height:150px;margin-top:16px;';
        form.appendChild(output);
      }
      output.value = `${subject}\n\n${body}`;
      output.focus(); output.select();
    }
  });
}
