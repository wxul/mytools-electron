var uglifyjs = require('uglify-js');

export default {
    txt(val) {
        return uglifyjs.minify(val, {
            fromString: true
        }).code;
    },
    file(filearr = []) {
        console.log(filearr);
    }
}