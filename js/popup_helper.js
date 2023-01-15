function PopupHelper() {
    this.MESSAGE_UTILS = new MessageUtils();
}

PopupHelper.prototype = {
    constructor: PopupHelper, 

    init: function() {
        
    },

    openInNewTab(url) {
        chrome.tabs.create({
            url: url
        });
    }

    
}