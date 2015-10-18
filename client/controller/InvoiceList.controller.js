sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("ch.soinwi.rltool.controller.InvoiceList", {

		onInit : function () {
			var oViewModel = new JSONModel({
				currency: "CHF"
			});
			this.getView().setModel(oViewModel, "view");
		},
		
		onFilterInvoices: function(event_){
		    var filter =[];
		    var query = event_.getParameter("query");
		    if(query)
		    {
		        filter.push(new Filter("ProductName", FilterOperator.Contains, query));
		    }
		    
		    var list = this.getView().byId("invoiceList");
		    var binding = list.getBinding("items");
		    binding.filter(filter);
		}

	});
});