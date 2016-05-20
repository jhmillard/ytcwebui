
'use strict';

class InvoiceCtrl {

  constructor($stateParams, $state, Invoice) {

    this.viewInvoices = [];
    this.currentInvoices = [];

    this.iterator = 0;

    this.currentInvoices = Invoice.query({},()=>{
      //now we can iterate through the current invoices and setup our actual list JSON to be
      //used by the screen for viewing the totals and such on each invoice
      angular.forEach(this.currentInvoices,(value,key)=>{

        var invoiceLine = {};
        var development_hours = 0;
        var admin_hours = 0;
        var test_hours = 0;
        var total_hours = 0;
        var revenue = 0;
        var currentInvoice = this.currentInvoices[key];

        //build our timesheet data
        invoiceLine.invoice_id = currentInvoice._id;
        invoiceLine.name = this.currentInvoices[key].name;
        invoiceLine.poid = this.currentInvoices[key].po.poid;
        invoiceLine.date = this.currentInvoices[key].date;
        invoiceLine.status = this.currentInvoices[key].status;



        angular.forEach(currentInvoice.timesheets, (sheet,idx)=>{
          //this is where we total the
          if(currentInvoice.timesheets[idx].category == "dev"){
            development_hours += currentInvoice.timesheets[idx].hours;
          }
          if(currentInvoice.timesheets[idx].category == "admin"){
            admin_hours += currentInvoice.timesheets[idx].hours;
          }
          if(currentInvoice.timesheets[idx].category == "test"){
            test_hours += currentInvoice.timesheets[idx].hours;
          }

          revenue += currentInvoice.timesheets[idx].client_revenue;

        });

        //total_hours = (development_hours + admin_hours + test_hours);

        invoiceLine.dev_hours = development_hours;
        invoiceLine.admin_hours = admin_hours;
        invoiceLine.test_hours = test_hours;
        invoiceLine.total_hours = development_hours + admin_hours + test_hours;
        invoiceLine.revenue = revenue;

        this.viewInvoices.push(invoiceLine);

      });


    });
  }
}

angular.module('ytcwebUirouteApp')
  .controller('InvoiceCtrl', InvoiceCtrl)
