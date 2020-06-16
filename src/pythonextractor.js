//@flow
import PythonBridge from 'python-bridge';

const PYTHON_INIT_SCRIPT = `
from htmldate import find_date
from lxml import html

def getDate(htmldoc):
    mytree = html.fromstring(htmldoc)

    return find_date(mytree, outputformat='%Y-%m-%d %H:%M')
`

class PythonAdapter {
    static _instance: PythonAdapter;
    _py: PythonBridge.PythonBridge;
    _ready: boolean;
    constructor() {
        this._py = new PythonBridge({
            python: 'python3',
        });
    }

    async init() {
        if (this._ready)
            return;
        await this._py.ex([PYTHON_INIT_SCRIPT]);
        this._ready = true;
    }

    async findDate(htmlDoc: string) {
        await this.init();
        return this._py`getDate(${htmlDoc})`;
    }

    async destroy() {
        await this._py.end();
    }

    static get instance() {
        if (!PythonAdapter._instance)
            PythonAdapter._instance = new PythonAdapter();
        return PythonAdapter._instance; 
    }
}

export default PythonAdapter;