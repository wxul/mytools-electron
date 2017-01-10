let debug = process.env.NODE_ENV == "development";

export default {
    DEBUG: debug,
    log() {
        if (debug) {
            console.log(...arguments);
        }
    }
};