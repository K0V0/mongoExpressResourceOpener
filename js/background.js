try {
    importScripts('/js/background_helper.js', '/js/constants.js');
} catch (e) {
    console.error(e);
}

function Background() {
    this.HELPER = new BackgroundHelper();
}

Background.prototype = {
    constructor: Background,

    init: function() {
        var context = this;

        return Promise.all([

            context.HELPER.init()

        ]).then(() => {

            chrome.runtime.onMessage.addListener((request, sender, sendResponse) => { 
                context.messageRouter(request); 
            });

        });
    },

    messageRouter: function(data) {
        switch(data.id) {
            case CONSTANTS.messageRouter.submitResourceId.messageId:
                this.HELPER.checkResourceExistence(data.message);
                break;
        }
    }
   
}

var background = new Background();
background.init();