function Popup() {
    this.SUBMIT_RESOURCE_BUTTON_ID = "submitResourceId";
    this.SUBMIT_RESOURCE_ID_FROM_CLIPBOARD_ON_POPUP_OPEN_CHECKBOX_ID = "autoSubmitResourceId"; 
    this.HELPER = new PopupHelper();
}
  
Popup.prototype = {
    constructor: Popup,
  
    // runs on every popup open
    init: function() {
        console.log("Popup - init()");
        var context = this;

        Promise.all([
            
            context.HELPER.init(),
            
        ]).then(() => {

            console.log("Popup - init() # all promises loaded");

            // settings, states of HTML elements
            context.loadAutoSubmitState();

            // event listeners
            context.onResourceIdSubmited();
            context.onResourceIdPasted();
            context.onAutoSubmitChanged();

        });   
    },

    // checkbox for autosubmitting setting state
    loadAutoSubmitState: function() {
        document
            .getElementById(this.SUBMIT_RESOURCE_ID_FROM_CLIPBOARD_ON_POPUP_OPEN_CHECKBOX_ID)
            .checked = this.HELPER.getAutoSubmit();
    },

    // submitting by button
    onResourceIdSubmited: function() {
        var context = this;
        document
            .getElementById(context.SUBMIT_RESOURCE_BUTTON_ID)
            .addEventListener('click', function() { context.HELPER.sendResourceIdToBackgroundScriptFromTextfield(); }, false);
    },

    // changing settings for auto submission during extension popup opening by taking data from clipboard
    onAutoSubmitChanged: function() {
        var context = this;
        document
            .getElementById(context.SUBMIT_RESOURCE_ID_FROM_CLIPBOARD_ON_POPUP_OPEN_CHECKBOX_ID)
            .addEventListener('change', function() { context.HELPER.setAutoSubmit(this.checked); }, false);
    },

    //submits clipboard content taken from clipboard on extension popup open
    //TODO validate data in case of taking them from clipboard
    onResourceIdPasted: function() {
        var context = this;
        if (context.HELPER.getAutoSubmit()) {
            document
                .getElementsByTagName('html')[0]
                .addEventListener('paste', function(event) { context.HELPER.sendResourceIdToBackgroundScriptFromPaste(event) });
        }
    },

}

var popup = new Popup();
popup.init();

