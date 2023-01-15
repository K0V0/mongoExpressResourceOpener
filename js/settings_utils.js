function SettingsUtils() {
    console.log("SettingsUtils");

    this.KEYS = {
        autoSubmit: "autoSubmit"
    }

    this.SETTINGS = {
        [this.KEYS.autoSubmit]: { default: false, current: null }
    } 
}

SettingsUtils.prototype = {
    constructor: SettingsUtils,

    init: function() {
        console.log("SettingsUtils - init()");
        return Promise.all([

            this.loadAllFromStore()

        ]).then(() => {
            
            console.log("SettingsUtils - init() # all promises loaded");

        }); 
    },

    //TODO case for querying non-existing setting
    load: function(key) {
        console.log("SettingsUtils - load(" + key + ")");
        var result = this.SETTINGS[key].current;        
        if (result === undefined || result === null) {
            result = this.SETTINGS[key].default;
        }
        console.log("return: " + result);
        return result;
    },

    save: function(key, value) {
        console.log("SettingsUtils - save(" + key + ", " + value + ")");
        this.SETTINGS[key].current = value;
        chrome.storage.sync.set({ [key]: value });
    },

    loadAllFromStore: function() {
        console.log("SettingsUtils - loadAllFromStore()");
        context = this;
        var keys = Object.keys(this.SETTINGS);
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get(keys, resolve);
        })
        .then(items => {
            var allKeysFromStore = Object.keys(items);
            for (keyFromStore of allKeysFromStore) {
                console.log("SettingsUtils - loadAllFromStore() # assign key value " + keyFromStore + ":" + items[keyFromStore]);
                context.SETTINGS[keyFromStore].current = items[keyFromStore]; 
            }
        });
    }
}
