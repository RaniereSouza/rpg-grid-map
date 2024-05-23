# ROADMAP 1.0

## Architecture, tooling & codebase
### Technical milestones
- [x] Configure Vite for Web (Front-end) JavaScript development, build system and bundling
- [x] Configure Cypress (with Cucumber/Gherkin) for Functional ("E2E") Testing and BDD
- [x] Upgrade from Vite 2.x to Vite 4.x
- [x] Upgrade from Cypress 10.x to Cypress 12.x
- [x] Configure Vitest for Unit Testing
- [ ] **Consolidate Roadmap `IN PROGRESS`**
- [ ] Upgrade from Vite 4.x to Vite 5.x (more than 1 year stale)
- [ ] Upgrade from Cypress 12.x to Cypress 13.x (more than 1 year stale)
- [ ] Upgrade from Vitest 0.x to Vitest 1.x (dev release to production release)
- [ ] Upgrade from Three.js r140 to Three.js r164 (more than 2 years stale)
- [ ] Define and model the initial Architecture for the application
- [ ] Configure GitHub Actions for CI
- [ ] Configure GitHub protection rules for branches and pull requests
- [ ] Running Cypress from Docker container instead of local installation
- [ ] Dockerize the application
- [ ] Setup a staging environment to deploy and playtest the application
- [ ] Configure GitHub Actions for CD (deploy the application to the staging environment)
- (More specifications soon...)

## 1.0.0-alpha Release
### Planned release date
- (TBD...)
### Expected behavior & features
- An user can access the application either as a GM or as a player: as GM, the user can create maps, place and move any placeholder pieces, and share the maps with the players; as a player, the user can access the maps shared with them by GMs, and control their respective placeholder pieces on the grid
- At the map creation step, the GM can choose a height and a width, and with that they can generate a base grid for the map to be drawn
- When a grid is created, all squares are considered accessible terrain for the players until the GM set it otherwise (any of them could be changed to unreachable terrain/obstacle)
- Once they consider the grid map as ready, the GM can share a link with their players so they can access it
- When accessing a map, the players can position their placeholder pieces at any square on the grid, unless another piece is already at that place, or the square is unreachable terrain/an obstacle
- The players can only move their respective placeholder pieces, but the GM can move any piece on the grid (following the same positioning rules, the GM cannot place pieces over each other or move them to unreachable terrain/obstacles)
- (More specifications soon...)

## 1.0.0-beta Release
### Planned release date
- (TBD...)
### Expected behavior & features
- (More specifications soon...)

## 1.0.0 Release
### Planned release date
- (TBD...)
### Expected behavior & features
- (More specifications soon...)
