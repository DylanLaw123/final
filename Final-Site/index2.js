$(document).ready(function() {
    const base_url="https://api.weather.gov/stations/";
    const endpoint="/observations/latest";
  
    // weather update button click
    $('#getwx').on('click', function(e) {
      var mystation = $('input').val();
      var myurl = base_url + mystation + endpoint;
      $('input#my-url').val(myurl);
      
      // clear out any previous data
      $('ul li').each(function() {
        // enter code to clear each li
      });
        
      console.log("Cleared Elements of UL");
      
      // execute AJAX call to get and render data
      $.ajax({
        url: myurl,
        dataType: "json",
        success: function(data) {
          var tempC= data['properties']['temperature'].value.toFixed(1);
          var tempF = (tempC * 9/5 + 32).toFixed(1);
          
          // get humidity
          var dewpoint = data['properties']['dewpoint'].value.toFixed(2);
  
          // get wind info and convert m/s to kts
          var barometricPressure = data['properties']['barometricPressure'].value;
          var seaLevelPressure = data['properties']['seaLevelPressure'].value;
  
          // uncomment this if you want to dump full JSON to textarea
          var myJSON = JSON.stringify(data);
          //$('textarea').val(myJSON);
          $('textarea').val(data['properties']['rawMessage']);
  
          //$('ul').empty();
          $('.list-group').empty();
          $('.card-icon-text').empty();
  
          var str = "<li>Current temperature: " + tempC +"C " + tempF+"F"+"</li>";
          $('ul').append(str);
          $('ul li:last').attr('class', 'list-group-item');
  
          // add additional code here for the Wind direction, speed, weather contitions and icon image
          var strDewpoint = "<li>Dewpoint : " + dewpoint + " degrees C</li>";
          $('ul').append(strDewpoint);
          $('ul li:last').attr('class', 'list-group-item');
  
          var strPressure = "<li>Barometric Pressure:" + barometricPressure + "Pa / Sea Level Pressure: " + seaLevelPressure + "Pa</li>";
          $('ul').append(strPressure);
          $('ul li:last').attr('class', 'list-group-item');
          
          var icon = data['properties']['icon']
          var text = data['properties']['textDescription']
  
          var iconText =
            "<div class='card-icon-text'><img src=" + icon + " /><p> " + text + "</p></div>";
          $('.card-body').append(iconText);
        }
      });
    });
  });