# ROADMAP 1.0

## Architecture, tooling & codebase
### Technical milestones
- [x] Configure Vite for Web (Front-end) JavaScript development, build system and bundling
- [x] Configure Cypress (with Cucumber/Gherkin) for Functional ("E2E") Testing and BDD
- [x] Upgrade from Vite 2.x to Vite 4.x
- [x] Upgrade from Cypress 10.x to Cypress 12.x
- [x] Configure Vitest for Unit Testing
- [ ] **Consolidate Roadmap 1.0 `IN PROGRESS`**
- [ ] Configure GitHub protection rules for branches and pull requests
- [ ] Upgrade from Vite 4.x to Vite 5.x (more than 1 year stale)
- [ ] Upgrade from Cypress 12.x to Cypress 13.x (more than 1 year stale)
- [ ] Upgrade from Vitest 0.x to Vitest 1.x (dev release to production release)
- [ ] Upgrade from Three.js r140 to Three.js r164 (more than 2 years stale)
- [ ] Define and model the initial Architecture for the application
- [ ] Configure GitHub Actions for CI (healthcheck, lint, all tests, etc)
- [ ] Running Cypress from Docker container instead of local installation
- [ ] Dockerize the application
  - [ ] For development (devcontainer)
  - [ ] For deploy
- [ ] Setup a staging environment to deploy and playtest the application
- [ ] Configure GitHub Actions for CD (deploy the application to the staging environment)
- (More specifications soon...)

## 1.0.0-alpha Release
### Planned release date
- (TBD...)
### Expected behavior & features
- An user can access the application either as a GM or as a player: as GM, the user can create maps, place and move any placeholder pieces, and share the maps with the players; as a player, the user can access the maps shared with them by GMs, and control their respective placeholder pieces on the grid
- At the map creation step, the GM can choose a height and a width, and with that they can generate a base grid for the map to be drawn
- When a grid is created, all squares are considered accessible terrain for the players and other moving pieces until the GM set it otherwise (any of them could be changed to unreachable terrain/obstacle)
- Right after the initial grid creation, the GM now should enter Edition Mode for that map. The features available in Edition Mode for this version will be:
  - Marking of individual or multiple grid squares as unreachable terrain/obstacles
  - Marking of individual or multiple grid squares with custom labels defined by the GM
  - Definition of movable pieces representing players or other characters
  - Definition of markers on the grid in representation of points of interest or interactable objects
  - Definition of custom labels for grid squares, movable pieces, or markers
  - Definition of what is visible or not to the players
  - Addition of a background image for the grid
  - (More specifications soon...)
- Once they consider the grid map as ready, the GM can share a link with their players so they can access it
- When accessing a map, the players can position their placeholder pieces at any square on the grid, unless another piece is already at that place, or the square is unreachable terrain/an obstacle
- The players can only move their respective placeholder pieces, but the GM can move any piece on the grid (following the same positioning rules, the GM cannot place pieces over each other or move them to unreachable terrain/obstacles)
- To create a map and share a session to play with others, or to access an existing session, it shouldn't be needed to login/sign-up (at first); But all this "logged off" data (grids, players, actions historic, etc) should have a well defined expiration date (first suggestion is 15 days)
- During a playing session, the GM can activate Edition Mode for the map, but the session will go to it's paused/idle state for the players in this instance, and everyone will know that the map is being modified (but the results will only appear after the GM finishes modifying it)
- Some smaller changes can be made by the GM in an ongoing session without the need of entering Edition Mode. Those are:
  - Defining if something is visible to the players or not
  - Moving pieces on the grid, including the player's pieces
  - Adding, changing or removing labels on grid squares, moving pieces, or markers
  - Adding, changing or removing non-player pieces or markers
  - (More specifications soon...)
- During a playing session, it should be possible to toggle an actions journal, with a historic of all the actions taken in the session: Players entering/leaving, movements, pieces being included/removed from the grid, changes on the map, labelling of things, etc (all in order and automatically registered); This historic should have a well defined date/time range for how far back it goes, and/or how many actions it's able to display/remember at once
- If someone enters an ongoing session (via link for example), this person only becomes a player when the GM associates them to a player moving piece
- Upon entering an existing session as a player, if you've been there before, you'll simply have to continue normally; If it's the first time you're in this session, you'll be prompted to (optionally) enter a name, or else you'll be identified by a non-human-friendly UID
- An existing session will only be considered "ongoing" if the GM triggers it, and it's going to be in a paused/idle state otherwise; The players will still be able to access a paused/idle session, but nothing will be interactable, just viewed
- Every session will be capped to a well defined maximum number of people connected, including the GM in the number (first suggestion is 20 people)
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
