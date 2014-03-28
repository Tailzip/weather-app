(function(){
  // if (window.navigator.standalone) {

      // $.ajax({
      //       type: 'GET',
      //       url: 'data.json',
      //       success: function(data) {
      //         console.log(data);
      //       },
      //       error: function() {

      //       }
      //     });

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
      opacity = (opacity+15)/100;
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

      console.log(shadow);

    }

    textShadow(60);
    //textShadow(infoIcon, 90);

    var times = SunCalc.getTimes(new Date(), 51.5, -0.1);
    //console.log(times);


    // Define Circle
    var archtype = Raphael("circles", 134, 134);
    var set = archtype.set();
    

    var paper = Raphael("infos-temp", 226, 110);
    var t = paper.text(113, 50, "32°");
    t.attr({ 
      "font-size": 150, 
      "font-family": "HelveticaNeue-Light, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif", 
      "fill": "#fff" });

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

       function drawCircle() {

          archtype.circle(67, 67, 30).attr({
               "stroke": "#fff",
               "stroke-width": "7"
           });

          archtype.circle(67, 67, 26.8).attr({
               "fill": "#fdc400",
               "stroke-width": "0"
           });

          var line = archtype.path( ["M", 67, 3.5, "L", 67, 35 ] ).attr({
               "stroke": "#fff",
               "stroke-width": "7"
           });

           var my_arc = archtype.path().attr({
              "stroke": "#fff",
              "stroke-width": 7,
              arc: [67, 67, 80, 100, 60]
           });
           /*my_arc.animate({
               arc: [100, 100, 100, 100, 70]
           }, 1000);*/

       }

       drawCircle();

  // }
})(jQuery);
