document.addEventListener("DOMContentLoaded", () => {
    const html = document.documentElement;
    const sun = document.getElementById("sun");
    const moon = document.getElementById("moon");
    const trash = document.getElementById("trash");

    // apply theme
    function apply(theme) {
        if (theme === "dark") {
            html.classList.remove("light");
            html.classList.add("dark");
            sun.style.display = "none";
            moon.style.display = "inline";
        } else {
            html.classList.remove("dark");
            html.classList.add("light");
            sun.style.display = "inline";
            moon.style.display = "none";
        }
    }

    // load theme from localstorage
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") {
        apply(saved);
    } else {
        // default to light
        apply("light");
    }

    // toggle themes
    function toggle() {
        if (html.classList.contains("light")) {
            apply("dark");
            localStorage.setItem("theme", "dark");
        } else {
            apply("light");
            localStorage.setItem("theme", "light");
        }
    }

    function clearStorage() {
        localStorage.clear();
        // reset to default
        html.classList.remove("dark");
        html.classList.add("light");
        sun.style.display = "inline";
        moon.style.display = "none";
        alert("LocalStorage has been cleared.")
    }

    // icon listeners
    sun.addEventListener("click", toggle);
    moon.addEventListener("click", toggle);
    trash.addEventListener("click", clearStorage);
});