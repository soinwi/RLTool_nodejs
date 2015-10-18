sap.ui.define([
	"sap/ui/base/Object"
], function (Object) {
	"use strict";
	return Object.extend("sap.ui.demo.wt.controller.HelloDialog", {
	    open : function(view_){
           var dialog = this._getDialog();
           view_.addDependent(dialog);
           dialog.open();
       },
       onCloseDialog: function(){
         this._getDialog().close();  
       },
       
       _getDialog: function(){
           if(!this._oDialog)
           {
               this._oDialog = sap.ui.xmlfragment("ch.soinwi.rltool.view.HelloDialog", this);
           }
           return this._oDialog;
       }
	});
});