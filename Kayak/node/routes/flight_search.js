var mysql = require('./mysql');

var express = require('express');
var router = express();

var roundTrip=0;
var date="2017-11-05";
var category='e'; //e f b
var number_of_seats=30;
var number_of_seats_c=2;
var from='SFO';
var to='SJ';

var d=new Date(date);

router.get('/from', function (req, res, next) {
  var fetchDataSQL,flight=[];

  fetchDataSQL = "select distinct f.from from flight f order by f.from";

  mysql.fetchData(function(err,results){
     if(err){
       throw err;
     } else {
       console.log(results);
       for(var i=0;i<results.length;i++){
         flight.push(results[i].from);
       }
       console.log(flight);
       res.status(201).json({message: "Data",from:flight});
     }
  }, fetchDataSQL);
});

router.get('/to', function (req, res, next) {
  var fetchDataSQL,flight=[];

  fetchDataSQL = "select distinct f.to from flight f order by f.to";

  mysql.fetchData(function(err,results){
     if(err){
       throw err;
     } else {
       console.log(results);
       for(var i=0;i<results.length;i++){
         flight.push(results[i].to);
       }
       console.log(flight);
       res.status(201).json({message: "Data",to:flight});
     }
  }, fetchDataSQL);
});

router.get('/search', function (req, res, next) {
  var date=req.query.date;
  var category; //e f b
  if(req.query.category==="economy"){
    category="e";
  }else if(req.query.category==="first"){
    category="f";
  }else{
    category="b";
  }
  var number_of_seats=req.query.number_of_seats;
  var number_of_seats_c=req.query.number_of_seats_c;
  var from=req.query.from;
  var to=req.query.to;

  console.log(from+" "+to);
  console.log(req.query.category);
  console.log(req.query.date);
  console.log(req.query.number_of_seats_c);
  console.log(req.query.number_of_seats);

  var d=new Date(date);

  var fetchDataSQL,fetchDataSQL1,fetchDataSQL4;
  var arrayOfFlights=[];
  var returnFlightS=[];
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

       if(arrayOfFlights.length>0){
         if(category==='e'){
           fetchDataSQL4 = "select f_id, airline_name, fare_e, fare_child_e, capacity_e, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no='"+d.getUTCDay()+"' and f_id not in ("+arrayOfFlights+")";
         }else if(category==='f'){
           fetchDataSQL4 = "select f_id, airline_name, fare_f, fare_child_f, capacity_f, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no='"+d.getUTCDay()+"' and f_id not in ("+arrayOfFlights+")";
         }else if(category==='b'){
           fetchDataSQL4 = "select f_id, airline_name, fare_b, fare_child_b, capacity_b, time_s, time_e from flight f where f.from='"+fromto+"' and f.to='"+to+"' and f.day_no='"+d.getUTCDay()+"' and f_id not in ("+arrayOfFlights+")";
         }
       }else{
         if(category==='e'){
           fetchDataSQL4 = "select f_id, airline_name, fare_e, fare_child_e, capacity_e, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no="+d.getUTCDay();
         }else if(category==='f'){
           fetchDataSQL4 = "select f_id, airline_name, fare_f, fare_child_f, capacity_f, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no="+d.getUTCDay();
         }else if(category==='b'){
           fetchDataSQL4 = "select f_id, airline_name, fare_b, fare_child_b, capacity_b, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no="+d.getUTCDay();
         }
       }

       mysql.fetchData(function(err,results4){
         if(err){
           throw error;
         } else {
           for(var i=0;i<results4.length;i++){
             if(category==='e'){
               if(results4[i].capacity_e>=number_of_seats){
                 t=results4[i];
                 var s=Number(t.time_s.substring(0,t.time_s.indexOf(':'))*3600)+Number(t.time_s.substring(t.time_s.indexOf(':')+1,t.time_s.lastIndexOf(':'))*60);
                 var e=Number(t.time_e.substring(0,t.time_e.indexOf(':'))*3600)+Number(t.time_e.substring(t.time_e.indexOf(':')+1,t.time_e.lastIndexOf(':'))*60);
                 if(e>s){
                   t.duration=e-s;
                 }else{
                   t.duration=86400+e-s;
                 }
                 t.duration=('0'+parseInt(t.duration/3600)).slice(-2)+":"+('0'+Number(parseInt((t.duration-parseInt(t.duration/3600)*3600)/60))).slice(-2)+":00";
                 returnFlightS.push(t);
               }
             }else if(category==='f'){
               if(results4[i].capacity_e>=number_of_seats){
                 t=results4[i];
                 var s=Number(t.time_s.substring(0,t.time_s.indexOf(':'))*3600)+Number(t.time_s.substring(t.time_s.indexOf(':')+1,t.time_s.lastIndexOf(':'))*60);
                 var e=Number(t.time_e.substring(0,t.time_e.indexOf(':'))*3600)+Number(t.time_e.substring(t.time_e.indexOf(':')+1,t.time_e.lastIndexOf(':'))*60);
                 if(e>s){
                   t.duration=e-s;
                 }else{
                   t.duration=86400+e-s;
                 }
                 t.duration=('0'+parseInt(t.duration/3600)).slice(-2)+":"+('0'+Number(parseInt((t.duration-parseInt(t.duration/3600)*3600)/60))).slice(-2)+":00";
                 returnFlightS.push(t);
               }
             }else if(category==='b'){
               if(results4[i].capacity_e>=number_of_seats){
                 t=results4[i];
                 var s=Number(t.time_s.substring(0,t.time_s.indexOf(':'))*3600)+Number(t.time_s.substring(t.time_s.indexOf(':')+1,t.time_s.lastIndexOf(':'))*60);
                 var e=Number(t.time_e.substring(0,t.time_e.indexOf(':'))*3600)+Number(t.time_e.substring(t.time_e.indexOf(':')+1,t.time_e.lastIndexOf(':'))*60);
                 if(e>s){
                   t.duration=e-s;
                 }else{
                   t.duration=86400+e-s;
                 }
                 t.duration=('0'+parseInt(t.duration/3600)).slice(-2)+":"+('0'+Number(parseInt((t.duration-parseInt(t.duration/3600)*3600)/60))).slice(-2)+":00";
                 returnFlightS.push(t);
               }
             }
           }
           if(arrayOfFlights.length>0){
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

                 fetchDataSQL4 = "select f_id, airline_name, fare_f, fare_child_f, capacity_f, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no='"+d.getUTCDay()+"' and f_id not in ("+arrayOfFlights+")";

                 for(var i=0;i<results1.length;i++){
                   if(category==='e'){
                     if(results1[i].capacity_e-results[i].seats>=number_of_seats){
                       t=results1[i];
                       var s=Number(t.time_s.substring(0,t.time_s.indexOf(':'))*3600)+Number(t.time_s.substring(t.time_s.indexOf(':')+1,t.time_s.lastIndexOf(':'))*60);
                       var e=Number(t.time_e.substring(0,t.time_e.indexOf(':'))*3600)+Number(t.time_e.substring(t.time_e.indexOf(':')+1,t.time_e.lastIndexOf(':'))*60);
                       if(e>s){
                         t.duration=e-s;
                       }else{
                         t.duration=86400+e-s;
                       }
                       t.duration=('0'+parseInt(t.duration/3600)).slice(-2)+":"+('0'+Number(parseInt((t.duration-parseInt(t.duration/3600)*3600)/60))).slice(-2)+":00";
                       returnFlightS.push(t);
                     }
                   }else if(category==='f'){
                     if(results1[i].capacity_f-results[i].seats>=number_of_seats){
                       t=results1[i];
                       var s=Number(t.time_s.substring(0,t.time_s.indexOf(':'))*3600)+Number(t.time_s.substring(t.time_s.indexOf(':')+1,t.time_s.lastIndexOf(':'))*60);
                       var e=Number(t.time_e.substring(0,t.time_e.indexOf(':'))*3600)+Number(t.time_e.substring(t.time_e.indexOf(':')+1,t.time_e.lastIndexOf(':'))*60);
                       if(e>s){
                         t.duration=e-s;
                       }else{
                         t.duration=86400+e-s;
                       }
                       t.duration=('0'+parseInt(t.duration/3600)).slice(-2)+":"+('0'+Number(parseInt((t.duration-parseInt(t.duration/3600)*3600)/60))).slice(-2)+":00";
                       returnFlightS.push(t);
                     }
                   }else if(category==='b'){
                     if(results1[i].capacity_b-results[i].seats>=number_of_seats){
                       t=results1[i];
                       var s=Number(t.time_s.substring(0,t.time_s.indexOf(':'))*3600)+Number(t.time_s.substring(t.time_s.indexOf(':')+1,t.time_s.lastIndexOf(':'))*60);
                       var e=Number(t.time_e.substring(0,t.time_e.indexOf(':'))*3600)+Number(t.time_e.substring(t.time_e.indexOf(':')+1,t.time_e.lastIndexOf(':'))*60);
                       if(e>s){
                         t.duration=e-s;
                       }else{
                         t.duration=86400+e-s;
                       }
                       t.duration=('0'+parseInt(t.duration/3600)).slice(-2)+":"+('0'+Number(parseInt((t.duration-parseInt(t.duration/3600)*3600)/60))).slice(-2)+":00";
                       returnFlightS.push(t);
                     }
                   }
                 }
               }
               console.log("return flights straight: \n",returnFlightS);
               res.status(200).json({message:"flights inside",returnFlightS:returnFlightS});
             },fetchDataSQL1);
           }else{
             console.log("return flights straight: \n",returnFlightS);
             res.status(200).json({message:"flights inside",returnFlightS:returnFlightS});
           }
         }
       },fetchDataSQL4);
     }
  }, fetchDataSQL);
});

