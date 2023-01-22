function Settings() {
    this.HELPER = new SettingsHelper();
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
            context.onAddNewEnviroment();
            context.onRemoveEnviroment();

        });
    },

    // save action
    onSaveAction: function() {
        var context = this;
        document
            .getElementById(CONSTANTS.elements.settings.saveAndExitButtonId)
            .addEventListener('click', function() { 
                context.HELPER.loadDataFromElements();
                context.HELPER.closeTab();
            }, false);
    },

    // add another enviroment
    onAddNewEnviroment: function() {
        var context = this;
        document
            .getElementById(CONSTANTS.elements.settings.addNewEnviromentButtonId)
            .addEventListener('click', function() { 
                
            }, false);
    },

    // remove whole enviroment and its configuration
    onRemoveEnviroment: function() {
        var context = this;
        document
            .getElementById(CONSTANTS.elements.settings.dataSourcesSectionId)
            .addEventListener('click', function(event) {
                if (event.target.tagName === "BUTTON") {
                    context.HELPER.removeEnviroment(event.target.id);
                }
            }, false);
    }
}

var settings = new Settings();
settings.init();