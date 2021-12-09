# Cross-Platform Mobile Application

Advanced Software Engineering, Group 1.  

- Callum Crawford
- Jack Lloyd
- Jacob Evans
- Robert Vava
- Will Kearney
- Yunusa Jibrin

## Table of Contents

- [1: Introduction](#1-introduction)
- [2: Installation Instructions](#2-installation-instructions)
  * [2.1: macOS](#21-macos)
  * [2.2: Windows](#22-windows)
- [3: Build and Run](#3-build-and-run)
  * [3.1: Using a Physical Device](#31-using-a-physical-device)
  * [3.2: Using a Simulator](#32-using-a-simulator)

## 1: Introduction

This app displays Price Paid Data for residential property sales going back to 1 January 1995 in the UK. The user can select the local area to display housing data in the form of a heatmap. A toggle allows for the user to view and select pins for nearby postcodes in order to view more granular data on housing sales.

The app frontend was built with [Expo](https://expo.dev/), a set of tools built on top of [React Native](https://reactnative.dev/), which is a framework on a Javascript codebase. The backend is written with [Express](https://expressjs.com/), a web framework for Node.js. We used the NoSQL document data model [MongoDB](https://www.mongodb.com/) as the applications database program.

The following sections detail the process of installing the dependencies, building a project for Android and/or iOS, and running the application locally and/or remotely.

## 2: Installation Instructions

### 2.1: macOS

Node.js is an open-source JavaScript runtime environment; it is required to install, build, and run this application. Use the link below to download and install `node`, alongside the package manager, `npm`.

1. Go to https://nodejs.org/en/download/ and download the LTS version of Node. (Alternatively, use a package manager like Homebrew. But make sure you install the LTS version!)
2. Install the expo command line tools: ```npm install --global expo-cli```. Verify that the installation was successful by running ```expo whoami```.
3. Move the project folder to your user's directory. (This is potentially important, as the file watchers React Native use might have difficulty with the Desktop, Download, or Documents directories.)
4. Change into the project directory.
5. Make sure you are inside the correct directory by running ```ls```. There should be a package.json file inside there.
6. Install the dependencies by running ```npm install```.

### 2.2: Windows

1. Go to https://nodejs.org/en/download/ and download the LTS version of Node.
2. Install the expo command line tools: ```npm install --global expo-cli```. Verify that the installation was successful by running ```expo whoami```.
3. Change into the project directory.
4. Make sure you are inside the correct directory by running ```ls```. There should be a package.json file inside there.
5. Install the dependencies by running ```npm install```.
6. Make sure NPM has been added to your environment variables. Open the Windows search bar and type "environment". Select "Edit the System Environment Variables".
7. Click "Environment Variables", and then double-click "Path" under "System Variables".
8. Click the "New" button and add the following path: ```%USERPROFILE%\AppData\Roaming\npm```.
9. Click OK and apply changes. Close out of your GitBash terminal completely and reopen.

## 3: Build and Run

To build and run this app, open the project directory and run ```expo start```. This should open a browser window.

### 3.1: Using a Physical Device

According to [Expo](https://expo.dev/), "The fastest way to get up and running is to use the Expo Go app on your iOS or Android device. Expo Go allows you to open up apps that are being served through Expo CLI." Install it using one of these links:

- [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) - Android Lollipop (5) and greater.
- [iOS App Store](https://itunes.com/apps/exponent) - iOS 11 and greater.

On your iPhone or iPad, open the default Apple "Camera" app and scan the QR code you see in the terminal or in Expo Dev Tools.

On your Android device, press "Scan QR Code" on the "Projects" tab of the Expo Go app and scan the QR code you see in the terminal or in Expo Dev Tools.

### 3.2: Using a Simulator

Keep in mind that emulators require a lot of RAM, so you may find that bundling and displaying code takes much longer than when using a physical device. If you would like to run in a simulator, use the following instructions provided by Expo:

- [Installing the iOS Simulator (macOS only)](https://docs.expo.dev/workflow/ios-simulator/)
- [Installing an Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)