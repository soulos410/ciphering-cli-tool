const {Transform} = require("stream");
const {alphabet} = require("../../constants");
const {isLowercaseLetter} = require("../../utils/isLowerCase");

/**
 * Caesar cypher transform function
 * @param isEncode: boolean
 * @param inputString: string
 * @param shift: number
 * @return string
 */
const transformByCaesar = (isEncode, inputString, shift) => {
    const alphabetLength = alphabet.length;
    const transformedShift = isEncode ? +shift : -shift;

    return inputString
        .split("")
        .map((letter) => {
                if (!alphabet.includes(letter.toLowerCase())) {
                    return letter;
                }

                let letterIndex = alphabet.indexOf(letter.toLowerCase()) + transformedShift;

                if (letterIndex < 0) {
                    letterIndex = alphabetLength + letterIndex;
                }

                return isLowercaseLetter(letter)
                    ? alphabet[letterIndex % alphabetLength]
                    : alphabet[letterIndex % alphabetLength].toUpperCase()
            }
        )
        .join("")
};

/**
 * Transform Stream for caesar cypher
 */
class CaesarTransform extends Transform {
    constructor(isEncode, shift) {
        super();

        this.isEncode = isEncode;
        this.shift = shift;
    }

    push(chunk, encoding) {
        return super.push(chunk, encoding);
    }

    _transform(chunk, encoding, callback) {
        const chunkString = chunk.toString();

        const transformedString = transformByCaesar(this.isEncode, chunkString, this.shift);

        this.push(transformedString);
    }
}

module.exports = {transformByCaesar, CaesarTransform};
