function PopupHelper() {
    this.MESSAGE_UTILS = new MessageUtils();
    this.SETTINGS_UTILS = new SettingsUtils();
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
        this.SETTINGS_UTILS.save(CONSTANTS.settings.dotNotationPaths.autoSubmitSettings, isEnabled);
    },

    getAutoSubmit: function() {
        return this.SETTINGS_UTILS.load(CONSTANTS.settings.dotNotationPaths.autoSubmitSettings);
    },

    generateOptionsForEnviromentSelect: function() {
        var options = [];
        this.SETTINGS_UTILS
            .load(CONSTANTS.settings.dotNotationPaths.dataSources)
            .map(dataSource => new Option(
                    dataSource[CONSTANTS.settings.dotNotationPaths.dataSourcesEnviromentName], 
                    dataSource[CONSTANTS.settings.dotNotationPaths.dataSourcesEnviroment]
                )
            )
            .forEach(option => options.push(option))
        return options;
    },

    getCurrentEnviromentId: function() {
        return this.SETTINGS_UTILS.load(CONSTANTS.settings.dotNotationPaths.currentEnviroment);
    },

    openSettings: function() {
        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            window.open(chrome.runtime.getURL(CONSTANTS.elements.settings.url));
        }
    },

    sendResourceIdToBackgroundScriptFromTextfield: function() {
        this.sendResourceIdToBackgroundScript(
            document.getElementById(CONSTANTS.elements.popup.submitResourceTextfieldId).value
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
            CONSTANTS.messageRouter.submitResourceId,
            resourceId
        );
    }

}