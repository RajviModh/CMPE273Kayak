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
           fetchDataSQL4 = "select f_id, airline_name, fare_e as fare, fare_child_e as fare_child, capacity_e, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no='"+d.getUTCDay()+"' and f_id not in ("+arrayOfFlights+")";
         }else if(category==='f'){
           fetchDataSQL4 = "select f_id, airline_name, fare_f as fare, fare_child_f as fare_child, capacity_f, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no='"+d.getUTCDay()+"' and f_id not in ("+arrayOfFlights+")";
         }else if(category==='b'){
           fetchDataSQL4 = "select f_id, airline_name, fare_b as fare, fare_child_b as fare_child, capacity_b, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no='"+d.getUTCDay()+"' and f_id not in ("+arrayOfFlights+")";
         }
       }else{
         if(category==='e'){
           fetchDataSQL4 = "select f_id, airline_name, fare_e as fare, fare_child_e as fare_child, capacity_e, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no="+d.getUTCDay();
         }else if(category==='f'){
           fetchDataSQL4 = "select f_id, airline_name, fare_f as fare, fare_child_f as fare_child, capacity_f, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no="+d.getUTCDay();
         }else if(category==='b'){
           fetchDataSQL4 = "select f_id, airline_name, fare_b as fare, fare_child_b as fare_child, capacity_b, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no="+d.getUTCDay();
         }
       }

       mysql.fetchData(function(err,results4){
         if(err){
           throw error;
         } else {
           console.log(results4);
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
               fetchDataSQL1 = "select f_id, airline_name, fare_e as fare, fare_child_e as fare_child, capacity_e, time_s, time_e from flight where f_id in ("+arrayOfFlights+")";
             }else if(category==='f'){
               fetchDataSQL1 = "select f_id, airline_name, fare_f as fare, fare_child_f as fare_child, capacity_f, time_s, time_e from flight where f_id in ("+arrayOfFlights+")";
             }else if(category==='b'){
               fetchDataSQL1 = "select f_id, airline_name, fare_b as fare, fare_child_b as fare_child, capacity_b, time_s, time_e from flight where f_id in ("+arrayOfFlights+")";
             }
             mysql.fetchData(function(err,results1){
               if(err){
                 throw error;
               } else {

                 //fetchDataSQL4 = "select f_id, airline_name, fare_f, fare_child_f, capacity_f, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no='"+d.getUTCDay()+"' and f_id not in ("+arrayOfFlights+")";

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
  var returnFlightR=[];
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
           fetchDataSQL4 = "select f_id, airline_name, fare_e as fare, fare_child_e as fare_child, capacity_e, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no='"+d.getUTCDay()+"' and f_id not in ("+arrayOfFlights+")";
         }else if(category==='f'){
           fetchDataSQL4 = "select f_id, airline_name, fare_f as fare, fare_child_f as fare_child, capacity_f, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no='"+d.getUTCDay()+"' and f_id not in ("+arrayOfFlights+")";
         }else if(category==='b'){
           fetchDataSQL4 = "select f_id, airline_name, fare_b as fare, fare_child_b as fare_child, capacity_b, time_s, time_e from flight f where f.from='"+fromto+"' and f.to='"+to+"' and f.day_no='"+d.getUTCDay()+"' and f_id not in ("+arrayOfFlights+")";
         }
       }else{
         if(category==='e'){
           fetchDataSQL4 = "select f_id, airline_name, fare_e as fare, fare_child_e as fare_child, capacity_e, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no="+d.getUTCDay();
         }else if(category==='f'){
           fetchDataSQL4 = "select f_id, airline_name, fare_f as fare, fare_child_f as fare_child, capacity_f, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no="+d.getUTCDay();
         }else if(category==='b'){
           fetchDataSQL4 = "select f_id, airline_name, fare_b as fare, fare_child_b as fare_child, capacity_b, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no="+d.getUTCDay();
         }
       }

       mysql.fetchData(function(err,results4){
         if(err){
           throw error;
         } else {
           console.log(results4);
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
                 returnFlightR.push(t);
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
                 returnFlightR.push(t);
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
                 returnFlightR.push(t);
               }
             }
           }
           if(arrayOfFlights.length>0){
             if(category==='e'){
               fetchDataSQL1 = "select f_id, airline_name, fare_e as fare, fare_child_e as fare_child, capacity_e, time_s, time_e from flight where f_id in ("+arrayOfFlights+")";
             }else if(category==='f'){
               fetchDataSQL1 = "select f_id, airline_name, fare_f as fare, fare_child_f as fare_child, capacity_f, time_s, time_e from flight where f_id in ("+arrayOfFlights+")";
             }else if(category==='b'){
               fetchDataSQL1 = "select f_id, airline_name, fare_b as fare, fare_child_b as fare_child, capacity_b, time_s, time_e from flight where f_id in ("+arrayOfFlights+")";
             }
             mysql.fetchData(function(err,results1){
               if(err){
                 throw error;
               } else {

                 //fetchDataSQL4 = "select f_id, airline_name, fare_f, fare_child_f, capacity_f, time_s, time_e from flight f where f.from='"+from+"' and f.to='"+to+"' and f.day_no='"+d.getUTCDay()+"' and f_id not in ("+arrayOfFlights+")";

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
                       returnFlightR.push(t);
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
                       returnFlightR.push(t);
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
                       returnFlightR.push(t);
                     }
                   }
                 }
               }
               console.log("return flights return: \n",returnFlightR);
               res.status(200).json({message:"flights inside",returnFlightR:returnFlightR});
             },fetchDataSQL1);
           }else{
             console.log("return flights return: \n",returnFlightR);
             res.status(200).json({message:"flights inside",returnFlightR:returnFlightR});
           }
         }
       },fetchDataSQL4);
     }
  }, fetchDataSQL);
});
