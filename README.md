# Match Results Module

## Project Overview

This project was built as part of the **Web Team Onboarding Task**.

The goal was to create a small but production-quality Angular application that displays recent football match results, supports filtering and searching, and provides a detailed match view.

The implementation follows Angular modern practices and the standards defined in the provided Developer Guide.

---

## Tech Stack

* Angular 21 (Standalone Components)
* TypeScript
* Angular Signals
* Angular Material
* SCSS
* RxJS
* TheSportsDB API

---

## Features

### Results List (`/results`)

* League selector
* Recent football match results
* Live search by team name
* Dynamic KPI cards:

  * Total Matches
  * Total Goals
  * Average Goals Per Match
* Loading state
* Empty state
* Error handling

### Match Details (`/results/:id`)

* Match information
* Teams and final score
* Match date
* League information
* Venue and season (if available)
* Match image (if available)

---

## Technical Implementation

The project follows these standards:

* Standalone Components only
* `ChangeDetectionStrategy.OnPush`
* Angular Signals (`signal`, `computed`)
* `inject()` dependency injection
* Lazy-loaded routes
* Strict TypeScript typing
* Dedicated service layer for API requests
* Modern Angular control flow:

  * `@if`
  * `@for`
  * `@switch`

---

## API Source

Data is retrieved from:

TheSportsDB Public API

Recent Matches:

```text
/eventspastleague.php?id=4328
```

Single Match:

```text
/lookupevent.php?id={eventId}
```

---

## Fallback Support

If the external API becomes unavailable, the application automatically loads local fallback data from:

```text
assets/fallback/fallback-matches.json
```

This prevents external downtime from blocking development or testing.

---

## Project Setup

Install dependencies:

```bash
npm install
```

Run locally:

```bash
ng serve
```

Open:

```text
http://localhost:4200
```

Build:

```bash
ng build
```

Run lint:

```bash
ng lint
```

---

## Additional Notes

### URL Improvement

Implemented user-friendly match URLs to avoid exposing raw match identifiers.

Example:

Before:

```text
/results/2267452
```

After:

```text
/results/{public-id}
```

---

## Future Improvements

* Search debounce
* Persist selected league in URL
* Unit tests
* Sorting options
* State caching

