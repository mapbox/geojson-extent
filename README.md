# geojson-extent

Compute an extent given a GeoJSON object.

## install

    npm install --save @mapbox/geojson-extent

## example

[Live example with Mapbox Static Map API](https://www.mapbox.com/mapbox.js/example/v1.0.0/static-map-from-geojson-with-geo-viewport/)

```js
var geojsonExtent = require('geojson-extent');

geojsonExtent({ type: 'Point', coordinates: [0, 0] }); // returns 0,0,0,0 extent
```

## bin

Provides a binary that takes GeoJSON as stdin and returns a JSON stringified
array of extent data.

```sh
$ npm install -g geojson-extent
$ geojson-extent < file.geojson
```

Given an argument of `leaflet`, this will return Leaflet-formatted data instead.

```sh
$ geojson-extent leaflet < file.geojson
```

## api

### `extent(geojson)`

Given any valid GeoJSON object, return bounds in the form `[WSEN]`.
Invalid objects will return `null`.

### `extent.polygon(geojson)`

Given any valid GeoJSON object, return bounds in the form of a GeoJSON polygon object.
Invalid objects will return `null`.

### `extent.bboxify(geojson)`

Add [bounding boxes](http://geojson.org/geojson-spec.html#bounding-boxes) to all
appropriate GeoJSON objects - Feature, FeatureCollection, and Geometry.

## Publishing

Pull Requests merged to `main` with conventional commit prefixes are automatically published to npm by the `NPM release` GitHub Actions workflow, as new major/minor/patch versions (`feat!:`/`feat:`/`fix:` respectively). When using "Squash and merge", ensure your PR title includes the conventional commit prefix; a `BREAKING CHANGE:` footer only counts if it ends up in the squash commit's body. Other prefixes (`chore:`, `docs:`, etc.) or no prefix don't trigger a release.

Examples:
- `fix: resolved issue with dropdowns` -> patch
- `feat: added dropdowns` -> minor
- `feat!: Overhauled dropdowns` (requires manual migration work) -> major

The workflow builds `geojson-extent.js` and publishes via [npm Trusted Publishing](https://docs.npmjs.com/trusted-publishers/) (OIDC), so no npm token is needed. This requires an npm org admin to configure a trusted publisher for `@mapbox/geojson-extent` (GitHub Actions, workflow `npm-release.yml`, environment `npm-release`), and the `npm-release` GitHub Environment to exist in this repository. After publishing, the workflow creates a GitHub Release with generated notes and comments the released version on the merged PRs.

`package.json`'s `version` may be incremented manually if needed (for example, to skip a minor version), but you shouldn't normally need to touch it; the published npm version, not `package.json`, is the source of truth for what gets released next.

### Pre-release versions on other branches

For testing in downstream projects, you can manually trigger the "NPM release" workflow on a branch to publish a pre-release tagged with the short commit sha (e.g. `1.1.0-aa79c6a`) under the npm `prerelease` dist-tag, without affecting `latest`. Check the workflow results for the published version.
