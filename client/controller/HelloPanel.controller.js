sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/MessageToast"
], function (Controller, MessageToast) {
   "use strict";
   return Controller.extend("ch.soinwi.rltool.controller.HelloPanel", {
       onOpenDialog : function(){
         this.getOwnerComponent().helloDialog.open(this.getView());  
       },
       onShowHello : function(){
           MessageToast.show("Hello " + this.getView().getModel().getProperty("/recipient/name"));
       },
       
   });
});