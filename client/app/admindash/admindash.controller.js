'use strict';


class AdmindashCtrl {

  constructor(Auth, $scope, User, PoStatus,UserRole, Invoice) {

    this.myvariable = 'TEST';
    this.poUsers = [];
    this.openPos=[];
    this.viewPos=[];
    this.User = User;
    this.PoStatus = PoStatus;
    this.UserRole = UserRole;
    this.Invoice = Invoice;
    this.currentInvoices = [];
    this.viewInvoices = [];

    this.invoicequery ={
      order: 'name',
      limit: 5,
      page: 1
    };
    this.poquery ={
      order: 'name',
      limit: 5,
      page: 1
    };
    this.currentUser = Auth.getCurrentUser();


    this.setPoData()
    this.currentInvoices = this.Invoice.query({},()=>{
      //now we build our list for invoices.
      this.setInvoiceData(this.currentInvoices);
    });


  }

  setPoData(){
    //BEGIN - BLOCK GET OPEN POS
    this.openPos = this.PoStatus.get({status:'open'},()=>{
      //need to get all of the users who's PO's are connected here...
      //BEGIN - BLOCK QUERY CURRENT USERS

      this.currentUsers = this.UserRole.query({role:"contractor"},()=>{


        //BEGIN - BLOCK OPEN POS
        angular.forEach(this.openPos, (value, key) => {
          var poLine = {};
          poLine.dev_hours = 0;
          poLine.admin_hours = 0;
          poLine.test_hours = 0;
          poLine.total_hours = 0;
          poLine.hours = this.openPos[key].hours;
          //for each PO lets go ahead and select the unique
          poLine.poid = this.openPos[key].poid;
          poLine._id = this.openPos[key]._id;
          //now we need to iterate through the contractors and then iterate through their timesheets...
          //BEGIN - BLOCK CURRENT USERS
          angular.forEach(this.currentUsers,(cvalue,ckey)=>{
            if(angular.isDefined(this.currentUsers[ckey].timesheets)){
              //Iterate through the timesheets for this POID
              var currentTimesheets = this.currentUsers[ckey].timesheets;
              //BEGIN - BLOCK CURRENT TIMESHEETS FOR USER
              angular.forEach(currentTimesheets,(tvalue,tkey)=>{

                //if the timesheet po matches our current po in hand
                if(currentTimesheets[tkey].po.id == poLine._id){
                  //now we need to setup totals for dev/adim/test
                  if(currentTimesheets[tkey].category == "dev"){
                    poLine.dev_hours += currentTimesheets[tkey].hours;
                    poLine.admin_hours += 0;
                    poLine.test_hours += 0;
                  }
                  if(currentTimesheets[tkey].category == "admin"){
                    poLine.admin_hours += currentTimesheets[tkey].hours;
                    poLine.dev_hours += 0;
                    poLine.test_hours += 0;
                  }
                  if(currentTimesheets[tkey].category == "test"){
                    poLine.test_hours += currentTimesheets[tkey].hours;
                    poLine.admin_hours += 0;
                    poLine.dev_hours += 0;
                  }

                }
              });//END - BLOCK CURRENT TIMESHEETS FOR USER
            };
          });//END - BLOCK CURRENT USERS
          poLine.total_hours = poLine.test_hours + poLine.admin_hours + poLine.dev_hours;
          poLine.avail_hours = poLine.hours - poLine.total_hours;
          this.viewPos.push(poLine);
        });//END - BLOCK OPEN POS

      });//END - BLOCK QUERY CURRENT USERS

    });//END - BLOCK GET OPEN POS
  }

  setInvoiceData(invoices){
    //this is where we setup the invoice data we need to use!
    //retrieve invoices by status.
    var invRow = {};
    var hours = 0;
    angular.forEach(invoices,(value,key)=>{

      invRow.name = invoices[key].name;
      invRow._id = invoices[key]._id;
      invRow.date = invoices[key].date;
      var timesheets = invoices[key].timesheets;
      angular.forEach(timesheets,(tvalue,tkey)=>{
        //we need to total the rows
        hours += timesheets[tkey].hours;
      })
      invRow.hours = hours;
      this.viewInvoices.push(invRow);
      hours = 0;
      invRow = {};
    })



  }


};




angular.module('ytcwebUirouteApp')
  .controller('AdmindashCtrl',AdmindashCtrl);

