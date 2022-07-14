# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased
### Added
- Rudimentary App, Component and View classes
- Basic SPA routing
- Map creation view
- Canvas manipulation and 3D context with Three.js
- Blank grid creation minimal functionality
- Visual Regression Testing on Cypress with Applitools
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
