# SMART Health Card Verifier mobile application

## Pre-requisites

1. Install XCode iOS tools

2. Install global dependencies

```bash
   npm install -g expo-cli
```

## Installation and publishing

### Clone repository

```bash
   git clone git@gitlab.com:st-experiments/health-card-verifier-mobile.git
```

### Install dependencies

```bash
   npm install
```

### Run application locally

```bash
   npm start
```

As alternative you can run application for the desired environment by specifying the client:

```bash
   npm run android
```

```bash
   npm run ios
```

```bash
   npm run web
```

You will see a user interface launched at your localhost in the browser. You may choose to,
- Run on Android device/emulator
- Run on iOS simulator
- Run in web browser
- Scan QR using mobile and run the application on your mobile

### Run application on your iOS or Android device
Follow the documentation in this [link](https://docs.expo.io/get-started/installation/#2-expo-go-app-for-ios-and)
at section **2. Expo Go app for iOS and Android** to install Expo Go app and run the application on your phone.


### Run application on an Android emulator
1. Install [Android Studio](https://developer.android.com/studio)

2. Once installed,
- go to File > settings > SDK Settings. 
- Search for "sdk", click on Appearance & Behavior > System Settings > Android SDK. 
- Ensure that Android SDK 6.0 (Marshmallow) to Android 11.0 (R) are installed. 

3. Install Android emulator - [Genymotion](https://www.genymotion.com/download/)

4. Run Genymotion application. 
- Click on Genymotion > settings > ADB. 
- Click on "Use custom Android SDK tools", browse to the path for Android SDK. 
- SDK path for windows, C:/Users/<username>/AppData/Local/Android/Sdk. SDK path for iOS, /Users/<username>/Library/Android/sdk. 
- Create a device (Google Pixel 3 for example)

5. Click on "Run on Android device/emulator" on your localhost in the browser.

