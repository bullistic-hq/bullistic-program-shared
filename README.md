<br/>

![](banner.jpeg)

<div align="center">
  <h1>Formfunction Program Shared</h1>
  <a href="#overview">Overview</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="#repo-structure">Repo Structure</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="#initial-environment-setup">Initial Environment Setup</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="#development">Development</a>
  <br />
  <hr />
</div>

## Overview

Shared TypeScript library for Formfunction Solana program repos. This repo contains shared TS code which is used in our various program SDKs.

## Repo Structure

```.
├── src                      # Source folder
│   ├── constants            # Constants
│   ├── instructions         # Instruction helper functions
│   ├── pdas                 # PDA helper functions
│   ├── tests                # Unit tests for helper functions
│   ├── types                # Shared types
│   ├── utils                # General helper functions
│   └── index.ts             # Library exports
├── ...                      # Other misc. project config
└── README.md
```

## Initial Environment Setup

Complete the following to setup your environment:

1. Install [Node.js](https://nodejs.org/en) (and [nvm](https://github.com/nvm-sh/nvm) if you want).

## Development

Once you have your environment setup you can run the following:

```sh
# Install dependencies
$ yarn

# Run prettier checks
$ yarn prettier

# Run eslint checks
$ yarn eslint

# Run prettier and eslint with auto-fix flag
$ yarn lint

# Compile TypeScript code
$ yarn tsc

# Build the library
$ yarn build

# Run unit tests
$ yarn test
```

### Publishing the Library

Releases are based on git tags. There is a GitHub Action which is responsible for running releases.

Follow these steps to publish a new version of the library:

1. Run `yarn version` and enter a new appropriate [semver version](https://docs.npmjs.com/about-semantic-versioning) for the npm package. That will create a new tag and commit.
2. Run `git push origin NEW_TAG`.
3. `git push` the new commit as well.
4. Wait for the GitHub action to build and publish the library.
5. Update client SDKs by running `yarn add @formfunction-hq/formfunction-program-shared@latest`.
