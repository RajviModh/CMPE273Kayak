var mysql = require('./mysql');

var express = require('express');
var router = express();

var async = require('async');

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
           fetchDataSQL4 = "select f_id, airline_name, fare_e as fare, fare_child_e as fare_child, capacity_e as capacity, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no='"+d.getUTCDay()+"' and f_id not in ("+arrayOfFlights+")";
         }else if(category==='f'){
           fetchDataSQL4 = "select f_id, airline_name, fare_f as fare, fare_child_f as fare_child, capacity_f as capacity, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no='"+d.getUTCDay()+"' and f_id not in ("+arrayOfFlights+")";
         }else if(category==='b'){
           fetchDataSQL4 = "select f_id, airline_name, fare_b as fare, fare_child_b as fare_child, capacity_b as capacity, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no='"+d.getUTCDay()+"' and f_id not in ("+arrayOfFlights+")";
         }
       }else{
         if(category==='e'){
           fetchDataSQL4 = "select f_id, airline_name, fare_e as fare, fare_child_e as fare_child, capacity_e as capacity, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no="+d.getUTCDay();
         }else if(category==='f'){
           fetchDataSQL4 = "select f_id, airline_name, fare_f as fare, fare_child_f as fare_child, capacity_f as capacity, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no="+d.getUTCDay();
         }else if(category==='b'){
           fetchDataSQL4 = "select f_id, airline_name, fare_b as fare, fare_child_b as fare_child, capacity_b as capacity, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no="+d.getUTCDay();
         }
       }

       mysql.fetchData(function(err,results4){
         if(err){
           throw error;
         } else {
           console.log(results4);
           for(var i=0;i<results4.length;i++){
             if(results4[i].capacity>=number_of_seats){
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
           if(arrayOfFlights.length>0){
             if(category==='e'){
               fetchDataSQL1 = "select f_id, airline_name, fare_e as fare, fare_child_e as fare_child, capacity_e as capacity, time_s, time_e from flight where f_id in ("+arrayOfFlights+")";
             }else if(category==='f'){
               fetchDataSQL1 = "select f_id, airline_name, fare_f as fare, fare_child_f as fare_child, capacity_f as capacity, time_s, time_e from flight where f_id in ("+arrayOfFlights+")";
             }else if(category==='b'){
               fetchDataSQL1 = "select f_id, airline_name, fare_b as fare, fare_child_b as fare_child, capacity_b as capacity, time_s, time_e from flight where f_id in ("+arrayOfFlights+")";
             }
             mysql.fetchData(function(err,results1){
               if(err){
                 throw error;
               } else {
                 for(var i=0;i<results1.length;i++){
                   if(results1[i].capacity-results[i].seats>=number_of_seats){
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

router.get('/round', function (req, res, next) {
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
           fetchDataSQL4 = "select f_id, airline_name, fare_e as fare, fare_child_e as fare_child, capacity_e as capacity, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no='"+d.getUTCDay()+"' and f_id not in ("+arrayOfFlights+")";
         }else if(category==='f'){
           fetchDataSQL4 = "select f_id, airline_name, fare_f as fare, fare_child_f as fare_child, capacity_f as capacity, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no='"+d.getUTCDay()+"' and f_id not in ("+arrayOfFlights+")";
         }else if(category==='b'){
           fetchDataSQL4 = "select f_id, airline_name, fare_b as fare, fare_child_b as fare_child, capacity_b as capacity, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no='"+d.getUTCDay()+"' and f_id not in ("+arrayOfFlights+")";
         }
       }else{
         if(category==='e'){
           fetchDataSQL4 = "select f_id, airline_name, fare_e as fare, fare_child_e as fare_child, capacity_e as capacity, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no="+d.getUTCDay();
         }else if(category==='f'){
           fetchDataSQL4 = "select f_id, airline_name, fare_f as fare, fare_child_f as fare_child, capacity_f as capacity, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no="+d.getUTCDay();
         }else if(category==='b'){
           fetchDataSQL4 = "select f_id, airline_name, fare_b as fare, fare_child_b as fare_child, capacity_b as capacity, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no="+d.getUTCDay();
         }
       }

       mysql.fetchData(function(err,results4){
         if(err){
           throw error;
         } else {
           console.log(results4);
           for(var i=0;i<results4.length;i++){
             if(results4[i].capacity>=number_of_seats){
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
           if(arrayOfFlights.length>0){
             if(category==='e'){
               fetchDataSQL1 = "select f_id, airline_name, fare_e as fare, fare_child_e as fare_child, capacity_e as capacity, time_s, time_e from flight where f_id in ("+arrayOfFlights+")";
             }else if(category==='f'){
               fetchDataSQL1 = "select f_id, airline_name, fare_f as fare, fare_child_f as fare_child, capacity_f as capacity, time_s, time_e from flight where f_id in ("+arrayOfFlights+")";
             }else if(category==='b'){
               fetchDataSQL1 = "select f_id, airline_name, fare_b as fare, fare_child_b as fare_child, capacity_b as capacity, time_s, time_e from flight where f_id in ("+arrayOfFlights+")";
             }
             mysql.fetchData(function(err,results1){
               if(err){
                 throw error;
               } else {
                 for(var i=0;i<results1.length;i++){
                   if(results1[i].capacity-results[i].seats>=number_of_seats){
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
               console.log("return flights straight: \n",returnFlightS);
               res.status(200).json({message:"flights inside",returnFlightR:returnFlightS});
             },fetchDataSQL1);
           }else{
             console.log("return flights straight: \n",returnFlightS);
             res.status(200).json({message:"flights inside",returnFlightR:returnFlightS});
           }
         }
       },fetchDataSQL4);
     }
  }, fetchDataSQL);
});

router.get('/flight_booking_direct', function (req, res, next) {
  console.log("in flight_booking_direct");
  console.log(req.query);
  var passenger1=[];
  for(var i=0;i<req.query.passenger.length;i++){
    passenger1.push(JSON.parse(req.query.passenger[i]));
  }
  console.log(passenger1);

  var f_id=req.query.f_id;
  var user_id=req.query.user_id;
  var booking_date = new Date().toISOString().substring(0,10);
  var flight_start_s = req.query.flight_start_s;
  var duration = req.query.duration;
  var booked_seats=req.query.booked_seats;
  var booking_type=req.query.class;
  var fare=req.query.fare;

  //var passenger=[{name:"madhur",age:23},{name:"gor",age:24},{name:"gabbu",age:3},{name:"ninnu",age:1},{},{}];
  var passenger=passenger1;
  var actualPasseenger=[];
  for(var i=0;i<passenger.length;i++){
    if(passenger[i].name!=undefined){
      actualPasseenger.push(passenger[i]);
    }
  }
  for(var i=0;i<actualPasseenger.length;i++){
    console.log(actualPasseenger[i]);
  }

  var fetchDataSQL,insertDataSQL;
  fetchDataSQL = "select max(f.booking_id) as max from flight_booking f";


  mysql.fetchData(function(err,results){
     if(err){
       throw err;
     } else {
       var new_booking_id=results[0].max+1;
       if(booking_type==="economy"){
         insertDataSQL  = "insert into flight_booking values('"+new_booking_id+"','"+f_id+"','"+user_id+"','"+booking_date+"','"+flight_start_s+"','"+duration+"','"+booked_seats+"','0','0','"+fare+"')";
       }else if(booking_type==="business"){
         insertDataSQL  = "insert into flight_booking values('"+new_booking_id+"','"+f_id+"','"+user_id+"','"+booking_date+"','"+flight_start_s+"','"+duration+"','0','"+booked_seats+"','0','"+fare+"')";
       }else{
         insertDataSQL  = "insert into flight_booking values('"+new_booking_id+"','"+f_id+"','"+user_id+"','"+booking_date+"','"+flight_start_s+"','"+duration+"','0','0','"+booked_seats+"','"+fare+"')";
       }
       mysql.setData((err, results) => {
         if(err){
           throw err;
         }else{
           console.log("No. of results after insertion:" + results.affectedRows);
           var agegroup;
           for(var i=0;i<actualPasseenger.length;i++){
             if(actualPasseenger[i].age<=3){
               agegroup="C";
             }else{
               agegroup="A";
             }
             insertDataSQL1  = "insert into passenger values('"+(i+1)+"','"+new_booking_id+"','"+actualPasseenger[i].name+"','"+actualPasseenger[i].age+"','"+agegroup+"')";
             mysql.setData((err, results) => {
               if(err){
                 throw err;
               }else{
                 console.log("No. of results after insertion:" + results.affectedRows);
               }
             },insertDataSQL1);
           }
         }
       },insertDataSQL);
     }
     res.status(200).json({message:"Booked",});
  }, fetchDataSQL);
})

router.get('/flight_booking_round', function (req, res, next) {
  console.log("in flight_booking_round");

  var f_id="AI-129";
  var f_id_r="IG-124";
  var user_id="1";
  var booking_date = new Date().toISOString().substring(0,10);
  var flight_start_s = "2017-11-26";
  var flight_start_s_r = "2017-11-27";
  var duration = "02:00:00";
  var duration_r = "02:00:00";
  var booked_seats=10;
  var booking_type="economy";
  var fare="250";
  var fare_r="250";

  var passenger=[{name:"madhur",age:23},{name:"gor",age:24},{name:"gabbu",age:3},{name:"ninnu",age:1},{},{}];
  var actualPasseenger=[];
  for(var i=0;i<passenger.length;i++){
    if(passenger[i].name!=undefined){
      actualPasseenger.push(passenger[i]);
    }
  }
  for(var i=0;i<actualPasseenger.length;i++){
    console.log(actualPasseenger[i]);
  }

  var fetchDataSQL,insertDataSQL,insertDataSQL_r;
  fetchDataSQL = "select max(f.booking_id) as max from flight_booking f";


  mysql.fetchData(function(err,results){
     if(err){
       throw err;
     } else {
       var new_booking_id=results[0].max+1;
       if(booking_type==="economy"){
         insertDataSQL  = "insert into flight_booking values('"+new_booking_id+"','"+f_id+"','"+user_id+"','"+booking_date+"','"+flight_start_s+"','"+duration+"','"+booked_seats+"','0','0','"+fare+"')";
         insertDataSQL_r  = "insert into flight_booking values('"+new_booking_id+"','"+f_id_r+"','"+user_id+"','"+booking_date+"','"+flight_start_s_r+"','"+duration_r+"','"+booked_seats+"','0','0','"+fare_r+"')";
       }else if(booking_type==="first"){
         insertDataSQL  = "insert into flight_booking values('"+new_booking_id+"','"+f_id+"','"+user_id+"','"+booking_date+"','"+flight_start_s+"','"+duration+"','0','"+booked_seats+"','0','"+fare+"')";
         insertDataSQL_r  = "insert into flight_booking values('"+new_booking_id+"','"+f_id_r+"','"+user_id+"','"+booking_date+"','"+flight_start_s_r+"','"+duration_r+"','0','"+booked_seats+"','0','"+fare_r+"')";
       }else{
         insertDataSQL  = "insert into flight_booking values('"+new_booking_id+"','"+f_id+"','"+user_id+"','"+booking_date+"','"+flight_start_s+"','"+duration+"','0','0','"+booked_seats+"','"+fare+"')";
         insertDataSQL_r  = "insert into flight_booking values('"+new_booking_id+"','"+f_id_r+"','"+user_id+"','"+booking_date+"','"+flight_start_s_r+"','"+duration_r+"','0','0','"+booked_seats+"','"+fare_r+"')";
       }
       mysql.setData((err, results) => {
         if(err){
           throw err;
         }else{
           console.log("No. of results after insertion:" + results.affectedRows);
           var agegroup;
           for(var i=0;i<actualPasseenger.length;i++){
             if(actualPasseenger[i].age<=3){
               agegroup="C";
             }else{
               agegroup="A";
             }
             insertDataSQL1  = "insert into passenger values('"+(i+1)+"','"+new_booking_id+"','"+actualPasseenger[i].name+"','"+actualPasseenger[i].age+"','"+agegroup+"')";
             mysql.setData((err, results) => {
               if(err){
                 throw err;
               }else{
                 console.log("No. of results after insertion:" + results.affectedRows);
               }
             },insertDataSQL1);
           }
         }
       },insertDataSQL);
       mysql.setData((err, results) => {
         if(err){
           throw err;
         }else{
           console.log("No. of results after insertion:" + results.affectedRows);
         }
       },insertDataSQL_r);
     }
  }, fetchDataSQL);
  res.end("pati gayu round trip nu..");
})

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

module.exports = router;
