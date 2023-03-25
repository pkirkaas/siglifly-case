# Signifly Case Assignment 👋
![Version](https://img.shields.io/badge/version-1-blue.svg?cacheSeconds=2592000)

## Description

Design & PoC of the Signifly Case Assignment


## Technologies Used & Why

### TypeScript

- Adds type checking to JavaScript which imposes a bit more discipline and catches careless errors early.

- TypeScript/JavaScript is the only common language for both front & backend development, which makes it much easier for a developer to work on both.

### React

- Lots of debate about the "best" front-end framework - Vue, Svelte, React, Angular, etc.  

- But React is the most widely used, which means that it is both easier to find developers with React expertise, and there are more 3rd party components for React than any other framework, which means there is a much better chance to find an already component that does what we want instead of having to develop functionality from scratch.

### Node 18

- For new projects, it's usually worth implementing on top of the latest stable release.

- Even if we don't need the latest features, it makes future upgrades easier

### NextJS API Framework

- As with Frontend frameworks, there are lots of good options - Fastify, Restify, Koa, etc.

- But the latest official React documentation has changed its recommendation from 'create-react-app' to: 

```
npx create-next-app@latest [app-name] --ts
```
- AND for prototypes/PoC's, nextJs has the **huge** advantage of serving both the front end and backend API from the same repository/server/command



### SQLite3

- Not always the best choice for production, but excellent for prototyping & PoCs, and upgrading to a production ready SQL DB like Postgres or MySQL is straightforward.

- MongoDB is a great NoSQL alternative, depending on use case. Maybe more than we need for this demo, though.

### Prisma ORM

- ORMs can have performance issues, but greatly simplify complex data relationships & ease of development.

- Instead of spending time & effort on optimizing every function/method during development, it's really useful to run a profiler on the entire system.  Performance problems are typically the result of one or two very slow bottlenecks which is where optimization efforts should be focused.

- Profilers take some effort to set up, but are indispensable when resolving performance issues.

## Data Model

This is the most the time consuming aspect of the project, but also the most critical because EVERYTHING else depends on it, and a bad decision here will limit the project for years to come. 

It's particularly challenging because while there are many wrong approaches, there is never just one "right" approach. Everything involves trade-offs, and many alternatives have to be considered and weighed.



### ✨ [Demo](http://signifly.levitatingwaters.com)

## Install

This demo can be installed and run on any of Windows, Linux or MacOS - **BUT** it *DOES* require `bash` as the command shell.

So to run/build on windows, must have a bash implementation in the path - like cygwin or git-bash.

Then configure NPM to use bash as the command shell by:

`npm config set script-shell "bash.exe"`

or 

`npm config set shell "bash.exe"`

(depending on the version of npm)

To see what shell is used:

To see what shell is set:
npm config ls -l | grep shell

To return/restore to defaults:

`npm config delete script-shell`

```sh
npm install
```

## Usage

```sh
npm run develop
```

## Author

👤 **Paul Kirkaas**

* Github: [@pkirkaas](https://github.com/pkirkaas)
* LinkedIn: [@pkirkaas](https://linkedin.com/in/pkirkaas)


