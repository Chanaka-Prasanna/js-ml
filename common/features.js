const features = {};

// Define functions and export them
features.getPathCount = (paths) => {
    return paths.length;
}

features.getPointCount = (paths) => {
    const points = paths.flat();
    return points.length;
}

// Export the features object
if (typeof module !== 'undefined') {
    module.exports = features;
}
