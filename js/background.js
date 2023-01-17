try {
    importScripts('/js/background_helper.js');
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
            case this.HELPER.MESSAGE_UTILS.MESSAGE_IDS.SUBMIT_RESOURCE_ID_MESSAGE:
                this.HELPER.checkResourceExistence(data.message);
                break;
        }
    }
   
}

var background = new Background();
background.init();