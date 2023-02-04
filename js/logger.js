function Logger(context) {
    this.HELPER = new LoggerHelper();
    this.CONTEXT = context;
    //TODO a TOTEST
    this.IS_DEVEL = true;
}

Logger.prototype = {
    constructor: Logger,

    log: function(text, obj, localContext) {
        if (!this.IS_DEVEL) {
            return;
        }
        var textResult = "";
        if (localContext !== undefined) {
            textResult += " # " + this.HELPER.capitalize(localContext.constructor.name);
        }
        if (text !== undefined) {
            textResult += " :: " + text;
        }
        if (textResult.length > 0) {
            textResult = this.HELPER.capitalize(this.CONTEXT.constructor.name) + textResult;
            console.log(textResult);
        }
        if (obj !== undefined) {
            console.log(obj);
        }
    },
}