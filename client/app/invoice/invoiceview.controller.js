'use strict';

class InvoiceViewCtrl {

  constructor($stateParams,Auth, $state, Invoice, User, Po, Chart) {

    this.invoice_id = $stateParams.invoice;
    this.showList = true;
    this.Invoice = Invoice;
    this.show_delete_invoice = false;
    this.showAdmin = false;
    this.User = User;
    this.Po = Po;
    this.Chart = Chart;
    this.hoursTotal = 0;
    this.contractorCost = 0;

    this.currentUser = User.get({id: Auth.getCurrentUser()._id},()=>{
      this.loadData();
    });

  }

  loadData(){


    this.status = [
      {
        type:'entered',
        desc:'Entered'
      },
      {
        type:'sent',
        desc:'Sent'
      },
      {
        type:'received',
        desc:'Received'
      },
      {
        type:'paid',
        desc:'Paid'
      }
    ];

    if(this.currentUser.role == 'admin'){
      this.showAdmin = true;
      this.showDelete = true;
    }

    this.currentInvoice = this.Invoice.get({id:this.invoice_id},()=>{


      if(this.currentInvoice.status == "entered"){
        this.progress = 25;
      }
      if(this.currentInvoice.status == "sent"){
        this.progress = 50;
      }
      if(this.currentInvoice.status == "received"){
        this.progress = 75;
      }
      if(this.currentInvoice.status == "paid"){
        this.progress = 100;
      }


      //get the user information for the current invoice
      this.po = this.Po.get({id: this.currentInvoice.po._id},()=>{

        this.client = this.User.get({id:this.po.client},()=>{
          this.invoiceContractor = this.User.get({id:this.po.contractor},()=>{

            //do the rest of the stuff here.
            this.timeSheetArray = [];

            angular.forEach(this.currentInvoice.timesheets,(tvalue,tkey)=>{

              //need to grab the timesheet user
              this.User.get({id: this.currentInvoice.timesheets[tkey].user_id},(user)=>{
                this.currentInvoice.timesheets[tkey].contractor = user;
                angular.forEach(user.timesheets,(value,key)=>{
                  if(user.timesheets[key]._id == this.currentInvoice.timesheets[tkey].id){
                    this.timeSheetArray.push(user.timesheets[key]);
                    this.hoursTotal += user.timesheets[key].hours;

                  }
                })
                this.chartJSON = this.Chart.returnTimesheetListDataJSON(this.timeSheetArray);
                this.configureCharts();
                this.contractorCost = (this.hoursTotal * this.invoiceContractor.contractor_rate);
              })
            })




          })

        })

      })




      if(this.currentInvoice.status != "entered"){
        this.showDelete = false;
      }

      this.timesheet_length = this.currentInvoice.timesheets.length;
      if(this.timesheet_length == 0){
        this.show_delete_invoice = true;
      }



    })
  }

  configureCharts(){
    var chart4 = c3.generate({


      bindto: "#chart4",
      data: {
        x: 'x',
        xFormat: '%m/%d/%Y', // 'xFormat' can be used as custom format of 'x'
        columns: this.chartJSON,
        labels: true,
        type: 'area'
      },
      //subchart: {
      //  show: true
      //},
      //zoom:{
      //  enabled:true
      //},
      grid: {
        x: {
          show: true

        },
        y: {
          show: true
        }
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%m/%d/%y',
            rotate: 90,
            fit: true
          }
        },
        y: {
          max: 12,
          tick: {
            format: d3.format('.0f')
          }
        }
      }
    });
  }

  remove(time){
    var removal = {};
    removal.timesheet_id = time.id;
    removal.user_id = time.user_id;
    removal.invoice_id = this.currentInvoice._id;
    alert(removal.timesheet_id);
    this.Invoice.removetime(removal,()=>{
      this.loadData();

    });
  }

  update(){

    this.Invoice.update(this.currentInvoice,()=>{
      window.history.back();
    });

  }
  cancel(){
    window.history.back();
  }

  delete(invoice){
    invoice.$remove({id: invoice._id});
    window.history.back();
  }
}

angular.module('ytcwebUirouteApp')
  .controller('InvoiceViewCtrl', InvoiceViewCtrl)
