//@flow
const fs = require("fs");
import pythonBridge from 'python-bridge';


const PYTHON_SCRIPT = fs.readFile("./src/getDate.py", "utf8", function(error, data) {
    if (error) throw error;
    return data.toString();
});

class PythonAdapter {
    _py: pythonBridge.PythonBridge;
    constructor() {
        this._py = pythonBridge({
            python: 'python3',
       //.     env: {PYTHONPATH: '/foo/bar'} 
        });

        this._py.ex(PYTHON_SCRIPT);

    }

    async find_date(htmlDoc: string) {
        return this._py`getDate(${htmlDoc})`;
    }

}


export default {
    date(doc) {
        const python = new PythonAdapter();
        return python.find_date(doc).then(x=>{console.log(`MAMY TO ${x}`); return x;});
    }
}

// export default PythonAdapter;