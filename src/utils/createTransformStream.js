/**
 * Helper function to create pipeline of transform streams
 * @param transformList: TransformStream[]
 * @param readStream: ReadableStream
 */
const createTransformStream = (transformList, readStream) =>
    transformList.reduce((acc, transform) => {

    return acc.pipe(transform);
}, readStream);

module.exports = { createTransformStream };
