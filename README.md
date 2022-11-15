# SMART Health Card Verifier

SMART Health Card Verifier is a safe, privacy-preserving mobile application, designed to verify
[SMART Health Card certificate](https://smarthealth.cards/) encoded in a QR code. The app is launched in both the Play store and iOS store. It is built using React Native with Typescript.

Vaccine Codes and Test Result currently focuses on Covid 19 related, however, if you would like to 
verify other SHC please share your usecase. 

Also there is any code that doesn't verify, please consider supporting us by [*contributing*](./docs/FAQ.md) 

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

## Environment 

Local test environment setup. This will give you precheck before pushing the code. 
```bash
cat resources/git_hooks/pre-push > .git/hooks/pre-push
```

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

### Environment File setup
copy .env.sample and change it to .env.development
for API_KEY, API_URL,  for production, please contact a The Commons Project project maintainer. 


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

create keystore file and set that in the secret.properties 
```bash
  cd android; keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 
  touch android/secret.properties
```

In the secret.properties file directly under the android folder, 
add below. 

```
signing_keystore_location = "<your path to project dir>/smart-health-card-verifier/android/debug.keystore"
signing_keystore_password = "android"
signing_keystore_key_alias = "androiddebugkey"
signing_keystore_key_password = "android"
```


### Install project required dependencies

install dependencies and run the metro server. 

```bash
  npm install
  
```

```bash

  npm start
```

#### Fix for deprecated module 
RNCamera that we rely on causes build error. Because it uses deprecated ViewPropTypes. 
Until we fix this, we have to work around. 
1. Go to node_modules/react-native-camera/src/RNCamera.js
remove ViewPropTypes and add 'ViewPropTypes' from 'deprecated-react-native-prop-types'

```
import {
  findNodeHandle,
  Platform,
  NativeModules,
  requireNativeComponent,
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';

import {  ViewPropTypes } from 'deprecated-react-native-prop-types'
```

#### For Android
Open another terminal
```
  npx react-native run-android
```
  This will load any dependent asset that needs to be in the resources folder. 
  Open Android project from ./android folder
  and if you have phone connected, install the app through Android Studio. 


Once  you are running on the device, 

When it's started, load will fail. Make sure your android phone is on the same network. 

Shake device -> see setting -> Change host to <ipaddress that node runs>:8081



#### For IOS 

1. Check Environment

  ```
  ruby --version
  ```

3. Download rbenv
  if it's less than 2.7.5, install rbenv to use 2.7.5

  ```
  brew install rbenv ruby-build
  ```

2. Configure your shell to load rbenv:

   * For **bash**:
     
     _Ubuntu Desktop_ users should configure `~/.bashrc`:
     ```bash
     echo 'eval "$(~/.rbenv/bin/rbenv init - bash)"' >> ~/.bashrc
     ```

     On _other platforms_, bash is usually configured via `~/.bash_profile`:
     ```bash
     echo 'eval "$(~/.rbenv/bin/rbenv init - bash)"' >> ~/.bash_profile
     ```
     
   * For **Zsh**:
     ```zsh
     echo 'eval "$(~/.rbenv/bin/rbenv init - zsh)"' >> ~/.zshrc
     ```
   
   * For **Fish shell**:
     ```fish
     echo 'status --is-interactive; and ~/.rbenv/bin/rbenv init - fish | source' >> ~/.config/fish/config.fish
     ```

   If you are curious, see here to [understand what `init` does](#how-rbenv-hooks-into-your-shell).

3. Restart your shell so that these changes take effect. (Opening a new terminal tab will usually do it.)


Install dependencies 

```bash
  npm run ios
  cd ios; pod install
  arch -x86_64 pod install // for M1Chip 


```

  Open  Xcoe workspace by selecting Verifier.xcworkspace
  and run. 

## test
```bash
  npm test
```

if you want to test one file, you can test as below.
```
npm test __tests__/DataSync-test.ts
```



## How to Contribute

We welcome any contributions for bug fixes and improvements. Below explains how you can be a part of the open source communitiy.

### Code of Conduct

The Common Projects has adopted a Code of Conduct that we expect the community to adhere to. Please see the [document here](./docs/CODE_OF_CONDUCT.md) so that we can maintain a healthy and collaborative community.

### Contributing Guide

See [contributing guidelines](./docs/CONTRIBUTING.md) for more information.

## License

Smart Health Card Verifier is [MIT licensed](./LICENSE) is derived from [**SMART Health Cards Dev Tools**](https://github.com/smart-on-fhir/health-cards-dev-tools) by (c) Microsoft Corporation


##Reference
VaccineCodes: [https://www.cdc.gov/vaccines/programs/iis/COVID-19-related-codes.html ](https://www.cdc.gov/vaccines/programs/iis/COVID-19-related-codes.html) 
