/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Po from '../api/po/po.model';
import Client from '../api/client/client.model';
import Invoice from '../api/invoice/invoice.model';

Thing.find({}).removeAsync();

Invoice.find({}).removeAsync()
  .then(()=>{
    console.log('finished deleting invoices');
  });

User.find({}).removeAsync()
  .then(() => {
    User.createAsync({
      provider: 'local',
      first_name: 'Test',
      last_name: 'Name',
      email: 'test@example.com',
      password: 'test',
      validated: true,
      role: 'admin',
      timesheets:[],
      img_url: "assets/images/frog_withshadow.jpg"
    },
      {
        provider: 'local',
        first_name: 'John',
        last_name: 'Millard',
        email: 'test@test.com',
        password: 'test',
        role: 'contractor',
        contractor_rate: 100.00,
        timesheets:[],
        img_url: "assets/images/ytc_president.jpg"
      },

      {
        provider: 'local',
        first_name: 'Jim',
        last_name: 'Bob',
        email: 'test@test2.com',
        password: 'test',
        role: 'contractor',
        contractor_rate: 100.00,
        timesheets:[]
      },
      {
        provider: 'local',
        first_name: 'Captain',
        last_name: 'Crunch',
        email: 'test@test3.com',
        password: 'test',
        role: 'contractor',
        contractor_rate: 100.00,
        timesheets:[]
      },

      {
        provider: 'local',
        first_name: 'Jan',
        last_name: 'Name',
        email: 'client@client.com',
        password: 'client',
        role: 'client',
        client_rate: 100.00,
        client_name: 'Infor Global Solutions',
        timesheets:[],
        img_url: "assets/images/new_infor_logo.jpg"
      },
      {
        provider: 'local',
        first_name: 'Test',
        last_name: 'Client',
        client_name: 'Ingram Micro',
        email: 'client@test.com',
        password: 'test',
        role: 'client',
        client_rate: 110.00,
        timesheets:[],
        img_url: "assets/images/ingram_micro.jpeg"
      })
    .then(() => {
      console.log('finished populating users');
    });
  });


Client.find({}).removeAsync()
  .then(()=> {
    Client.createAsync(
      {
        name: "ClientA",
        info: "This is a test Client ONE",
        addr1: "1234 Street",
        addr2: "",
        city: "Caledonia",
        state: "MI",
        zip: "49316",
        rate: 100
      },
      {
        name: "Client2",
        info: "This is a test Client TWO",
        addr1: "1234 Road",
        addr2: "PO 1234",
        city: "Alto",
        state: "MI",
        zip: "49302",
        rate: 125
      }).then(() => {
      console.log('finished populating Clients');
    });
  });

Po.find({}).removeAsync()
  .then(()=> {

   //var newUser = new User.createAsync({
   //   provider: 'local',
   //   first_name: 'Test',
   //   last_name: 'Name',
   //   email: 'test@example.com',
   //   password: 'test',
   //   role: 'admin',
   //   timesheets:[]
   // });
   //
   // newUser.save(function(err){
   //   if(err){
   //     return handleError(err)
   //   }
   // });
  Po.createAsync(
    {
      poid: "PO1",
      podesc: "Test PO1",
      hours: 100,
      project: "PRJ1001"
    },
    {
      poid: "PO2",
      podesc: "Test PO2",
      hours: 50,
      project: "PRJ0345"

    },
    {
      poid: "PO3",
      podesc: "Test PO3",
      hours: 100,
      project: "PRJ4568"
    },
    {
      poid: "PO4",
      podesc: "Test PO4",
      hours: 25,
      project: "PRJ4567",
      status: "closed"
    })
  .then(() => {
  console.log('finished populating POs');
  });
});
