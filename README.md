# SMART Health Card Verifier

SMART Health Card Verifier is a safe, privacy-preserving mobile application, designed to verify
[SMART Health Card certificate](https://smarthealth.cards/) encoded in a QR code. The app is launched in both the Play store and iOS store. It is built using React Native with Typescript and Expo.

## Table of contents

- [SMART Health Card Verifier](#smart-health-card-verifier)
  - [Table of contents](#table-of-contents)
  - [Environment Setup](#environment-setup)
    - [Prerequisites](#prerequisites)
    - [Global dependencies](#global-dependencies)
  - [How to Contribute](#how-to-contribute)
    - [Code of Conduct](#code-of-conduct)
    - [Contributing Guide](#contributing-guide)
  - [Publishing the App](#publishing-the-app)
  - [License](#license)

## Environment Setup


### Prerequisites

Node **v14.17.X** (LTS/fermium)
[React Native cli](https://www.npmjs.com/package/react-native-cli)
[XCode 13 or later](https://apps.apple.com/us/app/xcode/id497799835?mt=12) 
[Android Studio](https://developer.android.com/studio/install)
Android Studio SDK 30 download through android studio 


### Global dependencies

For react
```bash
  npm install -g react-native-cli
```

For Android
make sure you download sdk using android studio SDK 30 


```bash
  export ANDROID_HOME=$HOME/Android/Sdk
  export PATH=$PATH:$ANDROID_HOME/emulator
  export PATH=$PATH:$ANDROID_HOME/tools
  export PATH=$PATH:$ANDROID_HOME/tools/bin
  export PATH=$PATH:$ANDROID_HOME/platform-tools

```


### Install project required dependencies

install dependencies and run the metro server. 

```bash
  npm install
  npm start
```
#### For Android 
  Open Android project from ./android folder
  and run.

#### For IOS 

Install dependencies 

```bash
  cd ios; pod install
```

  Open  Xcoe workspace by selecting Verifier.xcworkspace
  and run. 

  
## How to Contribute

We welcome any contributions for bug fixes and improvements. Below explains how you can be a part of the open source communitiy.

### Code of Conduct

Affinidi has adopted a Code of Conduct that we expect the community to adhere to. Please see the [document here](./CODE_OF_CONDUCT.md) so that we can maintain a healthy and collaborative community.

### Contributing Guide

See [contributing guidelines](./CONTRIBUTING.md) for more information.

## Publishing the App

You can upload the app to the Apple App Store and the Google Play by following these steps.

1. [Create an expo account](https://expo.dev/signup) if you dont already have one.
2. Run `expo login` in your command prompt and enter your credentials
3. Run `expo eject --npm`
   - This step will ask you for an bundle identifier which has to be unique. For instance, `com.yourcompany.appname.ios` or `com.yourcompany.appname.android`
4. Once done, the `ios` and `android` directories should appear in the repository. You can use XCode to edit and view the `ios` directory and similarly, use Android studio for the `android` directory.
5. Create the `.ipa` by running `expo build:ios`, and upload the iOS app to TestFlight by following the instructions [here](https://docs.expo.dev/distribution/uploading-apps/#manually-uploading-your-app).
6. Create the `.apk` by running `expo build:android`, and upload the Android app to Google Play by following the instructions [here](https://docs.expo.dev/distribution/uploading-apps/#21-if-you-choose-to-upload-your).

The steps described above is a manual process. If you would like to automate the workflow, you may refer to [using the EAS CLI](https://docs.expo.dev/distribution/uploading-apps/#manually-uploading-your-app-for-the-first). However, you will need a [PAID EAS subscription](https://expo.dev/pricing).

## License

Smart Health Card Verifier is [MIT licensed](./LICENSE) is derived from [**SMART Health Cards Dev Tools**](https://github.com/smart-on-fhir/health-cards-dev-tools) by (c) Microsoft Corporation