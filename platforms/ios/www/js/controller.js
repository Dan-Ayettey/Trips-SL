//set image source to message notifications


let Controller={


      state:{isResponse:false,
          response:null,
          response_from_to:null,
          responseTimeTable:null,
          toLocation:[],
          stations:[],
          isInput:false},
    postQuery(){

        let stations = "<REQUEST>" +
            // Use your valid authenticationkey
            "<LOGIN authenticationkey='0a561ed7aeda4c8fb370386e0630c5d2'/>" +
            "<QUERY objecttype='TrainStation' schemaversion='1'>" +
            "<FILTER/>" +
            "<INCLUDE>Prognosticated</INCLUDE>" +
            "<INCLUDE>AdvertisedLocationName</INCLUDE>" +
            "<INCLUDE>LocationSignature</INCLUDE>" +
            "</QUERY>" +
            "</REQUEST>";

        let response;
        let isResponse=false;
        let post= Model.postRequest("https://api.trafikinfo.trafikverket.se/v2/data.json");

        post.onreadystatechange=function(){
            if(post.readyState===4 && post.status===200 && XMLHttpRequest.DONE){

                response=JSON.parse(post.response);
                Controller.state.response=response;

                isResponse=true;

                let timeTable= "<REQUEST>" +
                    "<LOGIN authenticationkey='0a561ed7aeda4c8fb370386e0630c5d2' />" +
                    "<QUERY objecttype='TrainAnnouncement' " +
                    "orderby='AdvertisedTimeAtLocation' schemaversion='1'>" +
                    "<FILTER>" +
                    "<AND>" +
                    "<OR>" +
                    "<AND>" +
                    "<GT name='AdvertisedTimeAtLocation' " +
                    "value='$dateadd(-00:15:00)' />" +
                    "<LT name='AdvertisedTimeAtLocation' " +
                    "value='$dateadd(14:00:00)' />" +
                    "</AND>" +
                    "<GT name='EstimatedTimeAtLocation' value='$now' />" +
                    "</OR>" +
                    "<EQ name='LocationSignature' value='Cst' />" +
                    "<EQ name='ActivityType' value='Avgang' />" +
                    "</AND>" +
                    "</FILTER>" +
                    // Just include wanted fields to reduce response size.
                    "<INCLUDE>InformationOwner</INCLUDE>" +
                    "<INCLUDE>AdvertisedTimeAtLocation</INCLUDE>" +
                    "<INCLUDE>TrackAtLocation</INCLUDE>" +
                    "<INCLUDE>FromLocation</INCLUDE>" +
                    "<INCLUDE>ToLocation</INCLUDE>" +
                    "</QUERY>" +
                    "</REQUEST>";
                post=Model.postRequest("https://api.trafikinfo.trafikverket.se/v2/data.json");

                post.onreadystatechange=function() {
                    if (post.readyState === 4 && post.status === 200) {
                        let response=JSON.parse(post.response);

                        let trainAnnouncement=response.RESPONSE.RESULT;

                        for(let announcement of  trainAnnouncement){

                                Controller.state.responseTimeTable=announcement;


                        }
                    }
                };

                post.setRequestHeader('Content-Type', 'application/xml');
                post.send(timeTable);

            }

        };


        post.setRequestHeader('Content-Type', 'application/xml');
        post.send(stations);



    },


    trainInformation(announcement){
          let timeTableDeparture=document.getElementById("time_table_departure");
        for(let trains of announcement.TrainAnnouncement) {
            console.log(trains.InformationOwner)
            let date = new Date(trains.AdvertisedTimeAtLocation);

            let minute = date.getMinutes();
            let hours = date.getHours();
            if (minute < 10) minute = minute.toString();

            for (let location of trains.ToLocation) {
                var owner = "";
                if (trains.InformationOwner != null) {
                    console.log(trains.length)
                    Controller.state.toLocation.push(trains.InformationOwner);
                    console.log(trains.InformationOwner);
                    owner = trains.InformationOwner;

                timeTableDeparture.innerHTML += "<tr class='train_time_table'><td>" + Controller.state.stations[location] + "</td>" +
                    "<td>" + hours + ":" + minute + "</td><td>" + owner + " </td><td>" + trains.TrackAtLocation + " </td></tr>";

                  }
            }
        }


    },

    autocompleter(el,input_list) {





        let stationList = [], elementHolder, childElementHolder;


        elementHolder = document.createElement("div");
        childElementHolder = document.createElement("div");
        childElementHolder.setAttribute("class", "autocomplete_items");
        elementHolder.setAttribute("id", el.value+"autocomplete");
        elementHolder.setAttribute("class", "autocomplete");
        elementHolder.style.cssText = 'display:none';

        el.addEventListener("click",function () {
            elementHolder.style.position=el.position;
            elementHolder.remove();
            childElementHolder.remove();
        });


        el.addEventListener("keyup", function (ev) {



            if (ev.keyCode === 8) {
                elementHolder.remove();
                childElementHolder.remove();
                Controller.state.isResponse=true;




            }else {
                Controller.state.isResponse=false;
            }

            console.log(ev.target)

        });









        if (el.value.match(/^[A-Za-z]+$/)) {



            for(let val of input_list.RESPONSE.RESULT) {

                for(let v of val.TrainStation) {
                    Controller.state.stations[v.LocationSignature]=v.AdvertisedLocationName;
                    stationList.push({signature: v.LocationSignature, station: v.AdvertisedLocationName})

                }

        }

            let setValue=new Set();

            stationList.forEach((val,k) => {

                if (val.signature.charAt(0).toUpperCase() === el.value.charAt(0).toUpperCase()) {



                    setValue.add(val.station);





                } else {

                    return false;
                }


            });
            elementHolder.innerHTML="";
            let station=document.getElementsByClassName("station_list");
            for(let set of  setValue){




                elementHolder.style.cssText = 'margin-left:' + el.offsetLeft + 'px; display:block';




                if(station.length!==setValue.size){
                    childElementHolder.innerHTML += "<div class='station_list'>" +  set + "</div>";
                    if(Controller.state.isResponse===false){
                        elementHolder.appendChild(childElementHolder);
                        el.parentNode.appendChild(elementHolder);
                        Controller.state.isResponse=true;
                    }

                    console.log(setValue.size +" :"+station.length)




                }else {
                    return false;
                }









            }









            childElementHolder.childNodes.forEach(function (value, key) {
                value.addEventListener("click", function () {
                    el.value = this.textContent;
                })
            });


        } else {


        }



        document.addEventListener("click", function () {
            elementHolder.remove();
            childElementHolder.remove();


        })




    },
     idle(){
         let systemTime=document.getElementById("date_group");
         let date=document.getElementsByClassName("date")[0];
         let realDate=document.getElementById("date");
         let mobileWidth=window.matchMedia("(max-width: 1000px)");

         if(![null,undefined].includes(document.getElementsByClassName("autocomplete_items")[0])){
             document.getElementsByClassName("autocomplete")[0].style.display="none";
         }


        let dateGroup="  float: right;\n" +
            "    flex: none;\n" +
            "    color:#43425D;\n" +
            "    margin: 22px 0 0 6px;\n" +
            "    right: 0;\n" +
            "\n" +
            "    position: absolute;\n" +
            "    font-weight: bolder;\n" +
            "    padding: 0;  z-index: 66\n" +
            "    font-size: 12px;";

        document.onclick=function(ev){

            date.style.marginTop="0";
            date.style.display="inline-block";
            systemTime.style.cssText=dateGroup;
            realDate.style.fontSize="12px";



        };


        if(mobileWidth.matches){

            date.style.marginTop="22px";
            realDate.style.fontSize="14px";
            date.style.display="block";
            systemTime.style.cssText="color:#19c782;font-size:404%;text-align:center;position:fixed;background:#43425d;left:0;right:0;top:0;bottom:0;margin:0;padding:60px 0 0 0";

        }else{
            date.style.marginTop="22px";

            date.style.display="block";
            systemTime.style.cssText="color:#19c782;font-size:710%;text-align:center;position:fixed;background:#43425d;left:0;right:0;top:0;bottom:0;margin:0;padding:60px 0 0 0";

        }
    },

    success(pos) {
        let position = pos.coords;
        let longitude = position.longitude;
        let latitude = position.latitude;

        let head=document.createElement("a");
            head.setAttribute("href","https://weather.com/weather/today/l/59.44,17.94?par=google&temp=c");
        head.setAttribute("type","text/html");

            document.getElementsByTagName("head")[0].parentNode.appendChild(head)

        let requestString = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=6d697c1ace557aa8506fea94a2f5a0bc";

        let weather = Model.getRequest(requestString);
        weather.onreadystatechange = function () {
            if (weather.readyState === 4 && weather.status === 200 && weather.DONE) {

                let coord = JSON.parse(weather.responseText);
                console.log(coord.name);
                console.log(coord.main.humidity);
                console.log(coord.main.pressure);
                console.log(coord.main.temp);
                console.log(coord.main.temp_max);
                console.log(coord.main.temp_min);
                console.log(coord.wind.speed);
                console.log(coord.wind.deg);
                document.getElementsByClassName("temperature")[0].textContent=coord.main.temp;
                let icon=document.getElementById("icon");
                icon.setAttribute("src","http://openweathermap.org/img/wn/"+coord.weather[0].icon+"@2x.png");



}



        };

        weather.send();
    },
    options:{
       enableHighAccuracy:true,
        timeout:500,
        maximumAge:0
    },
    error(error){
        console.warn("Error:"+error.error+" "+error.message);

    },
    weatherForecast:()=>{
          if(navigator.geolocation){

            navigator.geolocation.getCurrentPosition(Controller.success) ;

          }else {

          }

    },
    

    engine:()=> {

     let station_hive=document.querySelectorAll(".station_ecosystems_hive");

     let hiveCss="peru";
         for(let hive_station of station_hive){


             hive_station.addEventListener("click",function (ev) {

             })

        }




        let from_to=document.querySelectorAll(".from_and_to");
        let go= document.getElementById("search");
        let timeTableDeparture=document.getElementById("time_table_departure");

        go.addEventListener("click",function (event) {


            for(let val of from_to){

                if(["",undefined,null].includes(val.value)){


                    Controller.state.isInput=false
                }
            }

            if(Controller.state.isInput===true){

                Controller.trainInformation(Controller.state.responseTimeTable);

            }else {
                alert("The input field must not be left empty");
            }

        });



             from_to.forEach(function (el) {
             el.addEventListener("keyup",function (ev) {

                     Controller.autocompleter(el,Controller.state.response);
                 if(![undefined,null,""].includes(el.value)){
                     Controller.state.isInput=true;
                 }
                 });


             });








        let systemTime=document.getElementById("date_group");
        let date=document.getElementsByClassName("date")[0];
        Controller.weatherForecast();
        let dateGroup="  float: right;" +
            "    flex: none;" +
            "    color:#19c782;" +
            "    margin: 22px 0 0 6px;" +
            "    right: 0;" +
            "" +
            "    position: absolute;" +
            "    font-weight: bolder;" +
            "    padding: 0;" +
            "    font-size: 12px;";



        Controller.postQuery();

        document.addEventListener('onDeviceReady', function(){
            // Change the color
            //window.plugins.headerColor.tint("#becb29");
        }, false);


        let content= [document.getElementById("content"),document.getElementById("inlineFrame")];

        content.forEach((el)=>{
            el.addEventListener("click", (event)=> {
                menuList.classList.toggle("show",false);

            })
        } );


        let menuItems=document.getElementById("menu_items");
        let menuList=document.getElementsByClassName("menu_list")[0];


        menuItems.addEventListener("click", ()=> {
            date.style.marginTop="22px";
            date.style.display="inline-block";

            date.style.color="#43425D";


            menuList.classList.toggle("show");

        });

        setInterval(()=>{
            Model.dateInstance();
            document.getElementById("date").textContent=Model.getSystemDate();
            document.getElementById("time").textContent=  Model.getSystemTime();

            if(document.hidden){

                Controller.idle();
            }

        },)

    }


};

Controller.engine();



