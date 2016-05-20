
'use strict';



class ContractordashCtrl {

  constructor(Auth,PoContractor,User,$filter,Invoice, Chart) {


    this.clientPos = [];
    this.contractorClients = [];
    this.contractorInvoices = [];
    this.filter = "";
    this.client = {};
    this.chart2 = c3;
    this.filter = $filter;
    this.User = User;
    this.currentClient = {};
    this.all_purchase_orders = true;
    this.filtered_purchase_orders = false;

    this.inList = false;

    this.enteredTimesheets = [];

    this.timesheetsquery ={
      order: 'name',
      limit: 3,
      page: 1
    };


    //$scope.gradeC = $filter('filter')($scope.results.subjects, {grade: 'C'})[0];




    this.currentUser = User.get({id: Auth.getCurrentUser()._id},()=>{

      this.userJSON = Chart.getUserTimesheetJSON(this.currentUser);
      this.generateTimeSeriesChart();

      //need to grab the timesheets... entered.

      angular.forEach(this.currentUser.timesheets,(tvalue,tkey)=>{

        if(this.currentUser.timesheets[tkey].status == 'entered'){
          this.enteredTimesheets.push(this.currentUser.timesheets[tkey]);
        }
      })

      this.allInvoices = Invoice.query({},()=>{

        this.contractorPos = PoContractor.get({contractor: this.currentUser._id}, ()=> {
          //need to get all of the users who's PO's are connected here...
          angular.forEach(this.contractorPos, (value, key) => {

            var currentClient = User.get({id: this.contractorPos[key].client},()=>{
              angular.forEach(this.contractorClients, (cvalue, ckey)=> {
                if (this.contractorClients[ckey]._id == currentClient._id) {
                  this.inList = true;
                }
              })

              this.contractorPos[key].clientImage = currentClient.img_url;

              if (this.inList == false) {
                this.contractorClients.push(currentClient);
              }
            })

            angular.forEach(this.allInvoices,(ivalue,ikey)=>{

              if(this.allInvoices[ikey].po._id == this.contractorPos[key]._id){
                //total the timesheet data within the invoice
                var currentInvoice = this.allInvoices[ikey];



                var total_hours = 0;
                var total_contractor_cost =0;
                angular.forEach(currentInvoice.timesheets,(tvalue,tkey)=>{
                  total_hours += currentInvoice.timesheets[tkey].hours;
                  total_contractor_cost += currentInvoice.timesheets[tkey].contractor_cost;
                })
                this.allInvoices[ikey].total_hours = total_hours;
                this.allInvoices[ikey].total_contractor_cost = total_contractor_cost;
                this.contractorInvoices.push(this.allInvoices[ikey]);
              }
            })

          })



        })

      })

    })





    var all_client = {};
    all_client._id = 0;
    all_client.client_name = "All Clients";
    this.contractorClients.push(all_client);


  }







  generateTimeSeriesChart(){

    this.chart2.generate({


    bindto: "#chart1",
      data: {
      x: 'x',
        xFormat: '%m/%d/%Y', // 'xFormat' can be used as custom format of 'x'
        columns: this.userJSON,
        labels: true,
        type: 'area'
    },
    subchart: {
      show: true
    },
    zoom:{
      enabled:true
    },
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
        label: 'Hours',
        max: 12,
          tick: {
          format: d3.format('.0f')
        }
      }
    }
  });
    //setTimeout(function () {
    //  this.chart2.chart.fn.transform('pie');
    //}, 2000);;
    //setTimeout(function () {
    //  this.chart2.transform('bar');
    //}, 4000);;
    //setTimeout(function () {
    //  this.chart2.transform('area');
    //}, 8000);;






//    var chart2 = c3.generate({
//      bindto: "#chart2",
//      data: {
//        x: 'x',
////        xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'
//        columns: this.userJSON
//
//      },
//      axis: {
//        x: {
//          type: 'timeseries',
//          tick: {
//            format: '%Y-%m-%d'
//          }
//        }
//      }
//    });
  }

  sendEmail(){
    this.User.email({stuff: "stuff"},()=>{
      alert("sent email");
    })
  }

  setPoList(){
    //need to select PO's based on client AND current user...   or rather filter them based
    if(angular.isDefined(this.client._id)){
      if(this.client._id == 0){
        this.all_purchase_orders = true;
        this.filtered_purchase_orders = false;

      }else{
        this.all_purchase_orders = false;
        this.filtered_purchase_orders = true;
        this.filteredPos= this.filter('filter')(this.contractorPos,{client: this.client._id});
      }

    }

  }

};

//if($filter('filter')(this.contractorClients,{_id:this.contractorPos[key].client}).length == 0){
//  this.currentClient = User.get({id: this.contractorPos[key].client},()=>{
//    this.contractorClients.push(this.currentClient);
//    this.currentClient = {};
//  })







angular.module('ytcwebUirouteApp')
  .controller('ContractordashCtrl',ContractordashCtrl);
