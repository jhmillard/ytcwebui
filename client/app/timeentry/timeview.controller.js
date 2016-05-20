'use strict';

class TimeViewCtrl{

  constructor($state,PoContractor,PoHoursUsed,Po, User,$filter, $stateParams) {

    this.$state = $state;
    this.updateForm = true;
    this.validTime = false;
    this.updateIndex = 0;
    this.userid = $stateParams.userid;
    this.User = User;
    this.hoursUsed = PoHoursUsed;
    this.$filter = $filter;
    this.categories = [];
    this.submitbutton = "Add";
    this.allowDelete = false;


    this.currentuser = User.get({id: $stateParams.userid}, ()=> {

      if ($stateParams.timesheetid == 0) {
        //this is an insert scenario
        this.updateForm = false;
        this.validTime = true;


      }
      else {
        this.submitbutton = "Update";
        this.timesheetidx = 0;
        this.allowDelete = true;
        //we need to iterate through our timesheets to find the one for our ID.

        angular.forEach(this.currentuser.timesheets,
          (value, key) => {
            if (this.currentuser.timesheets[key]._id == $stateParams.timesheetid) {
              this.validTime = true;
              this.timesheet = this.currentuser.timesheets[key];
              this.timesheet.date = new Date(this.currentuser.timesheets[key].date);
              this.timePO = Po.get({id: this.timesheet.po.id}, ()=> {
                User.get({id: this.timePO.client}, (client)=> {
                  this.timesheet.client_image = client.img_url;
                  this.timesheet.client_name = client.client_name;
                })
              })
              //this.timesheet.category = this.currentuser.timesheets[key].category;
            }
          });
      }

      this.contractorpos = PoContractor.get({contractor: this.currentuser._id});
    })


  }

  back(){
    window.history.back();
  }

}




angular.module('ytcwebUirouteApp')
  .controller('TimeViewCtrl', TimeViewCtrl);
