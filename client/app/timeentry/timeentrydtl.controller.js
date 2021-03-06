'use strict';

class TimeentryDetailCtrl{

  constructor($state,PoContractor,PoHoursUsed, User,$filter, $stateParams,PoValue, Po,PoId, user, currentpos){

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
    this.showindeterminate = false;
    this.PoContractor = PoContractor;
    this.contractorpos = [{}];
    this.hours_available = 0;
    this.hours_available_visible = 0;
    this.hours_available_warning = false;
    this.Po = Po;
    this.Poid = PoId;
    this.PoValue = PoValue;
    this.currentuser = {};

    this.poupdate = {
      _id: 0,
      hours: 0
    };

    this.timesheet = {
      skillset: {
        code: {
          cplus: false,
          javascript: false,
          csharp: false,
          plsql: false,
          java: false
        },
        db: {
          oracle: false,
          sqlserver: false,
          mysql: false,
          mongo: false
        },
        leadership: {
          management: false,
          training: false
        }
      }
    };

    this.currentuser = user;
    this.contractorpos = currentpos;

    if($stateParams.timesheetid == 0)
    {
      //this is an insert scenario
      this.updateForm = false;
      this.validTime = true;

    }
    else
    {
      this.submitbutton = "Update";
      this.timesheetidx = 0;
      this.allowDelete = true;
      //we need to iterate through our timesheets to find the one for our ID.

      this.timesheet = this.currentuser.timesheets.find(timesheetid => timesheetid._id === $stateParams.timesheetid);
      this.timesheet.date = new Date(this.timesheet.date);
      //this.setcategories(this.timesheet.date,this.timesheet.category,this.timesheet.po._id);

      //angular.forEach(this.currentuser.timesheets,
      //  (value, key) => {
      //
      //    this.iterated_id = this.currentuser.timesheets[key]._id;
      //
      //    if(this.currentuser.timesheets[key]._id == $stateParams.timesheetid){
      //      this.validTime = true;
      //      this.timesheet = this.currentuser.timesheets[key];
      //      this.timesheet.date = new Date(this.currentuser.timesheets[key].date);
      //      this.setcategories(this.currentuser.timesheet.date,this.currentuser.timesheet.category,this.currentuser.timesheet.po._id);
      //      this.timesheetidx = key;
      //      //this.timesheet.category = this.currentuser.timesheets[key].category;
      //    }
      //
      //  });
    }





    this.status = [
      {
        type:'entered',
        desc:'Entered'
      },
      {
        type:'invoiced',
        desc:'Invoiced'
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
  }

  removeTimesheet(){

    this.currentuser.timesheets.splice(this.timesheetidx,1);
    //now do an update on current user.
    this.User.update(this.currentuser,()=>{
      this.$state.go('timeentry');
    });

  }

  adjustAvailable(){

    if(this.timesheet.hours > 0){
      this.hours_available_visible = this.hours_available - this.timesheet.hours;
    }else{
      this.hours_available_visible = this.poValue.get;
    }

    if(this.hours_available_visible < 0){
      this.hours_available_warning = true;
      this.hours_available_visible = 0;
    }else{
      this.hours_available_warning = false;
    }

  }


  setcategories(time,updatecat,po){
    this.timesheetList = this.$filter('filter')(this.currentuser.timesheets,{short_date: moment(time).format('MM/DD/YYYY')});

    var dev_hours = false;
    var admin_hours = false;
    var test_hours = false;

    this.categories = [];

    angular.forEach(this.timesheetList,(value,key)=>{

      if(this.timesheetList[key].po.id == po) {
        var cat = this.timesheetList[key].category;
        if (cat == "dev" && cat != updatecat) {
          dev_hours = true;
        }
        if (cat == "admin" && cat != updatecat) {
          admin_hours = true;
        }
        if (cat == "test" && cat != updatecat) {
          test_hours = true;
        }
      }
    })

    if(!dev_hours){
      this.categories.push({
        type: "dev",
        desc: "Development"
      })
    }
    if(!admin_hours){
      this.categories.push({
        type: "admin",
        desc: "Administration"
      })
    }
    if(!test_hours){
      this.categories.push({
        type: "test",
        desc: "Test"
      })
    }


    this.Po.get({id:po._id},(selectedPo)=>{
      var poTimesheets = this.$filter('filter')(this.currentuser.timesheets,{po:{id:po._id}});
      this.hours_available = this.hours_available_visible = this.PoValue.getPoHoursAvailable(selectedPo,poTimesheets);
      this.timesheet.po = selectedPo;
    })


  }

  cancel(){
    //this.$state.go('timeentry');
    window.history.back();
  }

  register(form) {
    this.submitted = true;

    var timerow = {};

    if(this.hours_available_warning){
      alert("You have a discrepancy with the hours you entered!");
      exit;
    }




    timerow ={
      po:{
        id:  this.timesheet.po._id,
        name: this.timesheet.po.poid
      },
      date: new Date(this.timesheet.date),
      short_date: moment(this.timesheet.date).format('MM/DD/YYYY'),
      hours: this.timesheet.hours,
      category: this.timesheet.category,
      desc: this.timesheet.desc,
      status: "entered",

      skillset:{
        code:{
          cplus:angular.isDefined(this.timesheet.skillset.code.cplus)?this.timesheet.skillset.code.cplus:false,
          javascript:angular.isDefined(this.timesheet.skillset.code.javascript)?this.timesheet.skillset.code.javascript:false,
          csharp:angular.isDefined(this.timesheet.skillset.code.csharp)?this.timesheet.skillset.code.csharp:false,
          plsql:angular.isDefined(this.timesheet.skillset.code.plsql)?this.timesheet.skillset.code.plsql:false,
          java:angular.isDefined(this.timesheet.skillset.code.java)?this.timesheet.skillset.code.java:false,
        },
        db:{
          oracle:this.timesheet.skillset.db.oracle,
          sqlserver:this.timesheet.skillset.db.sqlserver,
          mysql:this.timesheet.skillset.db.mysql,
          mongo:this.timesheet.skillset.db.mongo
        },
        leadership:{
          management:this.timesheet.skillset.leadership.management,
          training:this.timesheet.skillset.leadership.training
        }
      }

      //fill the skills that were selected

    };

    this.poupdate._id = timerow.po.id;
    this.poupdate.hours = timerow.hours;

    if(this.updateForm){
      this.currentuser.timesheets[this.timesheetidx] = timerow;
    }else{
      this.currentuser.timesheets.push(timerow);
    }

    if (form.$valid) {
      this.User.update(this.currentuser,()=> {
        //this.hoursUsed.update(this.poupdate, ()=>{
          var entryJSON = {};
          entryJSON.contractor = this.currentuser.first_name + " " + this.currentuser.last_name;
          entryJSON.po = timerow.po.name;
          entryJSON.hours = timerow.hours;
          timerow.contractor =  this.currentuser.first_name + " " + this.currentuser.last_name;


          this.showindeterminate = true;
          this.User.email(timerow,()=>{
            this.$state.go('contractordash',{},{reload: true});
          });
          //this.$state.go('contractordash',{},{reload: true});

          //window.history.back();
          //window.location.replace(document.referrer)

        //});

      });

    }
  }
}




angular.module('ytcwebUirouteApp')
  .controller('TimeentryDetailCtrl', TimeentryDetailCtrl);
