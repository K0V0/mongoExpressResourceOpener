function PopupHelper() {
    this.MESSAGE_UTILS = new MessageUtils();
    this.SETTINGS_UTILS = new SettingsUtils();
    this.SUBMIT_RESOURCE_TEXTFIELD_ID  = "resourceId";
}

PopupHelper.prototype = {
    constructor: PopupHelper, 

    init: function() {
        var context = this;
        
        return Promise.all([

            context.SETTINGS_UTILS.init()

        ]).then(() => {

        }); 
    },

    setAutoSubmit: function(isEnabled) {
        this.SETTINGS_UTILS.save(this.SETTINGS_UTILS.KEYS.autoSubmit, isEnabled);
    },

    getAutoSubmit: function() {
        return this.SETTINGS_UTILS.load(this.SETTINGS_UTILS.KEYS.autoSubmit);
    },

    openSettings: function() {
        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            window.open(chrome.runtime.getURL('html/settings.html'));
        }
    },

    sendResourceIdToBackgroundScriptFromTextfield: function() {
        this.sendResourceIdToBackgroundScript(
            document.getElementById(this.SUBMIT_RESOURCE_TEXTFIELD_ID).value
        );
    },

    sendResourceIdToBackgroundScriptFromPaste: function(event) {
        clipboardData = event.clipboardData || window.clipboardData;
        this.sendResourceIdToBackgroundScript(
            clipboardData.getData('Text')
        );
    }, 

    sendResourceIdToBackgroundScript: function(resourceId) {
        this.MESSAGE_UTILS.sendMessage(
            this.MESSAGE_UTILS.MESSAGE_IDS.SUBMIT_RESOURCE_ID_MESSAGE,
            resourceId
        );
    }

}