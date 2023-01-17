function Popup() {
    this.SUBMIT_RESOURCE_BUTTON_ID = "submitResourceId";
    this.AUTO_SUBMIT_RESOURCE_ID = "autoSubmitResourceId"; 
    this.SETTINGS_BUTTON = "goToOptions";
    this.HELPER = new PopupHelper();
}
  
Popup.prototype = {
    constructor: Popup,
  
    // runs on every popup open
    init: function() {
        var context = this;

        Promise.all([
            
            context.HELPER.init(),
            
        ]).then(() => {

            // settings, load states of HTML elements
            context.loadAutoSubmitState();
            context.loadCurrentEnviroment();

            // event listeners registration
            context.onResourceIdSubmited();
            context.onResourceIdPasted();
            context.onAutoSubmitChanged();
            context.onEnviromentChanged();
            context.onSettingsOpened();

        });   
    },

    // checkbox for autosubmitting setting state
    loadAutoSubmitState: function() {
        document
            .getElementById(this.AUTO_SUBMIT_RESOURCE_ID)
            .checked = this.HELPER.getAutoSubmit();
    },

    //TODO load current dataset (enviroment) user
    loadCurrentEnviroment: function() {

    },

    // submitting by button
    onResourceIdSubmited: function() {
        var context = this;
        document
            .getElementById(context.SUBMIT_RESOURCE_BUTTON_ID)
            .addEventListener('click', function() { context.HELPER.sendResourceIdToBackgroundScriptFromTextfield(); }, false);
    },

    // changing settings for auto submission when data pasted anywhere in popup not just textfield
    onAutoSubmitChanged: function() {
        var context = this;
        document
            .getElementById(context.AUTO_SUBMIT_RESOURCE_ID)
            .addEventListener('change', function() { context.HELPER.setAutoSubmit(this.checked); }, false);
    },

    //submits clipboard content taken from clipboard on extension popup open
    onResourceIdPasted: function() {
        var context = this;
        if (context.HELPER.getAutoSubmit()) {
            document
                .getElementsByTagName('html')[0]
                .addEventListener('paste', function(event) { context.HELPER.sendResourceIdToBackgroundScriptFromPaste(event) });
        }
    },

    // open extension settings page
    onSettingsOpened: function() {
        var context = this;
        document
            .getElementById(context.SETTINGS_BUTTON)
            .addEventListener('click', function() { context.HELPER.openSettings(); }, false);
    },

    //TODO change enviroment settings
    onEnviromentChanged: function() {

    }

}

var popup = new Popup();
popup.init();

