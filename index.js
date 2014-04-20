var normalize = require('geojson-normalize'),
    flatten = require('flatten'),
    extent = require('extent');

module.exports = function(_) {
    var gj = normalize(_);

    // boundaries: null input, no features, no features
    // with geometry.
    if (!gj || !gj.features.length || !gj.features.some(function(feature) {
        return feature.geometry;
    })) return null;

    var bbox = [Infinity, Infinity, -Infinity, -Infinity],
        ext = extent();

    for (var i = 0; i < gj.features.length; i++) {
        if (!gj.features[i].geometry) continue;
        ext.union(geometryBounds(gj.features[i].geometry));
    }

    return ext.bbox();
};

function geometryBounds(_) {
    if (!_.type) return null;
    var ext = extent();
    if (_.type === 'GeometryCollection') {
        _.geometries.forEach(function(geom) {
            ext.union(geometryBounds(geom));
        });
        return ext.bbox();
    }
    var depth = arrayDepth(_.coordinates),
        coords = depth === 0 ?
            [_.coordinates] :
            depth > 1 ?
            flatten(_.coordinates, arrayDepth(_.coordinates) - 1) :
            _.coordinates;
    coords.forEach(function(coord) {
        ext.include(coord);
    });
    return ext.bbox();
}

function arrayDepth(_) {
    if (typeof _[0] == 'number') { return 0; }
    if (typeof _[0] == 'object' && typeof _[0][0] == 'number') { return 1; }
    if (typeof _[0] == 'object' &&
        typeof _[0][0] == 'object' &&
        typeof _[0][0][0] == 'number') { return 2; }
    if (typeof _[0] == 'object' &&
        typeof _[0][0] == 'object' &&
        typeof _[0][0][0] == 'object' &&
        typeof _[0][0][0][0] == 'number') { return 3; }
}
