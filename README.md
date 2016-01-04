# Google-Photos-desktop-viewer-app
Google Photos desktop viewer app for OS X and Winddows.

It uses Electron.

[You can download the app right now](https://github.com/oniatsu/Google-Photos-desktop-viewer-app/releases).

# Developments

## Requirements

- Node >= 4

### For Windows build on non-Windows platform

- Wine

Setting a custom icon requires it.
The reason is [here](https://github.com/maxogden/electron-packager#building-windows-apps-from-non-windows-platforms).

## Setup

```bash
npm i
```

## Usage

### Start

```bash
npm start # execute temporalilly
```

### Build

```bash
npm archive # create *.app and *.exe, and the installer, and the zip archive
```

### Commands

```bash
npm run # show help
```
