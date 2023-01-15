try {
    importScripts('/js/message_utils.js');
} catch (e) {
    console.error(e);
}

function BackgroundHelper() {
    this.MESSAGE_UTILS = new MessageUtils();
    //TODO docasne riesenie na proof of concept, bude sa pekne konfigurovat cez GUI v nastaveniach, ulozenie na localStorage alebo ine
    this.DATASETS = [
        'https://kurva',
        'https://pica.rite',
        'https://kokot.pica'
    ];
}

BackgroundHelper.prototype = {
    constructor: BackgroundHelper,
    
    checkResourceExistence: function(resourceId) {
        var context = this;
        var promises = [];

        for (var i = 0; i < this.DATASETS.length; i++) {
            promises[i] = fetch(this.DATASETS[i]);
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
                        context.openNewTab(response.value.url);
                        statuses.push(true);
                    }
                });
                if (statuses.every((value) => value === false)) {
                    context.notFoundMessage();
                }
            })
            .catch(error => {
                context.notFoundMessage();
                console.log(error);
            });
    },

    openNewTab: function(url) {
        chrome.tabs.create({ url: url });
    },

    notFoundMessage: function() {
        //TODO vratit pouzivatelovi nieco rozumne ze vsetko je na chuja
    } 
}