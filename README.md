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

Pull Requests to `main` automatically publish a new version based on the PR's title prefix (`major:`, `minor:` or `patch:`) to the npmjs registry.

The published version in the registry is the source of truth for the package version, but you can manually increment the `package.json`'s `version`.

### Pre-release versions on other branches

For testing in downstream projects, you can manually trigger the "NPM release" workflow on a branch to publish a pre-release tagged with the short commit sha (e.g. `1.1.0-aa79c6a`) under the npm `prerelease` dist-tag, without affecting `latest`. Check the workflow results for the published version.
