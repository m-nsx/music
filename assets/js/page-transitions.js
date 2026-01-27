(function(){
  const TRANSITION_MS = 360; // must match CSS

  function onReady(){
    // remove loading state and enable loaded state to play enter animation
    document.documentElement.classList.remove('is-loading');
    // force a reflow so transition runs reliably
    void document.documentElement.offsetWidth;
    document.documentElement.classList.add('is-loaded');
  }

  // Intercept internal link clicks and play exit animation
  function handleClick(e){
    // only handle primary-button clicks without modifier keys
    if(e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest('a');
    if(!a) return;
    const href = a.getAttribute('href');
    if(!href) return;
    // ignore external links, mailto:, tel:, anchors and links with target
    if(a.target && a.target !== '' || href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) return;
    if(href.startsWith('http') && new URL(href, location.href).origin !== location.origin) return;
    if(href.startsWith('#')) return;

    // same-page hash navigation allowed
    const targetUrl = new URL(href, location.href).href;
    if(targetUrl === location.href) return; // already on same URL

    e.preventDefault();
    // kickoff exit animation
    document.documentElement.classList.add('is-exiting');
    // small delay to allow the class to apply visually
    setTimeout(()=> { location.href = targetUrl; }, TRANSITION_MS + 30);
  }

  // Attach events
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }
  document.addEventListener('click', handleClick, true);

  // In case page is shown from bfcache (back/forward), ensure classes are reset
  window.addEventListener('pageshow', function(e){
    if(e.persisted){
      document.documentElement.classList.remove('is-exiting');
      document.documentElement.classList.remove('is-loading');
      document.documentElement.classList.add('is-loaded');
    }
  });
})();
