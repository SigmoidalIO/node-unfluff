"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pythonBridge = _interopRequireDefault(require("python-bridge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PYTHON_INIT_SCRIPT = `
from htmldate import find_date
from lxml import html

def getDate(htmldoc):
    mytree = html.fromstring(htmldoc)

    return find_date(mytree, outputformat='%Y-%m-%d %H:%M')
`;

class PythonAdapter {
  constructor() {
    this._py = new _pythonBridge.default({
      python: 'python3'
    });
  }

  async init() {
    if (this._ready) return;
    await this._py.ex([PYTHON_INIT_SCRIPT]);
    this._ready = true;
  }

  async findDate(htmlDoc) {
    await this.init();
    return this._py`getDate(${htmlDoc})`;
  }

  static get instance() {
    if (!PythonAdapter._instance) PythonAdapter._instance = new PythonAdapter();
    return PythonAdapter._instance;
  }

}

var _default = PythonAdapter;
exports.default = _default;