function setThemeAttr(theme) { document.querySelector('body').setAttribute('data-theme', theme); }
function setIcon(theme) { document.querySelector(".theme-icon").innerHTML = theme === "dark"? "&#9789;" : "&#9788;"; }
function setLocalStorage(theme) { localStorage.setItem("theme", theme); }

function setTheme(theme) {
    setThemeAttr(theme)
    setIcon(theme);
    setLocalStorage(theme);
}

function changeTheme() {
    const body = document.querySelector('body');
    if (body.getAttribute('data-theme') === 'light') setTheme('dark');
    else setTheme('light');
}

export function setUpTheme() {
    document.querySelector(".switch").addEventListener("click", changeTheme);
    setTheme(localStorage.getItem("theme") || "light")
}