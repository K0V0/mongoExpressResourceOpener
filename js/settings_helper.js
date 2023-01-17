function SettingsHelper() {
    this.SETTINGS_UTILS = new SettingsUtils();
    this.AUTO_SUBMIT_RESOURCE_ID = "autoSubmitResourceId";
    this.DATASOURCES_SECTION = "dataSources";
    this.DATASOURCE_CONTAINER_ELEMENT = "article"
    this.DATASOURCE_ENVIROMENT_ELEMENT = "input[type=text]";
    this.DATASOURCE_SETS_ELEMENT = "textarea";
    
    this.KEYS = {
        enviroment: "enviroment",
        dataSets: "dataSets"
    }
}

SettingsHelper.prototype = {
    constructor: SettingsHelper,

    init: function() {
        var context = this;

        return Promise.all([

            context.SETTINGS_UTILS.init()

        ]).then(() => {

        });
    },

    loadDataFromElements: function() {
        var context = this;
        var data = {};

        // submit on paste
        data[context.SETTINGS_UTILS.KEYS.autoSubmit] = document
            .getElementById(context.AUTO_SUBMIT_RESOURCE_ID)
            .checked;

        // datasource(s) for enviroments
        var dataSources = [];
        document
            .getElementById(context.DATASOURCES_SECTION)
            .querySelectorAll(context.DATASOURCE_CONTAINER_ELEMENT)
            .forEach(element => {
                dataSources.push({
                    [context.KEYS.enviroment]: 
                        element.querySelector(context.DATASOURCE_ENVIROMENT_ELEMENT).value,
                    [context.KEYS.dataSets]: 
                        context.processDatasetFromElement(
                            element.querySelector(context.DATASOURCE_SETS_ELEMENT).value
                        )
                });
            });
        data[context.SETTINGS_UTILS.KEYS.dataSources] = dataSources;

        // save to store
        context.saveData(data);
    },

    loadDataToElements: function() {
        var context = this;

        // auto submit setting checkbox
        var autoSubmit = context.SETTINGS_UTILS.load(context.SETTINGS_UTILS.KEYS.autoSubmit);
        document.getElementById(context.AUTO_SUBMIT_RESOURCE_ID).checked = autoSubmit;

        //TODO currently suporting only one enviroment
        var dataSet = context.SETTINGS_UTILS.load(context.SETTINGS_UTILS.KEYS.dataSources)[0][context.KEYS.dataSets];
        if (dataSet !== undefined) {
            document.getElementById("dataSets_0").value = context.processDatasetFromStore(dataSet);
        }
    },

    saveData: function(data) {
        for (key of Object.keys(data)) {
            this.SETTINGS_UTILS.save(key, data[key]);
        }
    },

    processDatasetFromElement: function(elementContent) {
        var result = [];
        elementContent.split("\n")
            .map(dataset => dataset.trim())
            .filter(dataset => dataset != '')
            .forEach(dataset => {
                result.push(dataset);
            });
        return result;
    },
    
    processDatasetFromStore: function(storeContent) {
        return storeContent.join("\n");
    }
}