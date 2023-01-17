function SettingsUtils() {

    this.KEYS = {
        autoSubmit: "autoSubmit",
        dataSources: "dataSources"
    }

    this.SETTINGS = {
        [this.KEYS.autoSubmit]: { default: false },
        [this.KEYS.dataSources]: { default: [] }
    } 
}

SettingsUtils.prototype = {
    constructor: SettingsUtils,

    init: function() {
        return Promise.all([

            this.loadAllFromStore()

        ]).then(() => {
            
        }); 
    },

    //TODO case for querying non-existing setting
    load: function(key) {
        var result = this.SETTINGS[key].current;        
        if (result === undefined || result === null) {
            result = this.SETTINGS[key].default;
        }
        return result;
    },

    save: function(key, value) {
        this.SETTINGS[key].current = value;
        chrome.storage.sync.set({ [key]: value });
    },

    loadAllFromStore: function() {
        context = this;
        var keys = Object.keys(this.SETTINGS);
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get(keys, resolve);
        })
        .then(items => {
            var allKeysFromStore = Object.keys(items);
            for (keyFromStore of allKeysFromStore) {
                context.SETTINGS[keyFromStore].current = items[keyFromStore]; 
            }
        });
    }
}
