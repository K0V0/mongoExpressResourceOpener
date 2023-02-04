function MessageUtils() {
    this.MESSAGE_IDS = {
        SUBMIT_RESOURCE_ID_MESSAGE: 1
    };
}

MessageUtils.prototype = {
    
    createMessage: function(id, message) {
        //TODO check na existenciu ID
        return { id: id, message: message };
    },

    sendMessage: function(id, message) {
        chrome.runtime.sendMessage(this.createMessage(id, message));
    },

    showNotification: function(title, message) {
        chrome.notifications.create("notif", {
            type: "basic",
            iconUrl: "/gfx/icon.png",
            title: title,
            message: message,
            // items: [
            //     { title: "test", message: "test" }
            // ]
        });
    }
}