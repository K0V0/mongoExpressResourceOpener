function SettingsHelper() {
    this.LOGGER = new Logger(this);
    this.LOGGER.log("created");
    this.SETTINGS_UTILS = new SettingsUtils();
    this.DATASOURCE_CONTAINER_ELEMENT = "article"
    this.DATASOURCE_ENVIROMENT_NAME_ELEMENT = "input[type=text]";
    this.DATASOURCE_ENVIROMENT_ID_ELEMENT = "input[type=hidden]";
    this.DATASOURCE_SETS_ELEMENT = "textarea";
    this.DATASOURCE_REMOVE_BUTTON = "button";
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
            .getElementById(CONSTANTS.elements.settings.dataSourcesSectionId)
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

        // currently selected enviroment dropdown
        // load available options
        

        // preselect currently used
        var currentEnviroment = this.SETTINGS_UTILS.load(CONSTANTS.settings.dotNotationPaths.currentEnviroment);
        document.getElementById(CONSTANTS.elements.settings.activeEnviroment).value = currentEnviroment;

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

    addEnviroment: function() {
        var context = this;
        var enviromentsContainer = document
            .getElementById(CONSTANTS.elements.settings.dataSourcesSectionId)
        var enviroments = enviromentsContainer
            .getElementsByTagName(context.DATASOURCE_CONTAINER_ELEMENT);
        var enviromentsCount = enviroments.length;
        enviroments[enviromentsCount-1].after(context.duplicateEnviroment(
            enviroments[0], context.getNextEnviromentId(enviroments)));
    },

    removeEnviroment: function(containerElemId) {
        var context = this;
        var enviromentsCount = document
            .getElementById(CONSTANTS.elements.settings.dataSourcesSectionId)
            .getElementsByTagName(context.DATASOURCE_CONTAINER_ELEMENT)
            .length;
        if (enviromentsCount < 2) {
            //TODO do not remove last enviroment configuration, just clean it or set default
        } else {
            //TODO implement
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
    },

    duplicateEnviroment: function(enviromentContainerElement, number) {

    },

    getNextEnviromentId: function(enviromentContainerElements) {
        var result = 0;
        var context = this;
        for (enviromentContainerElement of enviromentContainerElements) {
            var id = parseInt(enviromentContainerElement
                .querySelector(context.DATASOURCE_ENVIROMENT_NAME_ELEMENT)
                .id.replace(/\D+/, ""));
            if (id > result) {
                result = id;
            }
        }
        return result + 1;
    }
}