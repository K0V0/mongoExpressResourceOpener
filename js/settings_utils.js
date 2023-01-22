function SettingsUtils() {
    this.HELPER = new SettingsUtilsHelper();
    this.SETTINGS = {};
}

SettingsUtils.prototype = {
    constructor: SettingsUtils,

    init: function() {
        var context  = this;
        return Promise.all([

            this.loadAllFromStore()

        ]).then(() => {

            context.HELPER.init();
            
        }); 
    },

    //TODO case for querying non-existing setting
    load: function(dotNotationPath) {
        var result = this.SETTINGS[dotNotationPath];  
        if (this.HELPER.isEmpty(result)) {
            result = this.HELPER.getDefaultVaule(dotNotationPath);
        }
        //console.log(result);
        return result;
    },

    save: function(dotNotationPath, value) {
        this.SETTINGS[dotNotationPath] = value;
        chrome.storage.sync.set({ [dotNotationPath]: value });
    },

    loadAllFromStore: function() {
        context = this;
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get(null, resolve);
        })
        .then(items => {
            var allKeysFromStore = Object.keys(items);
            for (keyFromStore of allKeysFromStore) {
                context.SETTINGS[keyFromStore] = items[keyFromStore]; 
            }
        });
    },

}
