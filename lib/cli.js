"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _unfluff = _interopRequireDefault(require("./unfluff"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// We use optimist for parsing the CLI arguments
const argvParser = require('optimist').usage('unfluff [OPTIONS] [FILE_NAME]').options({
  version: {
    alias: 'v',
    describe: 'Show version information',
    boolean: true
  },
  help: {
    alias: 'h',
    describe: 'Show this. See: https://github.com/ageitgey/node-unfluff',
    boolean: true
  },
  lang: {
    describe: 'Override language auto-detection. Valid values are en, es, fr, etc.'
  }
});

const {
  argv
} = argvParser;

if (argv.version) {
  const {
    version
  } = require('../package.json');

  process.stdout.write(`${version}\n`);
  process.exit(0);
}

if (argv.help) {
  argvParser.showHelp();
  process.exit(0);
}

let language = undefined;

if (argv.lang) {
  language = argv.lang;
}

const file = argv._.shift();

let html = "";

if (file) {
  html = _fs.default.readFileSync(file).toString();
  process.stdout.write(JSON.stringify((0, _unfluff.default)(html, language)));
} else {
  process.stdin.setEncoding('utf8');
  process.stdin.on('readable', function () {
    const chunk = process.stdin.read();

    if (chunk !== null) {
      return html += chunk;
    }
  });
  process.stdin.on('end', () => process.stdout.write(JSON.stringify((0, _unfluff.default)(html, language))));
}