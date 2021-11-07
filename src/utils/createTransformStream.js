/**
 * Helper function to create pipeline of transform streams
 * @param transformList: TransformStream[]
 * @param readStream: ReadableStream
 */
const createTransformStream = (transformList, readStream) =>
    transformList.reduce((acc, transform) => {
    acc.pipe(transform);

    return acc;
}, readStream);

module.exports = { createTransformStream };
