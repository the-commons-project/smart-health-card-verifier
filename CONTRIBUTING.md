# How to contribute to SMART Health Card Verifier <!-- omit in toc -->

In this guide you will get an overview of the contribution workflow from opening an issue, creating a PR, reviewing, and merging the PR.

## Semantic Versioning

SMART Health Card Verifier follows [semantic versioning](https://semver.org/). Using conventional commits and proper commit messages 🙏 will keep our [CHANGELOG](./CHANGELOG.md)
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

Commit the changes once you are happy with them. See [Atom's contributing guide]https://github.com/atom/atom/blob/master/CONTRIBUTING.md#git-commit-messages) to know how to use emoji's for commit messages.

## Branch Organization

Submit all changes directly to the `main` branch. Code may contain additional features, but no breaking changes.

## Bugs

### Known Issues

We are using GitHub Issues for our public bugs. Before filing a new task, try to make sure your problem doesn’t already exist. Scan through our [existing issues](link-to-github-issues) to find one that interests you.

### Reporting New Issues

Report a new issue by submitting one [here](link-to-github-issues). Please ensure you provide necessary details for us to understand and replicate the issue.

## How to Get in Touch

## Your First Pull Request

Here is a great resource to guide you to making your first pull request.

[How to Contribute to an Open Source Project on GitHub](https://app.egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

If you decide to fix an issue, please be sure to check the comment thread in case somebody is already working on a fix. If nobody is working on it at the moment, please leave a comment stating that you intend to work on it so other people don’t accidentally duplicate your effort.

## Sending a Pull Request

1. Fork [the repository](repository-link) and create a new branch from `main`:

```bash
  $ git checkout https://gitlab.com/st-experiments/health-card-verifier-mobile.git -b name_for_new_branch
```

2. Make changes and test
3. Ensure you code is formtted with our [prettier](https://github.com/prettier/prettier) config.
4. Submit Pull Request with comprehensive description of changes
