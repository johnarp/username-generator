document.addEventListener("DOMContentLoaded", () => {
    const html = document.documentElement;
    // theme and clear storage icons
    const sun = document.getElementById("sun");
    const moon = document.getElementById("moon");
    const trash = document.getElementById("trash");
    // sound icons
    const sound_on = document.getElementById("sound_on");
    const sound_off = document.getElementById("sound_off");
    // sound buttons
    const genBtn = document.getElementById("generate-btn");
    const copyBtn = document.getElementById("copy-btn");
    const genSound = new Audio("./sounds/mixkit-cool-interface-click-tone-2568.wav");
    const copySound = new Audio("./sounds/mixkit-electronic-lock-success-beeps-2852.wav");
    genSound.volume = 0.1;
    copySound.volume = 0.05;
    genSound.preload = "auto";
    copySound.preload = "auto";

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

    // apply sound
    function applySound(state) {
        if (state === "off") {
            sound_on.style.display = "none";
            sound_off.style.display = "inline";
        } else {
            sound_on.style.display = "inline";
            sound_off.style.display = "none";
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

    // load sound state from localstorage
    const savedSound = localStorage.getItem("sound");
    if (savedSound === "off" || savedSound === "on") {
        applySound(savedSound);
    } else {
        // default to sound on
        applySound("on");
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

    // toggle sound
    function toggleSound() {
        if (sound_on.style.display !== "none") {
            applySound("off");
            localStorage.setItem("sound", "off");
        } else {
            applySound("on");
            localStorage.setItem("sound", "on");
        }
    }

    function clearStorage() {
        localStorage.clear();
        // reset to default
        html.classList.remove("dark");
        html.classList.add("light");
        sun.style.display = "inline";
        moon.style.display = "none";
        sound_on.style.display = "inline";
        sound_off.style.display = "none";
        alert("LocalStorage has been cleared.")
    }

    // icon listeners
    sun.addEventListener("click", toggle);
    moon.addEventListener("click", toggle);
    trash.addEventListener("click", clearStorage);
    sound_on.addEventListener("click", toggleSound);
    sound_off.addEventListener("click", toggleSound);

    // button sounds
    genBtn.addEventListener("click", () => {
        if (sound_off.style.display !== "none") return;
        genSound.currentTime = 0;
        genSound.play();
    });
    copyBtn.addEventListener("click", () => {
        if (sound_off.style.display !== "none") return;
        copySound.currentTime = 0;
        copySound.play();
    });

    // keyboard shortcuts
    document.addEventListener("keydown", (e) => {
        // ignore typing inside inputs or textarea
        if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
            return;
        }
        // generate = g
        if (e.key.toLowerCase() === "g") {
            genBtn.click();
        }
        // copy = c
        if (e.key.toLowerCase() === "c") {
            copyBtn.click();
        }
    });
});