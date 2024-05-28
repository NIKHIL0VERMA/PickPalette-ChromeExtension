# PickPalette-ChromeExtension
Main Project - https://github.com/ArnabChatterjee20k/PickPalette-PaletteFromImage

## How to use
- Clone the Project.
- Main working dir is Web2Palette.
- Open `manifest.json`
  - Change the homepage_url to point towards your site (You can remove this if you don't have)
  - `name` field is a string that identifies the extension in the Chrome Web Store.
  - `default_title` field is string that appears when user hover on chrome extension
- Logo customization (`imgs`)
  - replace the icons with new icons
  - for ex:- icon16.png should be replaced with 16X16 px icon
- Extend functionality
  - Create new js file in `scripts` folder and implement your feature.

## Testing
- Go to `chrome://extensions`
- Enable developer mode.
- Click `Load unpacked` and select Web2Palette folder.
- Changing will be reflect in extension. If not try refreshing of re-adding.

## Debugging
Right click on extension -> Inspect you will get the chrome dev tool.
Debugging is straight forward similar to debugging static html content.


## Generating CRX
To publish extension on chrome web store you need .crx file

Instruction to build crx
- Go to `chrome://extensions`
- Enable developer mode if not already.
- Click `pack extension` and select Web2Palette folder.
- Leave the private key


Note:- Extension will work (Theoretically) on any chromium based browser.
For further query refer to [Chrome API](https://developer.chrome.com/docs/extensions/reference/api)
