function LoggerHelper() {

}

LoggerHelper.prototype = {
    constructor: LoggerHelper,

    init: {

    },

    capitalize: function(text) {
        if (text === undefined || text === null || text.length == 0) {
            return "";
        }
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
}