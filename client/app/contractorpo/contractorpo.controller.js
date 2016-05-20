'use strict';


class ContractorpoCtrl {

  constructor(Auth,$scope,User, Po, $stateParams,$filter,Chart) {

    $scope.test = "TEST";

    var totalHoursUsed = 0;
    var totalHoursInvoiced = 0;
    this.currentPo = {};
    this.currentTimesheets = [];
    this.hours_used = 0;
    this.hours_invoiced = 0;
    this.show_hours_used = true;
    this.show_invoied_chart = true;
    this.show_charts = false;
    this.chartJSON = [];

    var invoicedList = ['invoiced','sent','received','paid'];

    this.disabledTextColor = "darkslategrey";
    this.pohoursTextColor = "darkgreen";


    $scope.query = {
      order: 'short_date',
      limit: 5,
      page: 1
    };

    //this.currentuser = User.get({id: Auth.getCurrentUser()._id},()=>{
    //  this.configureCharts($scope,$filter);
    //  var sChart = new ChartService(this.currentuser.timesheets);
    //  this.rowdata = sChart.getChartSet();
    //
    //
    //
    //});

      Po.get({id: $stateParams.poid },(returnPo)=> {

        this.currentPo = returnPo;
        //this.currentuser = Auth.getCurrentUser();
        this.currentuser = User.get({id:this.currentPo.contractor},()=> {

          //need to get the client
          this.client = User.get({id: this.currentPo.client},()=>{

            //now we need to count the number of hours used on this PO.   so... we can iterate through the timesheets...
            angular.forEach(this.currentuser.timesheets, (value, key) => {

              if (this.currentuser.timesheets[key].po.id == this.currentPo._id) {


                this.show_charts = true;
                this.currentTimesheets.push(this.currentuser.timesheets[key]);
                this.hours_used += this.currentuser.timesheets[key].hours;
                if(invoicedList.indexOf(this.currentuser.timesheets[key].status) >= 0){
                  this.hours_invoiced += this.currentuser.timesheets[key].hours;
                }
              }
            })
            this.chartJSON = Chart.returnTimesheetListDataJSON(this.currentTimesheets);
            this.configureCharts($scope,$filter);
          })

        })

      })

  };

  //

  back(){

      window.history.back();

  }

  flip_hours_used(){
    this.show_hours_used = !this.show_hours_used;
  }
  configureCharts($scope,$filter){

    //this.seeworks = this.hours_used;

    var percentageUsed = (this.hours_used * 100)/this.currentPo.hours;

    if(percentageUsed >= 90){
      this.gauge_color = 'red'
      this.gauge_color_invoiced = 'yellow';
      this.gaugue_color_avail = 'red'
      this.pohoursTextColor = 'red';
    }else if( percentageUsed >50 ){
      this.gauge_color = 'orange'
      this.gauge_color_invoiced = 'blue'
      this.gaugue_color_avail = 'blue'
    }else{
      this.gauge_color = 'green'
      this.gauge_color_invoiced = 'blue'
      this.gaugue_color_avail = 'blue'
    }



    var chart1 = c3.generate({
      bindto: "#chart1",
        data: {
          columns: [
            ['Hours Used', this.hours_used],
          ],
          type: 'gauge',
          onclick: function(d,i){ this.show_hours_used = !this.show_hours_used},
          onmouseover: function (d, i) { console.log("onmouseover", d, i); },
          onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        },
      gauge:{
        min: 0,
        max: this.currentPo.hours
        //max: this.currentPo.hours
      },

      color:{
        pattern:[this.gauge_color],
        threshold:{
          values:[0]
        }
      }
    });



    var chart3 = c3.generate({
      bindto: "#chart3",
      data: {
        columns: [
          ['Hours Available', (this.currentPo.hours - this.hours_used)],
        ],
        type: 'gauge',
        onclick: function(d,i){ this.flip_hours_used() },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
      },
      gauge:{
        min: 0,
        max: this.currentPo.hours
        //max: this.currentPo.hours
      },
      color:{
        pattern:[this.gaugue_color_avail],
        threshold:{
          values:[0]
        }
      }
    });


    var chart2 = c3.generate({
      bindto: "#chart2",
      data: {
        columns: [
          ['Hours Invoiced', this.hours_invoiced]
        ],
        type: 'gauge',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
      },
      gauge:{
        min: 0,
        max: this.hours_used
        //max: this.currentPo.hours
      },
      color:{
        pattern:[this.gauge_color_invoiced],
        threshold:{
          values:[0]
        }
      }
    });



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
}

angular.module('ytcwebUirouteApp')
  .controller('ContractorpoCtrl',ContractorpoCtrl);
