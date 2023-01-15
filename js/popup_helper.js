function PopupHelper() {
    this.MESSAGE_UTILS = new MessageUtils();
    this.SETTINGS_UTILS = new SettingsUtils();
    this.SUBMIT_RESOURCE_TEXTFIELD_ID  = "resourceId";
}

PopupHelper.prototype = {
    constructor: PopupHelper, 

    init: function() {
        console.log("PopupHelper - init()");

        return Promise.all([

            this.SETTINGS_UTILS.init()

        ]).then(() => {

            console.log("PopupHelper - init() # all promises loaded");

        }); 
    },

    setAutoSubmit: function(isEnabled) {
        this.SETTINGS_UTILS.save(this.SETTINGS_UTILS.KEYS.autoSubmit, isEnabled);
    },

    getAutoSubmit: function() {
        return this.SETTINGS_UTILS.load(this.SETTINGS_UTILS.KEYS.autoSubmit);
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