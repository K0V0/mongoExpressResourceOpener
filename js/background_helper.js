try {
    importScripts('/js/message_utils.js', '/js/settings_utils.js');
} catch (e) {
    console.error(e);
}

function BackgroundHelper() {
    this.MESSAGE_UTILS = new MessageUtils();
    this.SETTINGS_UTILS = new SettingsUtils();
    this.DATASETS = [];
}

BackgroundHelper.prototype = {
    constructor: BackgroundHelper,

    init: function() {
        var context = this;

        return Promise.all([

            context.SETTINGS_UTILS.init()

        ]).then(() => {
            
            context.loadDataSets();

        });
    },
    
    checkResourceExistence: function(resourceId) {
        if (resourceId === undefined || resourceId === null || resourceId.trim() === "") {
            return;
        }

        var context = this;
        var promises = [];

        for (var i = 0; i < this.DATASETS.length; i++) {
            promises[i] = fetch(context.buildUrl(this.DATASETS[i], resourceId));
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
                        if (!context.DATASETS.includes(response.value.url)) {
                            context.openNewTab(response.value.url);
                            statuses.push(true);
                        } else {
                            statuses.push(false);
                        }
                    }
                });
                if (statuses.every((value) => value === false)) {
                    context.notFoundMessage();
                }
            })
            .catch(error => {
                context.notFoundMessage();
            });
    },

    openNewTab: function(url) {
        chrome.tabs.create({ url: url });
    },

    notFoundMessage: function() {
        //TODO vratit pouzivatelovi nieco rozumne ze vsetko je zle
    },
    
    loadDataSets: function() {
        //TODO only supported one enviroment yet
        this.DATASETS = this.SETTINGS_UTILS.load(this.SETTINGS_UTILS.KEYS.dataSources)[0]['dataSets'];
    },

    buildUrl: function(datasetUrl, resourceId) {
        return datasetUrl + "/\"" + resourceId + "\"";
    }
}