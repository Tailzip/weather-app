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
        // var draw = SVG('drawing').size(640, 580);
        // var text = draw.text('32°').fill('#FFF').move('40%',200)
        // text.font({
        //     family:   'Helvetica'
        //   , size:     100
        //   })

        // text.filter(function(add) {
        //   console.log(add);
        //   var blur = add.offset(4, 4).gaussianBlur(1);

        //   add.blend(add.source, blur);

        //   // blur.animate(3000).move('150%', '150%');
        // })
        //
        if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", function () {
                console.log(event);
                 textShadow(convert(event.beta, event.gamma))
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
          opacity = opacity/100;
          colour  = 'rgba('+r+', '+g+', '+b+', '+opacity+')';
          return  x +'px '+ y +'px '+ '0 '+ colour;
        }

        var shadow2 = '';
        var element = document.getElementById("infos-temp");

        function textShadow(angle){
            shadow2 = "";
          for(var i = 50; i > 0; i--){
            var px = ((parseInt(i)-50)*-1)+1;
            shadow2 = shadow2 + calculateBoxShadow(angle, px, 234, 195, 105, i) + ",";
          }

          shadow2 = shadow2.substr(0,shadow2.length-1);

          TweenMax.to(element, 0, {
              textShadow: shadow2
          });

        }


        shadow2 = shadow2.substr(0,shadow2.length-1);

      //   var shadow = '';
      //   var orientation = "50px";

      //   for(var i = 50; i > 0; i--){
      //     var px = ((parseInt(i)-50)*-1)+1;
      //     if(i < 10){
      //       shadow = shadow + "rgba(234, 195, 104, .0" + i +") "+ px +"px " + px + "px 0,"
      //     }
      //     else{
      //       shadow = shadow + "rgba(234, 195, 104, ." + i +") "+ px +"px " + px + "px 0,"
      //     }
      //   }
      // shadow = shadow.substr(0,shadow.length-1);


      //   TweenMax.to(element, 0, {
      //     textShadow: shadow2
      // });
    // }
})(jQuery);
