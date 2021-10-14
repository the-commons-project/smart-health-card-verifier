# SMART Health Card Verifier

Verifier is a safe, privacy-preserving mobile application, designed to verify
SMART Health Card certificate encoded in a QR code. The app is launched in both the Play store and iOS store. It is built using React Native with Typescript and Expo.

## Table of contents

- [SMART Health Card Verifier](#smart-health-card-verifier)
  - [Table of contents](#table-of-contents)
  - [Environment Setup](#environment-setup)
    - [Prerequisites](#prerequisites)
    - [Global dependencies](#global-dependencies)
    - [Install project required dependencies](#install-project-required-dependencies)
    - [Expo Go](#expo-go)
    - [Run application locally](#run-application-locally)
  - [How to Contribute](#how-to-contribute)
    - [Code of Conduct](#code-of-conduct)
    - [Contributing Guide](#contributing-guide)
  - [Publishing the App](#publishing-the-app)
  - [License](#license)

## Environment Setup

### Prerequisites

Node **v14.17.X** (LTS/fermium)

### Global dependencies

```bash
  npm install -g expo-cli
```

### Install project required dependencies

```bash
  npm install
```

### Expo Go

Expo Go allows you to run the project directly on your mobile device.
Follow [these](https://docs.expo.io/get-started/installation/#2-expo-go-app-for-ios-and)
instructions to install Expo Go on your mobile phone.

### Run application locally

```bash
  npm start
```

Expo will open an application in the default browser with a QR code, that should
be scanned with your mobile device and open the application with Expo Go.

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

Smart Health Card Verifier is [MIT licensed](./LICENSE)
