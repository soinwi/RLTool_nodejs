sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("ch.soinwi.rltool.controller.PeopleList", {

		onInit : function () {
			var oViewModel = new JSONModel({
				
			});
			this.getView().setModel(oViewModel, "view");
		}
		
	});
});