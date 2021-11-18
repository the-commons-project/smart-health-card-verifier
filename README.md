# SMART Health Card Verifier

SMART Health Card Verifier is a safe, privacy-preserving mobile application, designed to verify
[SMART Health Card certificate](https://smarthealth.cards/) encoded in a QR code. The app is launched in both the Play store and iOS store. It is built using React Native with Typescript and Expo.

## Table of contents

- [SMART Health Card Verifier](#smart-health-card-verifier)
  - [Table of contents](#table-of-contents)
  - [Environment Setup](#environment-setup)
    - [Prerequisites](#prerequisites)
    - [Platform base setup](#platform-base-setup)
  - [Test](#test)
  - [How to Contribute](#how-to-contribute)
    - [Code of Conduct](#code-of-conduct)
    - [Contributing Guide](#contributing-guide)
  - [License](#license)

## Environment Setup

## Script

```bash
npm run test

```

- test: Test is run with [jest] (https://jestjs.io/docs) framework. 


### Prerequisites

Node **v14.17.X** (LTS/fermium)

[React Native cli](https://www.npmjs.com/package/react-native-cli)
```bash
  npm install -g react-native-cli
```

[XCode 13 or later](https://apps.apple.com/us/app/xcode/id497799835?mt=12)
[Cocopod](https://guides.cocoapods.org/using/getting-started.html)

[Android Studio](https://developer.android.com/studio/install)
Android Studio SDK 30 download through android studio 


### Platform base setup


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

## License

Smart Health Card Verifier is [MIT licensed](./LICENSE) is derived from [**SMART Health Cards Dev Tools**](https://github.com/smart-on-fhir/health-cards-dev-tools) by (c) Microsoft Corporation