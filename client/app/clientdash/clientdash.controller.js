'use strict';



class ClientdashCtrl {

  constructor(Auth,PoClient,User,$filter,Invoice) {

    this.clientPos=[];

    this.chartDataJSON = [];
    this.chartRow = {};
    this.openInvoices = [];
    this.invoice = {};




    Auth.getCurrentUser((user)=>{
      this.currentUser = user;
      PoClient.get({client: this.currentUser._id},(pos)=>{
        //need to get all of the users who's PO's are connected here...
        this.clientPos = pos;
        angular.forEach(this.clientPos, (value, key) => {

          this.clientPos[key].total_dev_hours = 0;
          this.clientPos[key].total_admin_hours = 0;
          this.clientPos[key].total_test_hours = 0;

          Invoice.querypo({poid: this.clientPos[key]._id},(invoices)=>{

            angular.forEach(invoices,(invalue,inkey)=>{
              this.openInvoices.push(invoices[inkey]);
            })

            //for each PO lets go ahead and select the unique
            User.get({id: this.clientPos[key].contractor},(contractor)=>{
              this.contractor = contractor;
              this.clientPos[key].contractor_name = this.contractor.first_name + " " + this.contractor.last_name;
              this.clientPos[key].contractor_image = this.contractor.img_url;
              var timeSheets = contractor.timesheets;

              angular.forEach(timeSheets,(tsvalue,tskey)=>{


                if(timeSheets[tskey].po.id == this.clientPos[key]._id){
                  if(timeSheets[tskey].category == 'dev'){
                    this.clientPos[key].total_dev_hours += timeSheets[tskey].hours;
                  }
                  if(timeSheets[tskey].category == 'admin'){
                    this.clientPos[key].total_admin_hours += timeSheets[tskey].hours;
                  }
                  if(timeSheets[tskey].category == 'test'){
                    this.clientPos[key].total_test_hours += timeSheets[tskey].hours;
                  }
                }
              })

              this.chartRow.poid = this.clientPos[key].poid;
              this.chartRow.total_admin_hours = this.clientPos[key].total_admin_hours;
              this.chartRow.total_dev_hours = this.clientPos[key].total_dev_hours;
              this.chartRow.total_test_hours = this.clientPos[key].total_test_hours;
              this.chartDataJSON.push(this.chartRow);
              this.clientPos[key].hours_used = this.chartRow.total_admin_hours + this.chartRow.total_dev_hours + this.chartRow.total_test_hours;

              var hoursUsed = this.clientPos[key].hours_used;
              var hoursTotal = this.clientPos[key].hours;

              if((hoursUsed * 100)/hoursTotal >= 90){
                this.clientPos[key].warning_high = true;
                this.clientPos[key].warning_medium = false;
                this.clientPos[key].warning_low = false;
              }else if((hoursUsed * 100)/hoursTotal >= 50){
                this.clientPos[key].warning_high = false;
                this.clientPos[key].warning_medium = true;
                this.clientPos[key].warning_low = false;
              }
              else{
                this.clientPos[key].warning_high = false;
                this.clientPos[key].warning_medium = false;
                this.clientPos[key].warning_low = true;
              }

              this.chartRow = {};
              if(key == (this.clientPos.length - 1)){
                this.setchart(this.chartDataJSON);
              }
            })
          })
        })
      })
    });

  };

  setchart(chartData){

    //var chart = c3.generate({
    //  bindto: "#chart1",
    //  data: {
    //    json: this.chartDataJSON,
    //    keys: {
    //      x: 'poid', // it's possible to specify 'x' when category axis
    //      value: ['total_admin_hours', 'total_dev_hours','total_test_hours'],
    //    },
    //
    //    type: 'bar'
    //  },
    //  axis: {
    //    x: {
    //      type: 'category' // this needed to load string x value
    //    }
    //  }
    //});

    //var jsonData = angular.toJson(this.chartDataJSON);


    var chart2 = c3.generate({
      bindto: "#chart1",
      data: {
        json: chartData,
        keys: {
          x: 'poid', // it's possible to specify 'x' when category axis
          value: ['total_dev_hours', 'total_test_hours', 'total_admin_hours']
        },
        type: 'bar'
      },
      axis: {
        x: {
          type: 'category'
        }
      }
    });

  }
}




angular.module('ytcwebUirouteApp')
  .controller('ClientdashCtrl',ClientdashCtrl);
