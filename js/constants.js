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
            autoSubmitResourceCheckboxId: "autoSubmitResourceId"
        }
    },

    // message broker related
    messageRouter: {
        submitResourceId: {
            messageId: 1
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
    }
}