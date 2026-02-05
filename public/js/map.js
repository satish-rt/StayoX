// Global map initializer used by all pages
// Safe if Google Maps script is not loaded or if no #map element exists.
(function(){
  function buildMap() {
    const mapEl = document.getElementById('map');
    if (!mapEl || typeof window.google === 'undefined' || !google.maps) {
      return; // No map on this page or Maps not loaded
    }

    const defaultCenter = { lat: 20.5937, lng: 78.9629 }; // India

    // Read coordinates from data attributes if present
    const latAttr = parseFloat(mapEl.getAttribute('data-lat'));
    const lngAttr = parseFloat(mapEl.getAttribute('data-lng'));
    const hasCoords = !Number.isNaN(latAttr) && !Number.isNaN(lngAttr);
    const center = hasCoords ? { lat: latAttr, lng: lngAttr } : defaultCenter;

    const map = new google.maps.Map(mapEl, {
      center,
      zoom: hasCoords ? 13 : 5,
    });

    let marker;
    if (hasCoords) {
      marker = new google.maps.Marker({ position: center, map });
    }

    // If latitude/longitude inputs exist, allow click-to-set
    const latInput = document.querySelector('#latitude');
    const lngInput = document.querySelector('#longitude');
    if (latInput && lngInput) {
      map.addListener('click', (e) => {
        const pos = e.latLng;
        if (!marker) {
          marker = new google.maps.Marker({ position: pos, map });
        } else {
          marker.setPosition(pos);
        }
        latInput.value = pos.lat().toFixed(6);
        lngInput.value = pos.lng().toFixed(6);
      });
    }
  }

  // Expose globally for Google callback
  window.initMap = function(){
    try { buildMap(); } catch (e) { console.error('Map init error:', e); }
  };

  // Also try to initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      try { buildMap(); } catch (e) { console.error('Map init error:', e); }
    });
  } else {
    try { buildMap(); } catch (e) { console.error('Map init error:', e); }
  }
})();
