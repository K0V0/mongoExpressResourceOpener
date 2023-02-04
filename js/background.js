try {
    importScripts(
        '/js/background_helper.js', 
        '/js/constants.js', 
        '/js/logger.js',
        '/js/logger_helper.js'
    );
} catch (e) {
    console.error(e);
}

function Background() {
    this.LOGGER = new Logger(this);
    this.LOGGER.log("created");
    this.HELPER = new BackgroundHelper();
}

Background.prototype = {
    constructor: Background,

    init: function() {
        var context = this;
        context.LOGGER.log("inited");

        return Promise.all([

            context.HELPER.init()

        ]).then(() => {
            context.LOGGER.log("promises loaded");

            chrome.runtime.onMessage.addListener((request, sender, sendResponse) => { 
                // context.LOGGER.log("message acceepted", request);
                context.messageRouter(request); 
            });

        });
    },

    messageRouter: function(data) {
        switch(data.id) {
            case CONSTANTS.messageRouter.submitResourceId.messageId:
                this.HELPER.checkResourceExistence(
                    data.message[CONSTANTS.messageRouter.submitResourceId.resourceId],
                    data.message[CONSTANTS.messageRouter.submitResourceId.enviroment],
                );
                break;
            case CONSTANTS.messageRouter.submitEnviromentChange.messageId:
                //TODO implement
                break;
        }
    }
   
}

var background = new Background();
background.init();