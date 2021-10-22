# Cross-Platform Mobile Application

Advanced Software Engineering, Group 1.  
Written by Jack Lloyd, Jacob Evans, and Yunusa Jibrin.

## Table of Contents

1. Introduction
2. Install
3. Build
    1. Android
    2. iOS
4. Run
    1. Local
    2. Remote

## 1: Introduction

This GPS prototype displays your current position in terms of longitude and latitude. It is built using the React Native framework, which is cross-platform through the usage of the Ionic and Capacitor frameworks, meaning it is available for both Android and iOS, and remotely hosted via AWS (Amazon Web Services) Amplify.

The following sections detail the process of installing the dependencies, building a project for Android and/or iOS, and running the application locally and/or remotely.

## 2: Install

Node.js is an open-source JavaScript runtime environment; it is required to install, build, and run this application. Use the link below to download and install `node`, alongside the package manager, `npm`.

**Node.js**: `https://nodejs.org/download/`

Open a command-line interface (CLI) and execute both of the following commands to validate your installation.

```
node --version
```
```
npm --version`
```

To install the dependencies listed in `package.json`, navigate to the project folder in a CLI, then execute the command below.

```
npm install
```

This will automatically install said dependencies.

## 3: Build

This section describes how to build a project file/folder for either Android Studio or Xcode, for Android and iOS, respectively.

**Android Studio**: `https://developer.android.com/studio`  
**Xcode**: `https://developer.apple.com/xcode`

### 3.1: Android

Use the command below to build an Android Studio project.

```
npx cap open android
```

### 3.2: iOS

Use the command below to build an Xcode project.

```
npx cap open ios
```

## 4: Run

This section does not cover building a project for Android nor iOS, it covers running the application locally and/or remotely in a browser.

### 4.1: Local

To host the application locally, start a local server on your machine by executing the command below.

```
npm start
```

Open a browser and navigate to `https://localhost:3000/`.

### 4.2: Remote

This application is hosted remotely via AWS Amplify; open a browser and navigate to `https://main.d1a5inltbc7tgm.amplifyapp.com/`.

**Note**: this version of the application is password-protected, and therefore requires that you request the credentials from the team.
