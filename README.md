# Lightweight Tabletop RPG Grid Map
This project is trying to do what the title says: a replacement for the physical grid used to play tabletop RPGs such as Dugeons & Dragons. Instead of worrying about expensive miniatures and parts to build your environment's map, or drawing in a plastified reusable grid that won't last more than a few months, why not use a digital version of that? Easier to build maps, move characters, and all of that.

## Why do it again?
More than just a way of learning and putting to practice some Programming/Web Development skills (which is a valid reason in itself), it has been an interest of mine to create a "lightweight" alternative. Currently we have some phenomenal solutions to help with the online tabletop RPG games, such as [Roll20](https://roll20.net/), [Foundry](https://foundryvtt.com/), and more; tools that help the Dungeon Masters and the players a lot... But they are far from simple. They're doing many things at once, and because of that they implement a lot of resources used for tabletop RPG games (that you might not want in the same place).

With those tools the DMs can manage the entire game if they want, even character sheets, items and dice rolls, and the interface to do all that is not always the most simple to understand; with what I want to do, I don't want to dive too deep into every tabletop game aspects, I only want to present the minimum required for the players and the DM to have an environment to control encounters where the grid map, character positioning and movement are relevant. Having other features like other solutions have would be cool too, but the main concept here is a lightweight, minimalistic core, with space for new "plug-and-play" features.

## Concepts, technologies and tools (that I hope) to apply
* BDD (Behaviour Driven Development)
* Cucumber/Gherkin
* Cypress
* Vite
* Single Page Application (SPA)
* HTML5/CSS3/JavaScript
* Vanilla JS
* Three.js
* Node.js
* WebSockets
* Docker/Docker Compose
* Monorepo
* GitHub Actions (CI/CD)
* (More descriptions soon...)

## Known Issues
* For OS configurations where the screen is in a different scale from the original (for example: on Windows 10 when the screen configuration "Adjust scale and layout" has a value different from "100%" in it's "Change size for text, apps and other items" field), you might experience a difference on the expected size for Cypress' screenshot images. This can be troublesome specially when dealing with Visual Testing. For now, the only way of solving this is to configure your screen back to it's original scale in your OS' screen configuration.
