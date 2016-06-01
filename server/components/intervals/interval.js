


'use strict';

import _ from 'lodash';
import Invoice from '../../api/invoice/invoice.model';
var moment = require('moment');
var nodemailer = require('nodemailer');


//now we are going to try to create our interval timer here.
setInterval(function(){


  Invoice.findAsync({status:'sent'})
    .then((response)=>{

      var expiredInvoices = [];
      for(var i = 0; i < response.length; i++) {
        var invoice = new Invoice();
        invoice = response[i];




        var current_date = moment().format('MM/DD/YYYY');
        var start_date = moment(current_date,'MM/DD/YYYY');
        var end_date = moment(invoice.date,'MM/DD/YYYY');
        var day_diff = start_date.diff(end_date,'days');

        if(day_diff > 30){
          //at this point we need to push the current invoice into the expired array
          expiredInvoices.push(invoice);
        }

        console.log("found invoice/date/formatted date: " + invoice.name + " / " + invoice.date  + "-" + current_date);
        console.log("start date: " + start_date);
        console.log("end date: " + end_date);
        console.log("Date difference in days: " + day_diff);
        sendInvoiceEmailNotification(expiredInvoices);

      }

    })
    .catch(()=>{
      console.log("An error occured");
    });

  //now we will select the invoices where status = 'entered';

  console.log("current month: " + moment().format('MM/DD/YYYY'));

  console.log("Current Time-"+new Date());
}, 1000 * 60 * 60 * 24)

export function sendInvoiceEmailNotification(expiredInvoices) {

//  This is where we will format and send an email/text to configured users.
}

