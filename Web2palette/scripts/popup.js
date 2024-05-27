// Initialize ColorThief
const colorThief = new ColorThief();

// Convert RGB color to hex
const rgb2hex = (rgb) => `#${rgb.match(/^rgb?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`;

// Get DOM elements
const img = document.getElementById('myImage');
const palettesContainer = document.getElementById('palettes');
const button = document.getElementById('capture');

// Event listener for button click
button.addEventListener('click', () => {
    button.style.display = 'none';
    chrome.tabs.captureVisibleTab({ format: 'png' }, (dataUrl) => {
        if (img) {
            img.src = dataUrl;
            img.style.display = 'none';
        }
        if (img.complete) {
            const colorPalette = colorThief.getPalette(img);
            showPalette(colorPalette);
        } else {
            img.addEventListener('load', function () {
                const colorPalette = colorThief.getPalette(img);
                showPalette(colorPalette);
            });
        }
    });
});

// Function to populate the color palette
function showPalette(colorPalette) {
    colorPalette.forEach((color) => {
        const div = document.createElement('div');
        div.classList.add('color-div');
        const rgb = `rgb(${color})`;
        div.style.backgroundColor = rgb;
        div.textContent = rgb2hex(rgb);

        // Copy color value on click
        div.addEventListener('click', () => {
            copyToClipboard(color);
        });

        palettesContainer.appendChild(div);
    });
}

// Function to copy color value to clipboard
function copyToClipboard(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
}
