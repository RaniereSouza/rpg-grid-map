# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.3] - 2024-05-02
### Added
- Basic configuration for Unit Testing with Vitest
- Unit testing cases for some parts of the codebase

## [0.1.2] - 2023-04-29
### Changed
- Migrating from Cypress 10.x to Cypress 12.x
- Changing configurations to make Cypress be responsible for serving the test application

## [0.1.1] - 2023-04-29
### Changed
- Migrating from Vite 2.x to Vite 4.x
- Better configs for bundling and solving dependencies
- Letting go of third-party utility solution `three.meshline`

## [0.1.0] - 2023-04-23
### Added
- Rudimentary App, Component and View classes
- Basic SPA routing
- Map creation view
- Canvas manipulation and 3D context with Three.js
- Blank grid creation minimal functionality
- Visual Regression Testing on Cypress (custom solution into external library `heimdall-visual-test`)
### Changed
- Better naming for some NPM scripts
- Migrating from Cypress 9 to Cypress 10

## [0.0.1] - 2022-05-19
### Fixed
- Now the tests run based on the project's production build instead of the dev server
- Better identification for each process running with `concurrently`

## [0.0.0] - 2022-05-13
### Added
- Basic project structure built with Vite
- Basic configuration for testing automation and BDD with Cypress and Cucumber
- CHANGELOG file (to register the current state and versioning of the project) and FEATURES file (to register expected features and application requirements to build upon)
