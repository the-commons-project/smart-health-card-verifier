# SMART Health Card Verifier

Verifier is a safe, privacy-preserving mobile application, designed to verify
SMART Health Card certificate encoded in a QR code.

## Table of contents

- [SMART Health Card Verifier](#smart-health-card-verifier)
  - [Table of contents](#table-of-contents)
  - [Environment Setup](#environment-setup)
    - [Prerequisites](#prerequisites)
    - [Global dependencies](#global-dependencies)
    - [Clone the repository](#clone-the-repository)
    - [Install project required dependencies](#install-project-required-dependencies)
    - [Expo Go](#expo-go)
    - [Run application locally](#run-application-locally)
    - [Making commits](#making-commits)
  - [Release](#release)
      - [Patch version update](#patch-version-update)
      - [Minor version update](#minor-version-update)
      - [Major version update](#major-version-update)
  - [Publish application](#publish-application)
  - [TODOs](#todos)
  - [How to Contribute](#how-to-contribute)
  - [Authors and acknowledgement](#authors-and-acknowledgement)
  - [License](#license)

## Environment Setup

### Prerequisites

Node **v14.17.X** (LTS/fermium)

### Global dependencies

```bash
  npm install -g expo-cli
```

### Clone the repository

```bash
  git clone git@gitlab.com:st-experiments/health-card-verifier-mobile.git
```

### Install project required dependencies

```bash
  npm install
```

### Expo Go

Expo Go allows to run the project directly on your mobile device.
Follow [these](https://docs.expo.io/get-started/installation/#2-expo-go-app-for-ios-and)
instructions to install Expo Go on your mobile phone.

### Run application locally

```bash
  npm start
```

Expo will open an application in the default browser with a QR code, that should
be scanned with your mobile device and open the application with Expo Go.

### Making commits

Using conventional commits and proper commit messages 🙏 will keep our [CHANGELOG](./CHANGELOG.md)
awesome 🚀.

Here are conventional commit prefixes, and HOW to use them:

The `fix` type indicates that this commit removes a bug in the codebase.<br />
Creating a release with such a commit results in bumping the **patch version**
(0.0.1).

```bash
  git commit -m 'fix: prevent the application from crashing'
```

Creating a `feat` commit means introducing a new feature.<br />
Therefore, it increases the **minor version** (0.1.0).

```bash
  git commit -m 'feat: add the possibility to filter posts'
```

A commit marked as a breaking change 🚨 results in increasing the **major version**
(1.0.0).<br />
We can create it either by appending the `!` sign, or adding the information
in the footer.

```bash
  git commit -m 'fix!: change the way that the posts are filtered to deal with a bug'
```

Or

```bash
  git commit -m 'feat: add pagination to the posts endpoint' -m 'BREAKING CHANGE: now the result might not contain all posts'
```

We can use many different types of commits:

`test` – when modifying existing tests, or adding new ones<br />
`refactor` – changing the code in a way that does not fix a bug nor adds features<br />
`docs` – modifying the documentation<br />
`chore` – routine tasks such as updating dependencies<br />
`build` – affecting the way the application builds

Please check [this great article](https://wanago.io/2020/08/17/generating-changelog-standard-version/)
for more inspiration 🏋️‍.

## Release

[Standard Version](https://github.com/expo-community/standard-version-expo#readme)
is used to automate the versioning of the project❗️- to update the Expo
manifest automatically 🤖.

To update the _application version_, Android _versionCode_ and iOS _buildNumber_
run one of the commands below.

#### Patch version update

WHEN: everytime except of breaking changes or new feature introduction

```bash
  npm run release:patch
```

#### Minor version update

WHEN: on adding new feature

```bash
  npm run release:minor
```

#### Major version update

WHEN: on breaking changes

```bash
  npm run release:major
```

## Publish application

Application is published to App Store and Google Play via Bitrise as a part of CI/CD
on merge/commit into the `main` branch.

## TODOs

List of [things to improve](./TODO.md) and to make code better, simplier and
more readable ❤️.

## How to Contribute

See contributing guidelines here.

## Authors and acknowledgement

## License
