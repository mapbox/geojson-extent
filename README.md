![](http://img.shields.io/travis/mapbox/geojson-extent.svg?style=flat)

# geojson-extent

Compute an extent given a GeoJSON object.

## install

    npm install --save geojson-extent

## example

[Live example with Mapbox Static Map API](https://www.mapbox.com/mapbox.js/example/v1.0.0/static-map-from-geojson-with-geo-viewport/)

```js
var geojsonExtent = require('geojson-extent');

geojsonExtent({ type: 'Point', coordinates: [0, 0] }); // returns 0,0,0,0 extent
```

## api

### `extent(geojson)`

Given any valid GeoJSON object, return bounds in the form `[WSEN]`.
Invalid objects will return `null`.
