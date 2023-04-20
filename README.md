# Searchbox PWA

PWA movie search application built using Angular CLI version 14.0.2 and [OMDb API](https://www.omdbapi.com/).

## Features

-   Change color mode
-   Add/Remove movies to favourites or watched list
    -   These lists are cached in your local storage using IndexedDB
-   Search is cached (on page refresh cache will be removed)

## Development server

Run

```bash
ng serve
```

for a dev server. Navigate to http://localhost:4200/. The application will automatically reload if you change any of the source files.automatically reload if you change any of the source files.

## Code scaffolding

Run

```bash
ng generate component component-name
```

to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run

```bash
ng build
```

to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run

```bash
ng test
```

to execute the unit tests via [Karma](https://karma-runner.github.io).
