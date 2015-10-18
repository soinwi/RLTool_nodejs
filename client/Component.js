sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "ch/soinwi/rltool/controller/HelloDialog"
], function(UIComponent, JSONModel, HelloDialog) {
    "use strict";
    return UIComponent.extend("ch.soinwi.rltool.Component", {
        metadata: {
            rootView: "ch.soinwi.rltool.view.App"
        },

        init: function() {
            // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);

            // set data model
            var oData = {
                recipient: {
                    name: "World"
                }
            };
            var oModel = new JSONModel(oData);
            this.setModel(oModel);
            
            var invoiceModel = new JSONModel(jQuery.sap.getModulePath("ch.soinwi.rltool", "/Invoices.json"));
            this.setModel(invoiceModel, "invoice");
            
            this.helloDialog = new HelloDialog();
        }
    });
});