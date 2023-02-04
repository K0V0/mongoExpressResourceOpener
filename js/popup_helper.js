function PopupHelper() {
    this.LOGGER = new Logger(this);
    this.LOGGER.log("created");
    this.MESSAGE_UTILS = new MessageUtils();
    this.SETTINGS_UTILS = new SettingsUtils();
}

PopupHelper.prototype = {
    constructor: PopupHelper, 

    init: function() {
        var context = this;
        context.LOGGER.log("inited");
        
        return Promise.all([

            context.SETTINGS_UTILS.init()

        ]).then(() => {
            context.LOGGER.log("promises loaded");

        }); 
    },

    // NOTE logic of get and set actions
    // get - get from settings and update element
    // set - get from element and update settings  

    // auto submit checkbox actions
    setAutoSubmit: function(isEnabled) {
        this.SETTINGS_UTILS.save(CONSTANTS.settings.dotNotationPaths.autoSubmitSettings, isEnabled);
    },

    getAutoSubmit: function() {
        return this.SETTINGS_UTILS.load(CONSTANTS.settings.dotNotationPaths.autoSubmitSettings);
    },

    // enviroment select dropdown menu actions
    getOptionsForEnviromentSelect: function() {
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

    setCurrentEnviromentId: function() {
        console.log("cyka blyat");
    },

    // go to settings button actions
    openSettings: function() {
        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            window.open(chrome.runtime.getURL(CONSTANTS.elements.settings.url));
        }
    },

    // open resourceId button actions
    sendResourceIdToBackgroundScriptFromTextfield: function() {
        this.sendResourceIdToBackgroundScript(
            document.getElementById(CONSTANTS.elements.popup.submitResourceTextfieldId).value
        );
    },

    // open resource by pasting anywhere into popup actions
    sendResourceIdToBackgroundScriptFromPaste: function(event) {
        clipboardData = event.clipboardData || window.clipboardData;
        this.sendResourceIdToBackgroundScript(
            clipboardData.getData('Text')
        );
    }, 

    // other utility stuff
    sendResourceIdToBackgroundScript: function(resourceId) {
        this.MESSAGE_UTILS.sendMessage(
            CONSTANTS.messageRouter.submitResourceId.messageId,
            {
                [CONSTANTS.messageRouter.submitResourceId.enviroment]:  
                    document
                        .getElementById(CONSTANTS.elements.popup.selectEnviromentConfig)
                        .value,
                [CONSTANTS.messageRouter.submitResourceId.resourceId]:
                    resourceId
            }
        );
    }

}