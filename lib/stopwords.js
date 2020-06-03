"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let stopwords;
const cache = {};

const getFilePath = language => _path.default.join(__dirname, "..", "data", "stopwords", `stopwords-${language}.txt`); // Given a language, loads a list of stop words for that language
// and then returns which of those words exist in the given content


var _default = stopwords = function (content, language) {
  let stopWords;

  if (language == null) {
    language = 'en';
  }

  let filePath = getFilePath(language);

  if (!_fs.default.existsSync(filePath)) {
    console.error(`WARNING: No stopwords file found for '${language}' - defaulting to English!`);
    filePath = getFilePath('en');
  }

  if (cache.hasOwnProperty(language)) {
    stopWords = cache[language];
  } else {
    stopWords = _fs.default.readFileSync(filePath).toString().split('\n').filter(s => s.length > 0);
    cache[language] = stopWords;
  }

  const strippedInput = removePunctuation(content);
  const words = candiateWords(strippedInput);
  const overlappingStopwords = [];
  let count = 0;

  _lodash.default.each(words, function (w) {
    count += 1;

    if (stopWords.indexOf(w.toLowerCase()) > -1) {
      return overlappingStopwords.push(w.toLowerCase());
    }
  });

  return {
    wordCount: count,
    stopwordCount: overlappingStopwords.length,
    stopWords: overlappingStopwords
  };
};

exports.default = _default;

var removePunctuation = content => content.replace(/[\|\@\<\>\[\]\"\'\.,-\/#\?!$%\^&\*\+;:{}=\-_`~()]/g, "");

var candiateWords = strippedInput => strippedInput.split(' ');