(function () {
  if (window.LowestPrice30DaysInitialized) return;
  window.LowestPrice30DaysInitialized = true;

  var priceMap = {};

  function buildPriceMap() {
    document.querySelectorAll('[data-lowest-price-30-days]').forEach(function (container) {
      var productId = container.getAttribute('data-lowest-price-30-days');
      if (priceMap[productId]) return;
      var dataEl = document.getElementById('lowest-price-data-' + productId);
      if (!dataEl) return;
      try {
        priceMap[productId] = JSON.parse(dataEl.textContent);
      } catch (e) {}
    });
  }

  function handleVariantChange(variantId) {
    Object.keys(priceMap).forEach(function (productId) {
      var price = priceMap[productId][variantId];
      if (price === undefined) return;
      var el = document.querySelector(
        '[data-lowest-price-30-days="' + productId + '"] [data-lowest-price-value]'
      );
      if (el) el.innerHTML = price;
    });
  }

  function init() {
    buildPriceMap();
    if (!Object.keys(priceMap).length) return;

    document.addEventListener('change', function (e) {
      if (e.target && e.target.name === 'id') {
        handleVariantChange(e.target.value);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
