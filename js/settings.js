function Settings() {
    this.HELPER = new SettingsHelper();
    this.AUTO_SUBMIT_RESOURCE_ID = "autoSubmitResourceId"; 
    this.SAVE_BUTTON = "saveSettings";
}

Settings.prototype = {
    constructor: Settings,

    init: function() {
        var context = this;

        return Promise.all([

            context.HELPER.init()

        ]).then(() => {

            // load data & HTML elements values & states
            context.HELPER.loadDataToElements();

            // register listeners
            context.onSaveAction();

        });
    },

    // save action
    onSaveAction: function() {
        var context = this;
        document
            .getElementById(context.SAVE_BUTTON)
            .addEventListener('click', function() { 
                context.HELPER.loadDataFromElements();
                context.HELPER.closeTab();
            }, false);
    }
}

var settings = new Settings();
settings.init();