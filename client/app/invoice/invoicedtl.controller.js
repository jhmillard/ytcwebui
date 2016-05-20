'use strict';

class InvoiceDtlCtrl {

  constructor($stateParams, $state, PoStatus, Po, User, Invoice, $filter) {

    this.Invoice = Invoice;
    this.$state = $state;
    this.$filter = $filter;
    this.User = User;

    this.date = new Date();
    this.short_date = moment(this.date).format('MM/DD/YYYY');


    this.contractor_rate;
    this.client_rate;
    this.error_string;

    this.timesheets = [];
    this.selected = [];





    this.users = User.query(()=>{
      //need to get the list of PO's out there.
      this.pos = PoStatus.get({status: "open"},()=>{

        angular.forEach(this.pos,(pvalue,pkey)=>{
          this.pos[pkey].entered_timesheets = 0;
          //now we need to see how many entered timesheets there are....
        })

        this.settimesheets();


      });
    });
    if($stateParams.invoiceid==0){
      this.currentinvoice = {};
      this.submit = "Add";
    }
    else{
      this.currentinvoice = Invoice.get({id: $stateParams.invoiceid},()=>{
        if(!this.currentinvoice.date){
          this.currentinvoice.date = new Date();
        }else{
          this.currentinvoice.date = new Date(this.currentinvoice.date);
        }

        this.submit="Update";
      });
    }
  }

  cancel(previous){
    //if(previous){
    //  this.$state.go(previous)
    //}
    //else{
    //  this.$state.go('invoice');
    //}
    window.history.back();

  };


  settimesheets(){

    //this.poUsers = this.$filter('filter')(this.users,{timesheets.po.id: this.currentinvoice.po.id._id});

    //this.timesheetList = this.$filter('filter')(this.currentuser.timesheets,{short_date: moment(time).format('MM/DD/YYYY')});

    if(angular.isDefined(this.currentinvoice.po.client)){

      this.currentClient = this.User.get({id: this.currentinvoice.po.client}, ()=>{

        this.timesheets=[];


        var time_row ={};

        angular.forEach(this.users, (value, key) => {

          var currentUser = this.users[key];
          if(angular.isDefined(currentUser.timesheets)) {
            angular.forEach(currentUser.timesheets, (sheet, idx) => {
              if(angular.isDefined(currentUser.timesheets[idx].po.id)) {
                if ((currentUser.timesheets[idx].po.id == this.currentinvoice.po._id) && (currentUser.timesheets[idx].status == 'entered')) {

                  var cost = parseInt(currentUser.timesheets[idx].hours) * parseInt(currentUser.contractor_rate);
                  var cl_rev = parseInt(currentUser.timesheets[idx].hours) * parseInt(this.currentClient.client_rate);

                  time_row = {

                    short_date: currentUser.timesheets[idx].short_date,
                    name: currentUser.timesheets[idx].po.name,
                    id: currentUser.timesheets[idx]._id,
                    user_id: currentUser._id,
                    hours: currentUser.timesheets[idx].hours,
                    rate: currentUser.contractor_rate,
                    desc: currentUser.timesheets[idx].desc,
                    contractor_name: currentUser.last_name,
                    contractor_cost: cost,
                    client_revenue: cl_rev,
                    my_revenue: cl_rev - cost,
                    category: currentUser.timesheets[idx].category

                  }

                  this.timesheets.push(time_row);
                  time_row = {};
                }
              }
            })
          }
        })
      });
    }else{
      this.timesheets = [];
    }
  }

  check_error(){
    if (this.selected.length > 0) {
      this.error_string="";
    }
  }

  register(form,previous) {
    this.submitted = true;



    this.currentinvoice.dtimemod = this.short_date;
    if (form.$valid) {


      if (this.submit == "Update") {
        this.Invoice.update(this.currentinvoice, ()=> {
          this.$state.go('invoice');
        });


      }
      else {
        if (this.selected.length == 0) {
          this.error_string = "Must Select atleast ONE timesheet";
        }
        else {
          this.currentinvoice.date = this.short_date;
          this.currentinvoice.timesheets = this.selected;
          this.Invoice.save(this.currentinvoice, ()=> {
            //this.$state.go('invoice');
            window.history.back();
          });
        }
      }
    }
  }
}
angular.module('ytcwebUirouteApp')
  .controller('InvoiceDtlCtrl', InvoiceDtlCtrl)
  .filter('sumByKey', function() {
    return function (data, key) {
      if (typeof(data) === 'undefined' || typeof(key) === 'undefined') {
        return 0;
      }

      var sum = 0;
      for (var i = data.length - 1; i >= 0; i--) {
        sum += parseInt(data[i][key]);
      }

      return sum;
    };
  });
