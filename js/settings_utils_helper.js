function SettingsUtilsHelper() {
    this.LOGGER = new Logger(this);
    this.LOGGER.log("created");

    // default in parent determines quantity of settings
    // for example array [] means that there can be multiple configurations
    // in which each element of this array fullfils given structure
    this.APP_DATA_SCHEME = {
        appData: {
            key: "appData",
            //default: {},
            children: {
                settings: {
                    key: "settings",
                    //default: {},
                    children: {
                        autoSubmit: {
                            key: "autoSubmit",
                            default: false
                        },
                        selectedEnviroment: {
                            key: "selectedEnviroment",
                            default: "enviroment_0"
                        }
                    }
                },
                dataSources: { 
                    key: "dataSources",
                    default: [],
                    // default: [
                    //     {
                    //         dataSetEnviromentName: "Default Enviroment",
                    //         dataSetEnviromentId: "enviroment_0",
                    //         dataSetQueryUrls: [ "http://example.com" ]
                    //     }
                    // ],
                    children: {
                        dataSetEnviromentName: { 
                            key: "dataSetEnviromentName",
                            default: "Default Enviroment"
                        },
                        dataSetEnviromentId: { 
                            key: "dataSetEnviromentId",
                            default: "enviroment_0"
                        },
                        dataSetQueryUrls: {
                            key: "dataSetQueryUrls",
                            default: [ "http://example.com" ]
                        }
                    } 
                }
            }
        }
    }
}

SettingsUtilsHelper.prototype = {
    constructor: SettingsUtilsHelper,

    init: function() {
        var context = this;
        context.LOGGER.log("inited");
    },

    getStoreKeyName: function(keyDotNotation) {
        return this.getAttributeByDotNotation(keyDotNotation, 'key');
    },

    getDefaultVaule: function(keyDotNotation) {
        return this.getAttributeByDotNotation(keyDotNotation, 'default');
    },

    getAttributeByDotNotation: function(keyDotNotation, attribute) {
        if (keyDotNotation === undefined || keyDotNotation === null || keyDotNotation.trim() === "") {
            console.log("SettingsUtilsHelper # getStoreKeyName(): no key dot notation provided");
            return null;
        }
        //console.log("=============");
        keyDotNotation = "appData." + keyDotNotation;
        var keyChain = keyDotNotation.split(".");
        var tmpObj = this.APP_DATA_SCHEME;
        var result = null;
        for (var i = 0; i < keyChain.length; i++) {
            //console.log(tmpObj);
            //console.log(keyChain[i]);
            if (tmpObj[keyChain[i]].children !== undefined && i < keyChain.length -1) {
                tmpObj = tmpObj[keyChain[i]].children;
                result = tmpObj[attribute];
            } else {
                result = tmpObj[keyChain[i]][attribute];
                if (result instanceof Array && result.length === 0) {
                    result.push(this.fillFromChildren(tmpObj[keyChain[i]], attribute));
                    //this.fillFromChildren(tmpObj[keyChain[i]]);
                }
                // if (result instanceof Array) {
                //     //console.log("Array");
                //     result.push(this.fillFromChildren());
                // }
                // console.log(attribute);
                // console.log(keyDotNotation);
                console.log(result);
            }
        }
        //console.log(keyDotNotation);
        //console.log(result);
        return result;
    },

    fillFromChildren: function(object, attribute) {
        var result = {};
        if (object.children !== undefined) {
            var keys = Object.keys(object.children);
            //console.log(keys);
            for (key of keys) {
                //console.log(object.children[key][attribute]);
                result[key] = this.fillFromChildren(object.children[key], attribute);
            }
        } else {
            result = object[attribute];
        }
        return result;
    },

    getAllDotNotationPaths: function() {

    },

    isEmpty: function(result) {
        if (result === undefined || result === null) {
            return true;
        }
        if (result instanceof String && result.trim() === "") {
            return true;
        }
        return false;
    }

}