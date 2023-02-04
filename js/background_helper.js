try {
    importScripts(
        '/js/message_utils.js',
        '/js/settings_utils_helper.js',
        '/js/settings_utils.js',
        '/js/constants.js',
        '/js/logger.js',
        '/js/logger_helper.js'
    );
} catch (e) {
    console.error(e);
}

function BackgroundHelper() {
    this.LOGGER = new Logger(this);
    this.LOGGER.log("created");
    this.MESSAGE_UTILS = new MessageUtils();
    this.SETTINGS_UTILS = new SettingsUtils();
    this.MONGO_ENVIROMENTS = [];
}

BackgroundHelper.prototype = {
    constructor: BackgroundHelper,

    init: function() {
        var context = this;
        context.LOGGER.log("inited");

        return Promise.all([

            context.SETTINGS_UTILS.init()

        ]).then(() => {
            context.LOGGER.log("promises loaded");
            
            context.loadEnviroments();

        });
    },
    
    checkResourceExistence: function(resourceId, enviromentId) {
        if (resourceId === undefined || resourceId === null || resourceId.trim() === "") {
            return;
        }

        var context = this;
        var promises = [];
        var dataSets = this.getEnviromentDataSets(enviromentId);

        // TODO zamysliet sa nad funkcionalitiou v buducnosti, ci nechcem odpalovat aj na viac prostredi naraz
        for (var i = 0; i < dataSets.length; i++) {
            promises[i] = fetch(context.buildUrl(dataSets[i], resourceId));
        }

        //TODO zamysliet sa nad problematikou ci chcem odpalovat requesty na vsetky datasety ak v nejakom uz bol najdeny daky zaznam.
        //TODO spustane asynchronne - zamysliet sa nad tym, ci by pripadna interupcia pri vrateni prveho vysledku nenastala az potom 
        //  co budu odpalene uz vsetky requesty.
        //  Pripadne ci ma cenu implementacia kedy sa request na nasledujuci dataset spusta az po vrateni vysledku z predchadzajuceho.
        Promise.allSettled(promises)
            .then((responses) => {
                statuses = [];
                responses.forEach(function(response) {
                    if(response.value === undefined || response.value.status !== 200) {
                        statuses.push(false);
                    } else {
                        // pretoze mongo presmeruje a otvori index vsetkych ulozenych resources
                        if (!dataSets.includes(response.value.url)) {
                            context.openNewTab(response.value.url);
                            statuses.push(true);
                        } else {
                            statuses.push(false);
                        }
                    }
                });
                if (statuses.every((value) => value === false)) {
                    context.notFoundMessage(resourceId, enviromentId);
                    console.log("Nothing found for resource with ID: " + resourceId);
                }
            })
            .catch(error => {
                context.notFoundMessage();
                console.log("Error occured when trying to found resource with ID: " + resourceId);
            });
    },

    openNewTab: function(url) {
        chrome.tabs.create({ url: url });
    },

    notFoundMessage: function(resourceId, enviromentId) {
        this.MESSAGE_UTILS.showNotification(
            "Nemožno nájsť resource",
            resourceId + " na prostredí " + enviromentId
        );
    },
    
    loadEnviroments: function() {
        this.MONGO_ENVIROMENTS = this.SETTINGS_UTILS.load(CONSTANTS.settings.dotNotationPaths.dataSources);
    },

    getEnviromentDataSets: function(enviromentId) {
        for (var i = 0; i < this.MONGO_ENVIROMENTS.length; i++) {
            if (this.MONGO_ENVIROMENTS[i][CONSTANTS.settings.dotNotationPaths.dataSourcesEnviroment] == enviromentId) {
                return this.MONGO_ENVIROMENTS[i][CONSTANTS.settings.dotNotationPaths.dataSourceUrls];
            }
        }
    },

    buildUrl: function(datasetUrl, resourceId) {
        return datasetUrl + "/\"" + resourceId + "\"";
    }
}