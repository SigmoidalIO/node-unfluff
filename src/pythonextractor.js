//@flow
import { readFileSync } from 'fs';
import pythonBridge from 'python-bridge';

const PYTHON_INIT_SCRIPT = readFileSync("./src/getDate.py", "utf-8");

class PythonAdapter {
    static _instance: PythonAdapter;
    _py: pythonBridge.PythonBridge;
    _ready: boolean;
    constructor() {
        this._py = pythonBridge({
            python: 'python3',
       //.     env: {PYTHONPATH: '/foo/bar'} 
        });
    }

    async init() {
        if (this._ready)
            return;
        await this._py.ex(PYTHON_INIT_SCRIPT);
        this._ready = true;
    }

    async findDate(htmlDoc: string) {
        await this.init();
        return this._py`getDate(${htmlDoc})`;
    }

    static get instance() {
        if (!PythonAdapter._instance)
            PythonAdapter._instance = new PythonAdapter();
        return PythonAdapter._instance; 
    }
}

export default PythonAdapter;