(function(){
    'use strict';

    const storageKey = 'mnsx_cookie_notice_dismissed';
    const isFrench = document.documentElement.lang.toLowerCase().startsWith('fr');

    try {
        if (sessionStorage.getItem(storageKey) === '1') return;
    } catch (error) {}

    const banner = document.createElement('aside');
    banner.className = 'cookie-notice';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', isFrench ? 'Information sur les cookies' : 'Cookie information');

    const message = document.createElement('p');
    message.textContent = isFrench
        ? 'Ce site n’utilise aucun cookie. Il utilise le stockage local de votre navigateur pour mémoriser le contraste élevé et l’affichage de l’introduction.'
        : 'This site does not use cookies. It uses your browser’s local storage to remember high-contrast settings and whether the landing page has been shown.';

    const policyLink = document.createElement('a');
    policyLink.href = 'privacy.html';
    policyLink.textContent = isFrench ? 'Politique de confidentialité' : 'Privacy Policy';

    const dismissButton = document.createElement('button');
    dismissButton.className = 'cookie-notice-dismiss';
    dismissButton.type = 'button';
    dismissButton.textContent = isFrench ? 'Fermer' : 'Dismiss';
    dismissButton.setAttribute('aria-label', isFrench ? 'Fermer cette information' : 'Dismiss this notice');
    dismissButton.addEventListener('click', function(){
        if (banner.classList.contains('is-dismissing')) return;
        banner.classList.add('is-dismissing');
        banner.setAttribute('aria-hidden', 'true');
        dismissButton.disabled = true;
        try {
            sessionStorage.setItem(storageKey, '1');
        } catch (error) {}
        window.setTimeout(function(){ banner.remove(); }, 350);
    });

    banner.append(message, policyLink, dismissButton);
    document.body.append(banner);
})();