function Popup() {
    this.SUBMIT_RESOURCE_BUTTON_ID = "submitResourceId";
    this.SUBMIT_RESOURCE_TEXTFIELD_ID  = "resourceId";
    this.HELPER = new PopupHelper();
}
  
Popup.prototype = {
    constructor: Popup,
  
    init: function() {
        var context = this;

        document.addEventListener('DOMContentLoaded', function() {
            context.onResourceIdSubmit();
        }, false);
    },

    onResourceIdSubmit: function() {
        var context = this;

        document
            .getElementById(context.SUBMIT_RESOURCE_BUTTON_ID)
            .addEventListener('click', function() {
                var resourceId = document.getElementById(context.SUBMIT_RESOURCE_TEXTFIELD_ID).value;
                context.HELPER.MESSAGE_UTILS.sendMessage(
                    context.HELPER.MESSAGE_UTILS.MESSAGE_IDS.SUBMIT_RESOURCE_ID_MESSAGE,
                    resourceId
                );
                //alert(resourceId);
            }, false);
    }

}

var popup = new Popup();
popup.init();

