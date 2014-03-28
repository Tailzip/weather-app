(function(){
  // if (window.navigator.standalone) {

      $.ajax({
            type: 'GET',
            url: 'data.json',
            success: function(data) {
              console.log(data);
              setupScene(data);
            },
            error: function() {

            }
          });


    if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", function () {
             //textShadow(convert(event.beta, event.gamma))
        }, true);
    }

    function convert(x, y){
      angle = Math.atan2(x, y);
          return (angle * 180/Math.PI);
    }

    function calculateBoxShadow(angle, distance, r, g, b, opacity)
    {
      angle   = angle*((Math.PI)/180);
      x       = Math.round(distance * Math.cos(angle));
      y       = Math.round(distance * Math.sin(angle));
      opacity = (opacity+20)/100;
      colour  = 'rgba('+r+', '+g+', '+b+', '+opacity+')';
      return  x +'px '+ y +'px '+ '0 '+ colour;
    }

    var shadow  = '';
    var infoTemp = document.getElementById("infos-temp");
    var infoIcon = document.getElementById("infos-icon");
    var circles = document.getElementById("circles");

    function textShadow(angle){

      shadow = "";
      nbShadows = 15;
      drop = true;

      for(var i = nbShadows; i > 0; i--){
        var px = ((parseInt(i)-parseInt(nbShadows))*-1)+1;
        if(drop){
          shadow = shadow + "drop-shadow(" + calculateBoxShadow(angle, px, 234, 195, 105, i) + ") ";
        }
        else{
          shadow = shadow + calculateBoxShadow(angle, px, 234, 195, 105, i) + ", ";
        }

      }

      if(!drop){
        shadow = shadow.substr(0,shadow.length-2);
        $("#infos-temp, #circles").css({"text-shadow" : shadow});
      }
      else{
        $("#infos-temp, #circles").css({"-webkit-filter" : shadow});
      }
    }

    // textShadow(60);
    //textShadow(infoIcon, 90);
    //

    function getIcon(condition, text){
      var a = {};
      switch(condition){
        case 'Chance of Rain' :
            a.class = "wi-rain";
            a.text = "";
        break;

        case 'Chance of Freezing Rain' :
            a.class = "";
            a.text = "";
        break;

        case 'Chance of Sleet' :
            a.class = "";
            a.text = "";
        break;

        case 'Chance of Snow' :
            a.class = "";
            a.text = "";
        break;

        case 'Chance of Thunderstorms' :
            a.class = "";
            a.text = "";
        break;

        case 'Chance of a Thunderstorm' :
            a.class = "";
            a.text = "";
        break;

        case 'Clear' :
            a.class = "";
            a.text = "";
        break;

        case 'Mostly Cloudy' :
            a.class = "wi-cloudy";
            a.text = "";
        break;

        case 'Partly Cloudy' :
            a.class = "wi-cloudy";
            a.text = "";
        break;

        case 'Cloudy' :
            a.class = "wi-cloudy";
            a.text = "";
        break;

        case 'Flurries' :
            a.class = "";
            a.text = "";
        break;

        case 'Fog' :
            a.class = "wi-fog";
            a.text = "";
        break;

        case 'Haze' :
            a.class = "";
            a.text = "";
        break;

        case 'Mostly Sunny' :
            a.class = "";
            a.text = "";
        break;

        case 'Partly Sunny' :
            a.class = "";
            a.text = "";
        break;

        case 'Freezing Rain' :
            a.class = "";
            a.text = "";
        break;

        case 'Rain' :
            a.class = "wi-rain";
            a.text = "";
        break;

        case 'Sleet' :
            a.class = "";
            a.text = "";
        break;

        case 'Sunny' :
            a.class = "";
            a.text = "";
        break;

        case 'Thunderstorms' :
            a.class = "";
            a.text = "";
        break;

        case 'Thunderstorm' :
            a.class = "";
            a.text = "";
        break;

        case 'Unknown' :
            a.class = "";
            a.text = "";
        break;

        case 'Overcast' :
            a.class = "";
            a.text = "";
        break;

        case 'Snow' :
            a.class = "";
            a.text = "";
        break;

        case 'Scattered Clouds' :
            a.class = "";
            a.text = "";
        break;
      }
      if(text === true){
         return a.text;
      }
      else{
        return a.class;
      }

    };

    function setupScene (data) {

          var today = data.forecast.simpleforecast.forecastday[0];
          var forecast = data.forecast.simpleforecast;
          var conditions = today.conditions;

          console.log(today);

          if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {

              date            = new Date();
              sunTimes    = SunCalc.getTimes(date, position.coords.latitude, position.coords.longitude);
              sunPosition = SunCalc.getPosition(date, position.coords.latitude, position.coords.longitude);

              nowFromDusk   = moment(sunTimes.dusk).diff(moment(), 'seconds');
              dawnTillDusk    = moment(sunTimes.dawn).diff(moment(sunTimes.dusk), 'seconds');
              now                   = (nowFromDusk*100)/dawnTillDusk+100;
              sunPos               = sunPosition.azimuth * (180/Math.PI);

              var data = {
                day : moment(date).format("dddd, MMMM Do YYYY"),
                place : "New York, NY",
                now : Math.round(now),
                sunPos : Math.round(sunPos),
                avgTemp : (parseInt(today.high.fahrenheit) + parseInt(today.low.fahrenheit))/2,
                icon : getIcon('Partly Cloudy', true)
              };

              textShadow(data.sunPos);
              drawInnerCircle(data);
              $('#date-now').text(data.day);
              $('#place').text(data.place);
              $('#forecast li').each(function(e){
                var $this = $(this);
                $this.find('.day').text(forecast.forecastday[e].date.weekday);
                $this.find('.icon').html('<i class="'+ getIcon(forecast.forecastday[e].conditions, false) +'"></i>');
                $this.find('.temp').text("");
              });

            });
          } else {
            /* geolocation IS NOT available */
          }
    }



    function drawpath( canvas, pathstr, duration, attr, callback ){
    var guide_path = canvas.path( pathstr ).attr( { stroke: "none", fill: "none" } );
    var path = canvas.path( guide_path.getSubpath( 0, 1 ) ).attr( attr );
    var total_length = guide_path.getTotalLength( guide_path );
    var last_point = guide_path.getPointAtLength( 0 );
    var start_time = new Date().getTime();
    var interval_length = 50;
    var result = path;
    var interval_id = setInterval( function()
        {
            var elapsed_time = new Date().getTime() - start_time;
            var this_length = elapsed_time / duration * total_length;
            var subpathstr = guide_path.getSubpath( 0, this_length );
            attr.path = subpathstr;
            path.animate( attr, interval_length );
            if ( elapsed_time >= duration ) {
                clearInterval( interval_id );
                if ( callback != undefined ) callback();
                    guide_path.remove();
            }
         }, interval_length );
     return result;
 }


    // Define Circle
    var archtype = Raphael("circles", 170, 170);
    var set = archtype.set();

    var paper = Raphael("infos-temp", 400, 350);


      archtype.customAttributes.arc = function (xloc, yloc, value, total, R) {
         var alpha = 360 / total * value,
             a = (90 - alpha) * Math.PI / 180,
             x = xloc + R * Math.cos(a),
             y = yloc - R * Math.sin(a),
             path;
         if (total == value) {
             path = [
                 ["M", xloc, yloc - R],
                 ["A", R, R, 0, 1, 1, xloc - 0.01, yloc - R]
             ];
         } else {
             path = [
                 ["M", xloc, yloc - R],
                 ["A", R, R, 0, +(alpha > 180), 1, x, y]
             ];
         }
         return {
             path: path
         };
      };

       function drawInnerCircle(data) {

          var innerCircle = archtype.circle(85, 85, 0).attr({
               "fill": "#fdc400",
               "stroke-width": "5",
               "stroke": "#fff"
           });

        var t = archtype.text(86, 86, data.icon).attr({
          "font-family" : "weather",
          "font-size": 0,
          "fill" : "#fff"
        });

      var t2 = paper.text(200, 170, data.avgTemp).attr({
            "font-size": 0,
            "font-family": "HelveticaNeue-Light, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif",
            "fill": "#fff" });

        var t3 = paper.text(350, 100, "°").attr({
            "font-size": 0,
            "font-family": "HelveticaNeue-Light, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif",
            "fill": "#fff" });


          innerCircle.animate({
            r: 85, r: 85, r: 45
          }, 1000, 'elastic', function(){
            drawLine(data);
          });

          t.animate({
            "font-size" : 40
          }, 1000, 'elastic');

          t2.animate({
                  "font-size" : 240
                }, 1000, 'elastic');

          t3.animate({
                  "font-size" : 120
                }, 1000, 'elastic');


       }

       function drawLine(data) {
          var line = archtype.path( ["M", 85, 38, "L", 85, 38 ] ).attr({
                 "stroke": "#fff",
                 "stroke-width": "6"
             });

          line.animate({
            path: ["M", 85, 2, "L", 85, 38 ]
          }, 500, '<', function(){
            drawOuterCircle(data);
          });
       }

       function drawOuterCircle(data){
          var outerCircle = archtype.path().attr({
              "stroke": "#fff",
              "stroke-width": 6,
              arc: [85, 85, 0, 100, 80]
           });

            outerCircle.animate({
               arc: [85, 85, data.now, 100, 80]
           }, 2000, 'bounce', function(){
              // textShadow(data.sunPos);
           });

       }

  // }
})(jQuery);
