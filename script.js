/* =============================================
 *  Mobile menu
 * ============================================= */
(function () {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('site-nav');
    if (!toggle || !nav) return;

    function setOpen(open) {
        nav.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    toggle.addEventListener('click', function () {
        setOpen(!nav.classList.contains('open'));
    });

    nav.addEventListener('click', function (e) {
        if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && nav.classList.contains('open')) {
            setOpen(false);
            toggle.focus();
        }
    });
})();

/* =============================================
 *  Pricing tabs
 * ============================================= */
(function () {
    var tablist = document.querySelector('.tabs');
    if (!tablist) return;
    var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));

    function select(tab, focus) {
        tabs.forEach(function (t) {
            var active = t === tab;
            t.setAttribute('aria-selected', String(active));
            t.tabIndex = active ? 0 : -1;
            document.getElementById(t.getAttribute('aria-controls')).hidden = !active;
        });
        if (focus) tab.focus();
    }

    tabs.forEach(function (tab, i) {
        tab.addEventListener('click', function () { select(tab, false); });
        tab.addEventListener('keydown', function (e) {
            var next = null;
            if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
            if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
            if (e.key === 'Home') next = tabs[0];
            if (e.key === 'End') next = tabs[tabs.length - 1];
            if (next) { e.preventDefault(); select(next, true); }
        });
    });
})();

/* =============================================
 *  Open a feature group when a link points at it
 * ============================================= */
(function () {
    function openFromHash() {
        if (!location.hash) return;
        var target = document.getElementById(location.hash.slice(1));
        if (target && target.tagName === 'DETAILS') {
            target.open = true;
            target.scrollIntoView();
        }
    }
    window.addEventListener('hashchange', openFromHash);
    openFromHash();
})();
