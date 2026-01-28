/**
 * High Contrast Mode Toggle
 * Provides accessible high contrast mode with WCAG AAA compliance
 * Persists user preference across sessions using localStorage
 */
(function(){
    'use strict';
    
    const STORAGE_KEY = 'mnsx_high_contrast';
    const HC_CLASS = 'high-contrast';
    
    /**
     * Apply high contrast immediately on script load (before DOM ready)
     * This prevents flash of normal mode
     */
    (function applyImmediately() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved === '1') {
                document.documentElement.classList.add(HC_CLASS);
            }
        } catch (err) {
            // Silently fail if localStorage is not available
        }
    })();
    
    /**
     * Apply or remove high contrast mode
     * @param {boolean} enabled - Whether to enable high contrast mode
     */
    function applyHighContrast(enabled) {
        if (enabled) {
            document.documentElement.classList.add(HC_CLASS);
        } else {
            document.documentElement.classList.remove(HC_CLASS);
        }
        
        // Update toggle text across all instances
        updateToggleText(enabled);
    }
    
    /**
     * Update the text of all high contrast toggle links
     * @param {boolean} enabled - Current state of high contrast mode
     */
    function updateToggleText(enabled) {
        const toggles = document.querySelectorAll('.high-contrast-toggle');
        toggles.forEach(toggle => {
            toggle.textContent = enabled ? 'Normal Mode' : 'High Contrast Mode';
            toggle.setAttribute('aria-pressed', enabled ? 'true' : 'false');
        });
    }
    
    /**
     * Toggle high contrast mode
     */
    function toggleHighContrast(e) {
        if (e) e.preventDefault();
        
        const isCurrentlyEnabled = document.documentElement.classList.contains(HC_CLASS);
        const newState = !isCurrentlyEnabled;
        
        applyHighContrast(newState);
        
        // Save preference
        try {
            localStorage.setItem(STORAGE_KEY, newState ? '1' : '0');
        } catch (err) {
            console.warn('Could not save high contrast preference:', err);
        }
        
        // Broadcast change to other tabs/windows
        try {
            localStorage.setItem('mnsx_hc_sync', Date.now().toString());
        } catch (err) {
            // Ignore
        }
    }
    
    /**
     * Initialize high contrast mode on page load
     */
    function init() {
        // Check saved preference
        let enabled = false;
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            enabled = saved === '1';
        } catch (err) {
            console.warn('Could not read high contrast preference:', err);
        }
        
        // Check system preference as fallback only if no saved preference
        if (!enabled && !localStorage.getItem(STORAGE_KEY) && window.matchMedia) {
            const prefersHighContrast = window.matchMedia('(prefers-contrast: high), (prefers-contrast: more)');
            enabled = prefersHighContrast.matches;
        }
        
        // Ensure state is applied (should already be from immediate execution)
        applyHighContrast(enabled);
        
        // Attach event listeners to all toggle links
        const toggles = document.querySelectorAll('.high-contrast-toggle');
        toggles.forEach(toggle => {
            toggle.addEventListener('click', toggleHighContrast);
            // Ensure proper ARIA attributes
            toggle.setAttribute('role', 'button');
            toggle.setAttribute('aria-label', 'Toggle high contrast mode');
        });
        
        // Listen for changes from other tabs/windows
        window.addEventListener('storage', function(e) {
            if (e.key === STORAGE_KEY) {
                const enabled = e.newValue === '1';
                applyHighContrast(enabled);
            }
        });
        
        // Listen for system preference changes
        if (window.matchMedia) {
            const prefersHighContrast = window.matchMedia('(prefers-contrast: high), (prefers-contrast: more)');
            if (prefersHighContrast.addEventListener) {
                prefersHighContrast.addEventListener('change', (e) => {
                    // Only auto-switch if user hasn't set a manual preference
                    try {
                        const hasManualPreference = localStorage.getItem(STORAGE_KEY) !== null;
                        if (!hasManualPreference && e.matches) {
                            applyHighContrast(true);
                        }
                    } catch (err) {
                        // Ignore localStorage errors
                    }
                });
            }
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
