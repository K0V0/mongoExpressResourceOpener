function SettingsHelper() {
    this.SETTINGS_UTILS = new SettingsUtils();
    this.DATASOURCES_SECTION = "dataSources";
    this.DATASOURCE_CONTAINER_ELEMENT = "article"
    this.DATASOURCE_ENVIROMENT_NAME_ELEMENT = "input[type=text]";
    this.DATASOURCE_ENVIROMENT_ID_ELEMENT = "input[type=hidden]";
    this.DATASOURCE_SETS_ELEMENT = "textarea";
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
        data[CONSTANTS.settings.dotNotationPaths.autoSubmitSettings] = document
            .getElementById(CONSTANTS.elements.settings.autoSubmitResourceCheckboxId)
            .checked;

        // datasource(s) for enviroments
        var dataSources = [];
        document
            .getElementById(context.DATASOURCES_SECTION)
            .querySelectorAll(context.DATASOURCE_CONTAINER_ELEMENT)
            .forEach(element => {
                dataSources.push({
                    [CONSTANTS.settings.dotNotationPaths.dataSourcesEnviroment]:
                        element.querySelector(context.DATASOURCE_ENVIROMENT_ID_ELEMENT).value,
                    [CONSTANTS.settings.dotNotationPaths.dataSourcesEnviromentName]: 
                        element.querySelector(context.DATASOURCE_ENVIROMENT_NAME_ELEMENT).value,
                    [CONSTANTS.settings.dotNotationPaths.dataSourceUrls]: 
                        context.processDatasetFromElement(
                            element.querySelector(context.DATASOURCE_SETS_ELEMENT).value
                        )
                });
            });
        data[CONSTANTS.settings.dotNotationPaths.dataSources] = dataSources;

        // save to store
        context.saveData(data);
    },

    loadDataToElements: function() {
        var context = this;

        // auto submit setting checkbox
        var autoSubmit = this.SETTINGS_UTILS.load(CONSTANTS.settings.dotNotationPaths.autoSubmitSettings);
        document.getElementById(CONSTANTS.elements.settings.autoSubmitResourceCheckboxId).checked = autoSubmit;

        //TODO currently suporting only one enviroment
        // load dataSets (mongo URLs)
        var enviromentConfigs = this.SETTINGS_UTILS.load(CONSTANTS.settings.dotNotationPaths.dataSources);

        for (var i = 0; i < enviromentConfigs.length; i++) {
            var dataSets =  enviromentConfigs[i][CONSTANTS.settings.dotNotationPaths.dataSourceUrls];
            var enviromentId = enviromentConfigs[i][CONSTANTS.settings.dotNotationPaths.dataSourcesEnviroment];
            var enviromentName = enviromentConfigs[i][CONSTANTS.settings.dotNotationPaths.dataSourcesEnviromentName];

            if (i > 0) {
                //TODO duplicate existing section and pass values and pass to view
            }

            // enviroment ID
            document.getElementById("dataSetsEnviromentId_" + i).value = enviromentId;
            // enviroment title
            document.getElementById("dataSetsEnviroment_" + i).value = enviromentName;
            // textarea with data set urls
            document.getElementById("dataSets_" + i).value = context.processDatasetFromStore(dataSets);
        }
    },

    saveData: function(data) {
        for (key of Object.keys(data)) {
            this.SETTINGS_UTILS.save(key, data[key]);
        }
    },

    closeTab: function() {
        chrome.tabs.getCurrent(function(tab) {
            chrome.tabs.remove(tab.id, function() { });
        });
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