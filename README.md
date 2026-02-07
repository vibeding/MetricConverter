# Metric and Imperial Unit Converter

## Description

This Google Chrome extension provides a quick and user friendly interface for converting numbers between Metric and Imperial units. It is designed to be lightweight, customizable, and accesible with built in Dark Mode supprt. The application calculates conversions instantly and formats the output to three decimal places for precision.

## Features

1. **Bi directional Conversion** Instantly converts values between Metric and Imperial units for selected categories.

2. **Default Metrics** The application displays three core metrics be default:

- length (Meters and Feet)
- Volume (Liters and Gallons)
- Mass (Kilograms and Pounds)

3. **Customizable Dashboard** Users can access a settings panel to select exactly three metrics to display from an expanded list, including Temperature (Celsius and Fahrenheit) and Speed (Kmph and Mph)

4. **Persistent Settings** User preference for selected metrics and visual theme are saved using Local Storage, ensuring the extension remembers the state between sessions.

5. **Dark Mode Support** The extension defaults to a dark theme for visual comfort, with a toggle available to switch to a light mode.

6. **Tooltip Information** An informationicon is located on every metric card. Hovering over this icon displays the specific conversion rate or formula used.

\*\* File Structure

- **manifest.json** Configuration file required by Chrome to define permissions, version, and entry points.

- **popup.html** Defines the structure of the user interface, including the input area, result cards, and settings modal.

- **popup.css** Contains all styling, CSS variables for theming, and layout definitions.

- **popup.js** Handles the application logic, mathematical calculations, DOM manipulation, and local storage management.

\*\* Installation Instructions

1. Download the source code to a folder on your computer.

2. Open the Google Chrome browser.

3. Navigate to the Extensions management page by typing chrome://extensions in the URL bar.

4. Enable Developer mode using the toggle switch located in the top right corner of the page.

5. Click the Load unpacked button that appears in the top left menu.

6. Select the folder containing the source files (manifest.json, popup.html, etc.).

7. The extension is now installed and will appear in your browser toolbar.

\*\* Usage Guide

1. **Converting Numbers** Click the extension icon, enter a number in the input field, and click the Convert button. The results will populate in the list view below.

2. **Changing the Theme** Click the moon or sun icon in the top right header to toggle between Dark Mode and Light Mode.

3. **Customizing Metrics** Click the gear icon to open the settings panel. Select exactly three metrics from the available list and click Save to update your view.

\*\* Browser Support
This extension is designed for Google Chrome and Chromium based browsers (such as Edge or Brave) that support Manifest V3.
