# Cross-Platform Mobile Application

Advanced Software Engineering, Group 1.  
Written by Jack Lloyd, Jacob Evans, Yunusa Jibrin, and Will Kearney

## Table of Contents

- [1: Introduction](#1-introduction)
- [2: Installation Instructions](#2-installation-instructions)
  * [2.1: macOS](#21-macos)
  * [2.2: Windows](#22-windows)
- [3: Build and Run](#3-build-and-run)
  * [3.1: Using a Simulator](#31-using-a-simulator)
    + [3.1.1: iOS Simulator](#311-ios-simulator)
    + [3.1.2: Android Simulator](#312-android-simulator)
  * [3.2: Using a Physical Device](#32-using-a-physical-device)
    + [3.2.1: iOS](#321-ios)
    + [3.2.2: Android](#322-android)

## 1: Introduction

This GPS prototype displays your current position in terms of longitude and latitude. It is built using the React Native framework on a Javascript codebase. The app is cross-platform through the usage of the Ionic and Capacitor frameworks, meaning it is available for both Android and iOS, and remotely hosted via AWS (Amazon Web Services) Amplify.

The following sections detail the process of installing the dependencies, building a project for Android and/or iOS, and running the application locally and/or remotely.

## 2: Installation Instructions

### 2.1: macOS

Node.js is an open-source JavaScript runtime environment; it is required to install, build, and run this application. Use the link below to download and install `node`, alongside the package manager, `npm`.

1. Go to https://nodejs.org/en/download/ and download the LTS version of Node. (Alternatively, use a package manager like Homebrew. But make sure you install the LTS version!)
2. Move the project folder to your user's directory. (This is potentially important, as the file watchers React Native use might have difficulty with the Desktop, Download, or Documents directories.)
3. Change into the project directory.
4. Make sure you are inside the correct directory by running ```ls```. There should be a package.json file inside there.
5. Install the dependencies by running ```npm install```.

### 2.2: Windows

1. Go to https://nodejs.org/en/download/ and download the LTS version of Node.
2. Change into the project directory.
3. Make sure you are inside the correct directory by running ```ls```. There should be a package.json file inside there.
4. Install the dependencies by running ```npm install```.
5. Make sure NPM has been added to your environment variables. Open the Windows search bar and type "environment". Select "Edit the System Environment Variables".
6. Click "Environment Variables", and then double-click "Path" under "System Variables".
7. Click the "New" button and add the following path: ```%USERPROFILE%\AppData\Roaming\npm```.
8. Click OK and apply changes. Close out of your GitBash terminal completely and reopen.

## 3: Build and Run

This section describes how to build a project file/folder for either Android Studio or Xcode, for Android and iOS, respectively.

**Android Studio**: `https://developer.android.com/studio`  
**Xcode**: `https://developer.apple.com/xcode`

### 3.1: Using a Simulator

Keep in mind that emulators require a lot of RAM, so you may find that bundling and displaying code takes much longer than when using a physical device.

#### 3.1.1: iOS Simulator

1. Make sure you have XCode installed. If not, download the full version of Xcode from the App Store.
2. Launch XCode a terms. In the top menu bar, click "XCode", then "Preferences" and then "Locations".
3. Make sure that the "Command Line Tools" are installed and selected.
4. Insure you have installed all packages by following the installation instructions above (i.e. run ```npm install```).
5. Go to your terminal. In the project directory, run ```npm run build```.
6. Run ```npx cap run ios```. Choose a simulation device when prompted. This should automatically launch the iOS simulator.

#### 3.1.2: Android Simulator

1. Navigate to the project directory
2. Run ```npm run build```.
2. Run ```npx cap open android```.

### 3.2: Using a Physical Device

#### 3.2.1: iOS

1. TODO

#### 3.2.2: Android

1. TODO
