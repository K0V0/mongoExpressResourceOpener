// "class" with mainly object keys and global constants

var CONSTANTS = {

    // IDs and other props of elements in HTML views
    elements: {
        popup: {
            submitResourceTextfieldId: "resourceId",
            submitResourceButtonId: "submitResourceId",
            autoSubmitResourceCheckboxId: "autoSubmitResourceId",
            goToSettingsButtonId: "goToOptions",
            selectEnviromentConfig: "selectEnviroment"
        },
        settings: {
            url: "html/settings.html",
            autoSubmitResourceCheckboxId: "autoSubmitResourceId",
            addNewEnviromentButtonId: "addNewEnviromentDataSets",
            saveAndExitButtonId: "saveSettings",
            dataSourcesSectionId: "dataSources"
        }
    },

    // message broker related - message IDs
    messageRouter: {
        submitResourceId: {
            messageId: 1,
            enviroment: "enviroment",
            resourceId: "resourceId"
        },
        submitEnviromentChange: {
            messageId: 2
        }
    },

    // chrome sync storage & data model
    settings: {
        settings: {
            
        },
        dotNotationPaths: {
            autoSubmitSettings: "settings.autoSubmit", 
            currentEnviroment: "settings.selectedEnviroment",
            //FIXME think about this constants, if needed at all and anviroments settings in array
            // does not follow dotNotationPath pattern
            dataSources: "dataSources",
            dataSourceUrls: "dataSetQueryUrls",
            dataSourcesEnviroment: "dataSetEnviromentId",
            dataSourcesEnviromentName: "dataSetEnviromentName"
        }
    },

    strings: {
        sk: {
            forResource: "Pre resource",
            nothingWasFound: "nebolo nič nájdené"
        }
    }
}