/*function flight_details(){
  if(roundTrip==0){
    direct();
  }else{
    round();
  }
}

function direct(){
  var fetchDataSQL,fetchDataSQL1,fetchDataSQL4;
  var arrayOfFlights=[];
  var returnFlightS=[];
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

       if(arrayOfFlights.length>0){
         if(category==='e'){
           fetchDataSQL4 = "select f_id, airline_name, fare_e, fare_child_e, capacity_e, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no='"+d.getUTCDay()+"' and f_id not in ("+arrayOfFlights+")";
         }else if(category==='f'){
           fetchDataSQL4 = "select f_id, airline_name, fare_f, fare_child_f, capacity_f, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no='"+d.getUTCDay()+"' and f_id not in ("+arrayOfFlights+")";
         }else if(category==='b'){
           fetchDataSQL4 = "select f_id, airline_name, fare_b, fare_child_b, capacity_b, time_s, time_e from flight f where f.from='"+fromto+"' and f.to='"+to+"' and f.day_no='"+d.getUTCDay()+"' and f_id not in ("+arrayOfFlights+")";
         }
       }else{
         if(category==='e'){
           fetchDataSQL4 = "select f_id, airline_name, fare_e, fare_child_e, capacity_e, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no="+d.getUTCDay();
         }else if(category==='f'){
           fetchDataSQL4 = "select f_id, airline_name, fare_f, fare_child_f, capacity_f, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no="+d.getUTCDay();
         }else if(category==='b'){
           fetchDataSQL4 = "select f_id, airline_name, fare_b, fare_child_b, capacity_b, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no="+d.getUTCDay();
         }
       }

       mysql.fetchData(function(err,results4){
         if(err){
           throw error;
         } else {
           for(var i=0;i<results4.length;i++){
             if(category==='e'){
               if(results4[i].capacity_e>=number_of_seats){
                 t=results4[i];
                 var s=Number(t.time_s.substring(0,t.time_s.indexOf(':'))*3600)+Number(t.time_s.substring(t.time_s.indexOf(':')+1,t.time_s.lastIndexOf(':'))*60);
                 var e=Number(t.time_e.substring(0,t.time_e.indexOf(':'))*3600)+Number(t.time_e.substring(t.time_e.indexOf(':')+1,t.time_e.lastIndexOf(':'))*60);
                 if(e>s){
                   t.duration=e-s;
                 }else{
                   t.duration=86400+e-s;
                 }
                 t.duration=('0'+parseInt(t.duration/3600)).slice(-2)+":"+('0'+Number(parseInt((t.duration-parseInt(t.duration/3600)*3600)/60))).slice(-2)+":00";
                 returnFlightS.push(t);
               }
             }else if(category==='f'){
               if(results4[i].capacity_e>=number_of_seats){
                 t=results4[i];
                 var s=Number(t.time_s.substring(0,t.time_s.indexOf(':'))*3600)+Number(t.time_s.substring(t.time_s.indexOf(':')+1,t.time_s.lastIndexOf(':'))*60);
                 var e=Number(t.time_e.substring(0,t.time_e.indexOf(':'))*3600)+Number(t.time_e.substring(t.time_e.indexOf(':')+1,t.time_e.lastIndexOf(':'))*60);
                 if(e>s){
                   t.duration=e-s;
                 }else{
                   t.duration=86400+e-s;
                 }
                 t.duration=('0'+parseInt(t.duration/3600)).slice(-2)+":"+('0'+Number(parseInt((t.duration-parseInt(t.duration/3600)*3600)/60))).slice(-2)+":00";
                 returnFlightS.push(t);
               }
             }else if(category==='b'){
               if(results4[i].capacity_e>=number_of_seats){
                 t=results4[i];
                 var s=Number(t.time_s.substring(0,t.time_s.indexOf(':'))*3600)+Number(t.time_s.substring(t.time_s.indexOf(':')+1,t.time_s.lastIndexOf(':'))*60);
                 var e=Number(t.time_e.substring(0,t.time_e.indexOf(':'))*3600)+Number(t.time_e.substring(t.time_e.indexOf(':')+1,t.time_e.lastIndexOf(':'))*60);
                 if(e>s){
                   t.duration=e-s;
                 }else{
                   t.duration=86400+e-s;
                 }
                 t.duration=('0'+parseInt(t.duration/3600)).slice(-2)+":"+('0'+Number(parseInt((t.duration-parseInt(t.duration/3600)*3600)/60))).slice(-2)+":00";
                 returnFlightS.push(t);
               }
             }
           }
           if(arrayOfFlights.length>0){
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

                 fetchDataSQL4 = "select f_id, airline_name, fare_f, fare_child_f, capacity_f, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no='"+d.getUTCDay()+"' and f_id not in ("+arrayOfFlights+")";

                 for(var i=0;i<results1.length;i++){
                   if(category==='e'){
                     if(results1[i].capacity_e-results[i].seats>=number_of_seats){
                       t=results1[i];
                       var s=Number(t.time_s.substring(0,t.time_s.indexOf(':'))*3600)+Number(t.time_s.substring(t.time_s.indexOf(':')+1,t.time_s.lastIndexOf(':'))*60);
                       var e=Number(t.time_e.substring(0,t.time_e.indexOf(':'))*3600)+Number(t.time_e.substring(t.time_e.indexOf(':')+1,t.time_e.lastIndexOf(':'))*60);
                       if(e>s){
                         t.duration=e-s;
                       }else{
                         t.duration=86400+e-s;
                       }
                       t.duration=('0'+parseInt(t.duration/3600)).slice(-2)+":"+('0'+Number(parseInt((t.duration-parseInt(t.duration/3600)*3600)/60))).slice(-2)+":00";
                       returnFlightS.push(t);
                     }
                   }else if(category==='f'){
                     if(results1[i].capacity_f-results[i].seats>=number_of_seats){
                       t=results1[i];
                       var s=Number(t.time_s.substring(0,t.time_s.indexOf(':'))*3600)+Number(t.time_s.substring(t.time_s.indexOf(':')+1,t.time_s.lastIndexOf(':'))*60);
                       var e=Number(t.time_e.substring(0,t.time_e.indexOf(':'))*3600)+Number(t.time_e.substring(t.time_e.indexOf(':')+1,t.time_e.lastIndexOf(':'))*60);
                       if(e>s){
                         t.duration=e-s;
                       }else{
                         t.duration=86400+e-s;
                       }
                       t.duration=('0'+parseInt(t.duration/3600)).slice(-2)+":"+('0'+Number(parseInt((t.duration-parseInt(t.duration/3600)*3600)/60))).slice(-2)+":00";
                       returnFlightS.push(t);
                     }
                   }else if(category==='b'){
                     if(results1[i].capacity_b-results[i].seats>=number_of_seats){
                       t=results1[i];
                       var s=Number(t.time_s.substring(0,t.time_s.indexOf(':'))*3600)+Number(t.time_s.substring(t.time_s.indexOf(':')+1,t.time_s.lastIndexOf(':'))*60);
                       var e=Number(t.time_e.substring(0,t.time_e.indexOf(':'))*3600)+Number(t.time_e.substring(t.time_e.indexOf(':')+1,t.time_e.lastIndexOf(':'))*60);
                       if(e>s){
                         t.duration=e-s;
                       }else{
                         t.duration=86400+e-s;
                       }
                       t.duration=('0'+parseInt(t.duration/3600)).slice(-2)+":"+('0'+Number(parseInt((t.duration-parseInt(t.duration/3600)*3600)/60))).slice(-2)+":00";
                       returnFlightS.push(t);
                     }
                   }
                 }
               }
               console.log("return flights straight: \n",returnFlightS);
             },fetchDataSQL1);
           }else{
             console.log("return flights straight: \n",returnFlightS);
           }
         }
       },fetchDataSQL4);
     }
  }, fetchDataSQL);
}

function round(){

  var fetchDataSQL,fetchDataSQL1,fetchDataSQL2,fetchDataSQL3,fetchDataSQL4,fetchDataSQL5;
  var arrayOfFlights=[],arrayOfFlightsR=[];
  var returnFlightS=[],returnFlightR=[];
  var t;

  //for straight flight

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

       if(arrayOfFlights.length>0){
         if(category==='e'){
           fetchDataSQL4 = "select f_id, airline_name, fare_e, fare_child_e, capacity_e, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no='"+d.getUTCDay()+"' and f_id not in ("+arrayOfFlights+")";
         }else if(category==='f'){
           fetchDataSQL4 = "select f_id, airline_name, fare_f, fare_child_f, capacity_f, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no='"+d.getUTCDay()+"' and f_id not in ("+arrayOfFlights+")";
         }else if(category==='b'){
           fetchDataSQL4 = "select f_id, airline_name, fare_b, fare_child_b, capacity_b, time_s, time_e from flight f where f.from='"+fromto+"' and f.to='"+to+"' and f.day_no='"+d.getUTCDay()+"' and f_id not in ("+arrayOfFlights+")";
         }
       }else{
         if(category==='e'){
           fetchDataSQL4 = "select f_id, airline_name, fare_e, fare_child_e, capacity_e, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no="+d.getUTCDay();
         }else if(category==='f'){
           fetchDataSQL4 = "select f_id, airline_name, fare_f, fare_child_f, capacity_f, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no="+d.getUTCDay();
         }else if(category==='b'){
           fetchDataSQL4 = "select f_id, airline_name, fare_b, fare_child_b, capacity_b, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no="+d.getUTCDay();
         }
       }

       mysql.fetchData(function(err,results4){
         if(err){
           throw error;
         } else {
           for(var i=0;i<results4.length;i++){
             if(category==='e'){
               if(results4[i].capacity_e>=number_of_seats){
                 t=results4[i];
                 var s=Number(t.time_s.substring(0,t.time_s.indexOf(':'))*3600)+Number(t.time_s.substring(t.time_s.indexOf(':')+1,t.time_s.lastIndexOf(':'))*60);
                 var e=Number(t.time_e.substring(0,t.time_e.indexOf(':'))*3600)+Number(t.time_e.substring(t.time_e.indexOf(':')+1,t.time_e.lastIndexOf(':'))*60);
                 if(e>s){
                   t.duration=e-s;
                 }else{
                   t.duration=86400+e-s;
                 }
                 t.duration=('0'+parseInt(t.duration/3600)).slice(-2)+":"+('0'+Number(parseInt((t.duration-parseInt(t.duration/3600)*3600)/60))).slice(-2)+":00";
                 returnFlightS.push(t);
               }
             }else if(category==='f'){
               if(results4[i].capacity_e>=number_of_seats){
                 t=results4[i];
                 var s=Number(t.time_s.substring(0,t.time_s.indexOf(':'))*3600)+Number(t.time_s.substring(t.time_s.indexOf(':')+1,t.time_s.lastIndexOf(':'))*60);
                 var e=Number(t.time_e.substring(0,t.time_e.indexOf(':'))*3600)+Number(t.time_e.substring(t.time_e.indexOf(':')+1,t.time_e.lastIndexOf(':'))*60);
                 if(e>s){
                   t.duration=e-s;
                 }else{
                   t.duration=86400+e-s;
                 }
                 t.duration=('0'+parseInt(t.duration/3600)).slice(-2)+":"+('0'+Number(parseInt((t.duration-parseInt(t.duration/3600)*3600)/60))).slice(-2)+":00";
                 returnFlightS.push(t);
               }
             }else if(category==='b'){
               if(results4[i].capacity_e>=number_of_seats){
                 t=results4[i];
                 var s=Number(t.time_s.substring(0,t.time_s.indexOf(':'))*3600)+Number(t.time_s.substring(t.time_s.indexOf(':')+1,t.time_s.lastIndexOf(':'))*60);
                 var e=Number(t.time_e.substring(0,t.time_e.indexOf(':'))*3600)+Number(t.time_e.substring(t.time_e.indexOf(':')+1,t.time_e.lastIndexOf(':'))*60);
                 if(e>s){
                   t.duration=e-s;
                 }else{
                   t.duration=86400+e-s;
                 }
                 t.duration=('0'+parseInt(t.duration/3600)).slice(-2)+":"+('0'+Number(parseInt((t.duration-parseInt(t.duration/3600)*3600)/60))).slice(-2)+":00";
                 returnFlightS.push(t);
               }
             }
           }
           if(arrayOfFlights.length>0){
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

                 fetchDataSQL4 = "select f_id, airline_name, fare_f, fare_child_f, capacity_f, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no='"+d.getUTCDay()+"' and f_id not in ("+arrayOfFlights+")";

                 for(var i=0;i<results1.length;i++){
                   if(category==='e'){
                     if(results1[i].capacity_e-results[i].seats>=number_of_seats){
                       t=results1[i];
                       var s=Number(t.time_s.substring(0,t.time_s.indexOf(':'))*3600)+Number(t.time_s.substring(t.time_s.indexOf(':')+1,t.time_s.lastIndexOf(':'))*60);
                       var e=Number(t.time_e.substring(0,t.time_e.indexOf(':'))*3600)+Number(t.time_e.substring(t.time_e.indexOf(':')+1,t.time_e.lastIndexOf(':'))*60);
                       if(e>s){
                         t.duration=e-s;
                       }else{
                         t.duration=86400+e-s;
                       }
                       t.duration=('0'+parseInt(t.duration/3600)).slice(-2)+":"+('0'+Number(parseInt((t.duration-parseInt(t.duration/3600)*3600)/60))).slice(-2)+":00";
                       returnFlightS.push(t);
                     }
                   }else if(category==='f'){
                     if(results1[i].capacity_f-results[i].seats>=number_of_seats){
                       t=results1[i];
                       var s=Number(t.time_s.substring(0,t.time_s.indexOf(':'))*3600)+Number(t.time_s.substring(t.time_s.indexOf(':')+1,t.time_s.lastIndexOf(':'))*60);
                       var e=Number(t.time_e.substring(0,t.time_e.indexOf(':'))*3600)+Number(t.time_e.substring(t.time_e.indexOf(':')+1,t.time_e.lastIndexOf(':'))*60);
                       if(e>s){
                         t.duration=e-s;
                       }else{
                         t.duration=86400+e-s;
                       }
                       t.duration=('0'+parseInt(t.duration/3600)).slice(-2)+":"+('0'+Number(parseInt((t.duration-parseInt(t.duration/3600)*3600)/60))).slice(-2)+":00";
                       returnFlightS.push(t);
                     }
                   }else if(category==='b'){
                     if(results1[i].capacity_b-results[i].seats>=number_of_seats){
                       t=results1[i];
                       var s=Number(t.time_s.substring(0,t.time_s.indexOf(':'))*3600)+Number(t.time_s.substring(t.time_s.indexOf(':')+1,t.time_s.lastIndexOf(':'))*60);
                       var e=Number(t.time_e.substring(0,t.time_e.indexOf(':'))*3600)+Number(t.time_e.substring(t.time_e.indexOf(':')+1,t.time_e.lastIndexOf(':'))*60);
                       if(e>s){
                         t.duration=e-s;
                       }else{
                         t.duration=86400+e-s;
                       }
                       t.duration=('0'+parseInt(t.duration/3600)).slice(-2)+":"+('0'+Number(parseInt((t.duration-parseInt(t.duration/3600)*3600)/60))).slice(-2)+":00";
                       returnFlightS.push(t);
                     }
                   }
                 }
               }
               console.log("return flights straight: \n",returnFlightS);
             },fetchDataSQL1);
           }else{
             console.log("return flights straight: \n",returnFlightS);
           }
         }
       },fetchDataSQL4);
     }
  }, fetchDataSQL);

  //for return flight

  if(category==='e'){
    fetchDataSQL2 = "select f_id,sum(b.booked_seats_e) as seats from flight_booking b where b.flight_date_s = '"+date+"' and  b.f_id in (	select f_id from kayak.flight f	where f.from='"+to+"' and f.to='"+from+"' and f.day_no='"+d.getUTCDay()+"' ) group by b.f_id";
  }else if(category==='f'){
    fetchDataSQL2 = "select f_id,sum(b.booked_seats_f) as seats from flight_booking b where b.flight_date_s = '"+date+"' and  b.f_id in (	select f_id from kayak.flight f	where f.from='"+to+"' and f.to='"+from+"' and f.day_no='"+d.getUTCDay()+"' ) group by b.f_id";
  }else if(category==='b'){
    fetchDataSQL2 = "select f_id,sum(b.booked_seats_b) as seats from flight_booking b where b.flight_date_s = '"+date+"' and  b.f_id in (	select f_id from kayak.flight f	where f.from='"+to+"' and f.to='"+from+"' and f.day_no='"+d.getUTCDay()+"' ) group by b.f_id";
  }

  mysql.fetchData(function(err,results2){

     if(err){
        throw err;
     } else {
       console.log("Query results", results2);
       console.log("date "+d.getUTCDay());

       for(var i=0;i<results2.length;i++){
         arrayOfFlightsR.push("'"+results2[i].f_id+"'");
       }

       console.log(arrayOfFlightsR);

       if(arrayOfFlightsR.length>0){
         if(category==='e'){
           fetchDataSQL5 = "select f_id, airline_name, fare_e, fare_child_e, capacity_e, time_s, time_e from flight f where f.from='"+to+"' and f.to='"+from+"' and f.day_no='"+d.getUTCDay()+"' and f_id not in ("+arrayOfFlightsR+")";
         }else if(category==='f'){
           fetchDataSQL5 = "select f_id, airline_name, fare_f, fare_child_f, capacity_f, time_s, time_e from flight f where f.from='"+to+"' and f.to='"+from+"' and f.day_no='"+d.getUTCDay()+"' and f_id not in ("+arrayOfFlightsR+")";
         }else if(category==='b'){
           fetchDataSQL5 = "select f_id, airline_name, fare_b, fare_child_b, capacity_b, time_s, time_e from flight f where f.from='"+to+"' and f.to='"+from+"' and f.day_no='"+d.getUTCDay()+"' and f_id not in ("+arrayOfFlightsR+")";
         }
       }else{
         if(category==='e'){
           fetchDataSQL5 = "select f_id, airline_name, fare_e, fare_child_e, capacity_e, time_s, time_e from flight f where f.from='"+to+"' and f.to='"+from+"' and f.day_no="+d.getUTCDay();
         }else if(category==='f'){
           fetchDataSQL5 = "select f_id, airline_name, fare_f, fare_child_f, capacity_f, time_s, time_e from flight f where f.from='"+to+"' and f.to='"+from+"' and f.day_no="+d.getUTCDay();
         }else if(category==='b'){
           fetchDataSQL5 = "select f_id, airline_name, fare_b, fare_child_b, capacity_b, time_s, time_e from flight f where f.from='"+to+"' and f.to='"+from+"' and f.day_no="+d.getUTCDay();
         }
       }

       mysql.fetchData(function(err,results5){
         if(err){
           throw error;
         } else {
           for(var i=0;i<results5.length;i++){
             if(category==='e'){
               if(results5[i].capacity_e>=number_of_seats){
                 t=results5[i];
                 var s=Number(t.time_s.substring(0,t.time_s.indexOf(':'))*3600)+Number(t.time_s.substring(t.time_s.indexOf(':')+1,t.time_s.lastIndexOf(':'))*60);
                 var e=Number(t.time_e.substring(0,t.time_e.indexOf(':'))*3600)+Number(t.time_e.substring(t.time_e.indexOf(':')+1,t.time_e.lastIndexOf(':'))*60);
                 if(e>s){
                   t.duration=e-s;
                 }else{
                   t.duration=86400+e-s;
                 }
                 t.duration=('0'+parseInt(t.duration/3600)).slice(-2)+":"+('0'+Number(parseInt((t.duration-parseInt(t.duration/3600)*3600)/60))).slice(-2)+":00";
                 returnFlightR.push(t);
               }
             }else if(category==='f'){
               if(results5[i].capacity_e>=number_of_seats){
                 t=results5[i];
                 var s=Number(t.time_s.substring(0,t.time_s.indexOf(':'))*3600)+Number(t.time_s.substring(t.time_s.indexOf(':')+1,t.time_s.lastIndexOf(':'))*60);
                 var e=Number(t.time_e.substring(0,t.time_e.indexOf(':'))*3600)+Number(t.time_e.substring(t.time_e.indexOf(':')+1,t.time_e.lastIndexOf(':'))*60);
                 if(e>s){
                   t.duration=e-s;
                 }else{
                   t.duration=86400+e-s;
                 }
                 t.duration=('0'+parseInt(t.duration/3600)).slice(-2)+":"+('0'+Number(parseInt((t.duration-parseInt(t.duration/3600)*3600)/60))).slice(-2)+":00";
                 returnFlightR.push(t);
               }
             }else if(category==='b'){
               if(results5[i].capacity_e>=number_of_seats){
                 t=results5[i];
                 var s=Number(t.time_s.substring(0,t.time_s.indexOf(':'))*3600)+Number(t.time_s.substring(t.time_s.indexOf(':')+1,t.time_s.lastIndexOf(':'))*60);
                 var e=Number(t.time_e.substring(0,t.time_e.indexOf(':'))*3600)+Number(t.time_e.substring(t.time_e.indexOf(':')+1,t.time_e.lastIndexOf(':'))*60);
                 if(e>s){
                   t.duration=e-s;
                 }else{
                   t.duration=86400+e-s;
                 }
                 t.duration=('0'+parseInt(t.duration/3600)).slice(-2)+":"+('0'+Number(parseInt((t.duration-parseInt(t.duration/3600)*3600)/60))).slice(-2)+":00";
                 returnFlightR.push(t);
               }
             }
           }
           if(arrayOfFlightsR.length>0){
             if(category==='e'){
               fetchDataSQL3 = "select f_id, airline_name, fare_e, fare_child_e, capacity_e, time_s, time_e from flight where f_id in ("+arrayOfFlightsR+")";
             }else if(category==='f'){
               fetchDataSQL3 = "select f_id, airline_name, fare_f, fare_child_f, capacity_f, time_s, time_e from flight where f_id in ("+arrayOfFlightsR+")";
             }else if(category==='b'){
               fetchDataSQL3 = "select f_id, airline_name, fare_b, fare_child_b, capacity_b, time_s, time_e from flight where f_id in ("+arrayOfFlightsR+")";
             }
             mysql.fetchData(function(err,results3){
               if(err){
                 throw error;
               } else {
                 for(var i=0;i<results3.length;i++){
                   if(category==='e'){
                     if(results3[i].capacity_e-results2[i].seats>=number_of_seats){
                       t=results3[i];
                       var s=Number(t.time_s.substring(0,t.time_s.indexOf(':'))*3600)+Number(t.time_s.substring(t.time_s.indexOf(':')+1,t.time_s.lastIndexOf(':'))*60);
                       var e=Number(t.time_e.substring(0,t.time_e.indexOf(':'))*3600)+Number(t.time_e.substring(t.time_e.indexOf(':')+1,t.time_e.lastIndexOf(':'))*60);
                       if(e>s){
                         t.duration=e-s;
                       }else{
                         t.duration=86400+e-s;
                       }
                       t.duration=('0'+parseInt(t.duration/3600)).slice(-2)+":"+('0'+Number(parseInt((t.duration-parseInt(t.duration/3600)*3600)/60))).slice(-2)+":00";
                       returnFlightR.push(t);
                     }
                   }else if(category==='f'){
                     if(results3[i].capacity_f-result2[i].seats>=number_of_seats){
                       t=results3[i];
                       var s=Number(t.time_s.substring(0,t.time_s.indexOf(':'))*3600)+Number(t.time_s.substring(t.time_s.indexOf(':')+1,t.time_s.lastIndexOf(':'))*60);
                       var e=Number(t.time_e.substring(0,t.time_e.indexOf(':'))*3600)+Number(t.time_e.substring(t.time_e.indexOf(':')+1,t.time_e.lastIndexOf(':'))*60);
                       if(e>s){
                         t.duration=e-s;
                       }else{
                         t.duration=86400+e-s;
                       }
                       t.duration=('0'+parseInt(t.duration/3600)).slice(-2)+":"+('0'+Number(parseInt((t.duration-parseInt(t.duration/3600)*3600)/60))).slice(-2)+":00";
                       returnFlightR.push(t);
                     }
                   }else if(category==='b'){
                     if(results3[i].capacity_b-results2[i].seats>=number_of_seats){
                       t=results3[i];
                       var s=Number(t.time_s.substring(0,t.time_s.indexOf(':'))*3600)+Number(t.time_s.substring(t.time_s.indexOf(':')+1,t.time_s.lastIndexOf(':'))*60);
                       var e=Number(t.time_e.substring(0,t.time_e.indexOf(':'))*3600)+Number(t.time_e.substring(t.time_e.indexOf(':')+1,t.time_e.lastIndexOf(':'))*60);
                       if(e>s){
                         t.duration=e-s;
                       }else{
                         t.duration=86400+e-s;
                       }
                       t.duration=('0'+parseInt(t.duration/3600)).slice(-2)+":"+('0'+Number(parseInt((t.duration-parseInt(t.duration/3600)*3600)/60))).slice(-2)+":00";
                       returnFlightR.push(t);
                     }
                   }
                 }
               }
               console.log("return flights back: \n",returnFlightR);
             },fetchDataSQL3);
           }else{
             console.log("return flights back: \n",returnFlightR);
           }
         }
       },fetchDataSQL5);
     }
  }, fetchDataSQL2);
}

exports.flight_details = flight_details;*/


exports.flight_book = flight_book;

module.exports = router;
