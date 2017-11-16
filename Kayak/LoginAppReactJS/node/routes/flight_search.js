var mysql = require('./mysql');

var roundTrip=1;
var date="2017-11-05";
var category='e'; //e f b
var number_of_seats=10;
var number_of_seats_c=2;
var from='SFO';
var to='SJ';

var d=new Date(date);

function flight_details(){
  if(roundTrip==0){
    direct();
  }else{
    round();
  }
}

function direct(){

  var fetchDataSQL,fetchDataSQL1,fetchOtherFlights,fetch1;
  var arrayOfFlights=[];
  var returnFlight=[];
  var t;

  if(category==='e'){
    fetchDataSQL = "select f_id,sum(b.booked_seats_e) as seats from flight_booking b where b.flight_date_s = '"+date+"' and  b.f_id in (	select f_id from kayak.flight f	where f.from='"+from+"' and f.to='"+to+"' and f.day_no='"+d.getUTCDay()+"' ) group by b.f_id";
  }else if(category==='f'){
    fetchDataSQL = "select f_id,sum(b.booked_seats_f) as seats from flight_booking b where b.flight_date_s = '"+date+"' and  b.f_id in (	select f_id from kayak.flight f	where f.from='"+from+"' and f.to='"+to+"' and f.day_no='"+d.getUTCDay()+"' ) group by b.f_id";
  }else if(category==='b'){
    fetchDataSQL = "select f_id,sum(b.booked_seats_b) as seats from flight_booking b where b.flight_date_s = '"+date+"' and  b.f_id in (	select f_id from kayak.flight f	where f.from='"+from+"' and f.to='"+to+"' and f.day_no='"+d.getUTCDay()+"' ) group by b.f_id";
  }

  mysql.fetchData(function(err,results){
     if(err){
        throw err;
     } else {

       console.log("Query results", results);
       console.log("date "+d.getUTCDay());

       for(var i=0;i<results.length;i++){
         arrayOfFlights.push("'"+results[i].f_id+"'");
       }

       console.log(arrayOfFlights);

       if(arrayOfFlights>0){
         if(category==='e'){
           fetchDataSQL1 = "select f_id, airline_name, fare_e, fare_child_e, capacity_e, time_s, time_e from flight where f_id in ("+arrayOfFlights+")";
         }else if(category==='f'){
           fetchDataSQL1 = "select f_id, airline_name, fare_f, fare_child_f, capacity_f, time_s, time_e from flight where f_id in ("+arrayOfFlights+")";
         }else if(category==='b'){
           fetchDataSQL1 = "select f_id, airline_name, fare_b, fare_child_b, capacity_b, time_s, time_e from flight where f_id in ("+arrayOfFlights+")";
         }
         mysql.fetchData(function(err,results1){
           if(err){
             throw error;
           } else {
             for(var i=0;i<results1.length;i++){
               if(category==='e'){
                 if(results1[i].capacity_e-results[i].seats>number_of_seats){
                   t=results1[i];
                   var s=Number(t.time_s.substring(0,t.time_s.indexOf(':'))*3600)+Number(t.time_s.substring(t.time_s.indexOf(':')+1,t.time_s.lastIndexOf(':'))*60);
                   var e=Number(t.time_e.substring(0,t.time_e.indexOf(':'))*3600)+Number(t.time_e.substring(t.time_e.indexOf(':')+1,t.time_e.lastIndexOf(':'))*60);
                   if(e>s){
                     t.duration=e-s;
                   }else{
                     t.duration=86400+e-s;
                   }
                   t.duration=parseInt(t.duration/3600)+":"+('0'+Number(parseInt((t.duration-parseInt(t.duration/3600)*3600)/60))).slice(-2)+":00";
                   returnFlight.push(t);
                 }
               }else if(category==='f'){
                 if(results1[i].capacity_f-results[i].seats>number_of_seats){
                   t=results1[i];
                   var s=Number(t.time_s.substring(0,t.time_s.indexOf(':'))*3600)+Number(t.time_s.substring(t.time_s.indexOf(':')+1,t.time_s.lastIndexOf(':'))*60);
                   var e=Number(t.time_e.substring(0,t.time_e.indexOf(':'))*3600)+Number(t.time_e.substring(t.time_e.indexOf(':')+1,t.time_e.lastIndexOf(':'))*60);
                   if(e>s){
                     t.duration=e-s;
                   }else{
                     t.duration=86400+e-s;
                   }
                   t.duration=parseInt(t.duration/3600)+":"+('0'+Number(parseInt((t.duration-parseInt(t.duration/3600)*3600)/60))).slice(-2)+":00";
                   t.duration=0;
                   returnFlight.push(t);
                 }
               }else if(category==='b'){
                 if(results1[i].capacity_b-results[i].seats>number_of_seats){
                   t=results1[i];
                   var s=Number(t.time_s.substring(0,t.time_s.indexOf(':'))*3600)+Number(t.time_s.substring(t.time_s.indexOf(':')+1,t.time_s.lastIndexOf(':'))*60);
                   var e=Number(t.time_e.substring(0,t.time_e.indexOf(':'))*3600)+Number(t.time_e.substring(t.time_e.indexOf(':')+1,t.time_e.lastIndexOf(':'))*60);
                   if(e>s){
                     t.duration=e-s;
                   }else{
                     t.duration=86400+e-s;
                   }
                   t.duration=parseInt(t.duration/3600)+":"+('0'+Number(parseInt((t.duration-parseInt(t.duration/3600)*3600)/60))).slice(-2)+":00";
                   t.duration=0;
                   returnFlight.push(t);
                 }
               }
             }
           }
           console.log(returnFlight);

           fetchOtherFlights = "select f_id, airline_name, fare_f, fare_child_f, capacity_f, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no='"+d.getUTCDay()+"' and f_id not in ("+arrayOfFlights+")";



         },fetchDataSQL1);
       }
     }
  }, fetchDataSQL);
}

function round(){
}

exports.flight_details = flight_details;
