const { Transform } = require("stream");
const { alphabet } = require("../../constants");
const { isLowercaseLetter } = require("../../utils/isLowerCase");

/**
 * Atbash cypher transform function
 * @param inputString: string
 * @returns {string}
 */
const transformByAtbash = (inputString) => {
  const alphabetLength = alphabet.length;

  return inputString
    .split("")
    .map((letter) => {
        if (!alphabet.includes(letter.toLowerCase())) {
          return letter;
        }

        return isLowercaseLetter(letter)
          ? alphabet[alphabetLength - (alphabet.indexOf(letter) + 1)]
          : alphabet[alphabetLength - (alphabet.indexOf(letter.toLowerCase()) + 1)].toUpperCase()
      }
    )
    .join("");
};

/**
 * Transform stream for Atbash cypher
 */
class AtbashTransform extends Transform {

  _transform(chunk, encoding, callback) {
    const chunkString = chunk.toString();

    const transformedString = transformByAtbash(chunkString);

    this.push(transformedString);

    callback();
  }
}

module.exports = { AtbashTransform};
