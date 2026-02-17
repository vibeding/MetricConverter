// 1. Configuration Data
const CONVERSIONS = {
    length: {
        id: 'length',
        title: 'Length (Meter/Feet)',
        unitA: 'meters',
        unitB: 'feet',
        rate: 3.28084, // 1 meter = 3.28084 feet
        tooltip: '1 Meter = 3.281 Feet'
    },
    volume: {
        id: 'volume',
        title: 'Volume (Liters/Gallons)',
        unitA: 'liters',
        unitB: 'gallons',
        rate: 0.264172, // 1 liter = 0.264172 gallons
        tooltip: '1 Liter = 0.264 Gallons'
    },
    mass: {
        id: 'mass',
        title: 'Mass (Kilograms/Pounds)',
        unitA: 'kilos',
        unitB: 'pounds',
        rate: 2.20462, // 1 kg = 2.20462 lbs
        tooltip: '1 Kg = 2.204 Pounds'
    },
    temp: {
        id: 'temp',
        title: 'Temperature (°C/°F)',
        unitA: '°C',
        unitB: '°F',
        type: 'complex', // Requires formula, not simple multiplier
        tooltip: '0°C = 32°F'
    },
    speed: {
        id: 'speed',
        title: 'Speed (Kmph/Mph)',
        unitA: 'kmph',
        unitB: 'mph',
        rate: 0.621371,
        tooltip: '1 Kmph = 0.621 Mph'
    }
};

const DEFAULT_METRICS = ['length', 'volume', 'mass'];

// 2. DOM Elements
const inputEl = document.getElementById("input-el");
const convertBtn = document.getElementById("convert-btn");
const resultsContainer = document.getElementById("results-container");
const themeToggle = document.getElementById("theme-toggle");
const settingsToggle = document.getElementById("settings-toggle");
const settingsPanel = document.getElementById("settings-panel");
const metricsOptionsDiv = document.getElementById("metrics-options");
const saveSettingsBtn = document.getElementById("save-settings");
const settingsError = document.getElementById("settings-error");

// 3. State Management
let currentMetrics = [];
let isDarkMode = true; // Default to dark

// Initialize
init();

function init() {
    // Load Settings from LocalStorage
    const storedMetrics = JSON.parse(localStorage.getItem("myMetrics"));
    const storedTheme = localStorage.getItem("theme");

    // Set Metrics
    if (storedMetrics && storedMetrics.length === 3) {
        currentMetrics = storedMetrics;
    } else {
        currentMetrics = DEFAULT_METRICS;
    }

    // Set Theme
    if (storedTheme) {
        isDarkMode = storedTheme === 'dark';
    }
    applyTheme();

    // Render UI
    renderMetricCards(0); // Render empty cards initially
    renderSettingsOptions();

    // Add Listeners
    convertBtn.addEventListener("click", handleConvert);
    themeToggle.addEventListener("click", toggleTheme);
    settingsToggle.addEventListener("click", () => toggleSettings(true));
    saveSettingsBtn.addEventListener("click", saveSettings);
}

// 4. Core Logic
function handleConvert() {
    const value = parseFloat(inputEl.value);
    if (isNaN(value)) return;
    renderMetricCards(value);
}

function renderMetricCards(inputValue) {
    resultsContainer.innerHTML = "";

    currentMetrics.forEach(metricId => {
        const metric = CONVERSIONS[metricId];
        let str1 = "";
        let str2 = "";

        // Calculate
        if (metric.type === 'complex' && metric.id === 'temp') {
            // Special logic for Temperature
            const cToF = (inputValue * 9/5) + 32;
            const fToC = (inputValue - 32) * 5/9;
            str1 = `${inputValue} ${metric.unitA} = ${cToF.toFixed(3)} ${metric.unitB}`;
            str2 = `${inputValue} ${metric.unitB} = ${fToC.toFixed(3)} ${metric.unitA}`;
        } else {
            // Standard Multiplier logic
            const aToB = inputValue * metric.rate;
            const bToA = inputValue / metric.rate;
            str1 = `${inputValue} ${metric.unitA} = ${aToB.toFixed(3)} ${metric.unitB}`;
            str2 = `${inputValue} ${metric.unitB} = ${bToA.toFixed(3)} ${metric.unitA}`;
        }

        // HTML Template
        const cardHtml = `
            <div class="metric-card">
                <div class="card-header">
                    <span>${metric.title}</span>
                    <div class="info-icon" data-tooltip="${metric.tooltip}">i</div>
                </div>
                <div class="result-text">
                    ${str1} <br> ${str2}
                </div>
            </div>
        `;
        resultsContainer.innerHTML += cardHtml;
    });
}

// 5. Settings Logic
function renderSettingsOptions() {
    metricsOptionsDiv.innerHTML = "";
    Object.values(CONVERSIONS).forEach(metric => {
        const isChecked = currentMetrics.includes(metric.id) ? "checked" : "";
        metricsOptionsDiv.innerHTML += `
            <div class="option-row">
                <input type="checkbox" id="chk-${metric.id}" value="${metric.id}" ${isChecked}>
                <label for="chk-${metric.id}">${metric.title}</label>
            </div>
        `;
    });
}

function saveSettings() {
    const checkboxes = metricsOptionsDiv.querySelectorAll("input[type='checkbox']:checked");
    if (checkboxes.length !== 3) {
        settingsError.textContent = "Please select exactly 3 metrics.";
        return;
    }
    
    settingsError.textContent = "";
    currentMetrics = Array.from(checkboxes).map(chk => chk.value);
    
    localStorage.setItem("myMetrics", JSON.stringify(currentMetrics));
    
    // Re-render main view with new selections
    // If input has value, re-calculate, otherwise render 0
    const val = parseFloat(inputEl.value) || 0;
    renderMetricCards(val);
    
    toggleSettings(false);
}

function toggleSettings(show) {
    if (show) {
        renderSettingsOptions(); // Refresh state
        settingsPanel.classList.remove("hidden");
    } else {
        settingsPanel.classList.add("hidden");
    }
}

// 6. Theme Logic
function toggleTheme() {
    isDarkMode = !isDarkMode;
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    applyTheme();
}

function applyTheme() {
    document.body.setAttribute("data-theme", isDarkMode ? "dark" : "light");
    themeToggle.textContent = isDarkMode ? "☀️" : "🌙";
}