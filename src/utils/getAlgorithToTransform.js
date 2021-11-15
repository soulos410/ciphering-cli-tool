const { AtbashTransform} = require("../streams/transform/Atbash");
const { CaesarTransform } = require("../streams/transform/Caesar");

/**
 * Function which helps us to decide which cypher should be returned to pipeline
 * type AlgorithmType = "C" | "R" | "A"
 * @param transformType X: AlgorithmType,
 * @param currentConfig: Array<{ Y: 1 | 0 }>
 * @param inputString: string
 */
const getTransformStreamByConfig = ([transformType, currentConfig]) => {
    switch (transformType) {
        case "C": {
            return new CaesarTransform(!!parseInt(currentConfig, 10), 1);
        }
        case "A": {
            return new AtbashTransform();
        }
        case "R": {
            return new CaesarTransform(!!parseInt(currentConfig, 10), 8);
        }
    }
};

module.exports = { getTransformStreamByConfig };
