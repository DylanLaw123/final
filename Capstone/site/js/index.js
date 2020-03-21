
function formatDateTime(date) {
  var year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate(),
      hour = date.getHours(),
      minute = date.getMinutes(),
      hourFormatted = hour % 12 || 12,
      minuteFormatted = minute < 10 ? "0" + minute : minute,
      morning = hour < 12 ? "am" : "pm";

  return month + "/" + day + "/" + year + " " + hourFormatted + ":" +
          minuteFormatted + morning;
}

$(document).ready(function() {
  var today = new Date();
  var yesterday = new Date(today.setDate(today.getDate() - 1));
  let dateFormatted = (yesterday.getMonth() + 1) + "-" + yesterday.getDate() + "-" + yesterday.getFullYear()
  $('.yesterday').text(dateFormatted);

  var covidDailyUrl = "https://covid19.mathdro.id/api/daily/" + dateFormatted;
  var covidUSAUrl = "https://covid19.mathdro.id/api/countries/USA";
  var covidChinaUrl = "https://covid19.mathdro.id/api/countries/China"; 

  var resultDaily;
  var resultUSA;
  var resultChina;

  $.when(
    $.ajax({
        url: covidDailyUrl, 
        success: function(data){     
          resultDaily = data;                  
        }           
    }),

    $.ajax({
      url: covidUSAUrl, 
      success: function(data){     
        resultUSA = data;                  
      }           
    }),

    $.ajax({
      url: covidChinaUrl, 
      success: function(data){     
        resultChina = data;                  
      }           
    }) 
  ).then(function() {
    var data = resultDaily; 
    var dataUS = data.filter(function (item) {
      return (item.countryRegion === "US" && item.provinceState !== "US");
    });

    var dataChina = data.filter(function (item) {
      return (item.countryRegion === "China" && item.provinceState !== "China");
    });

    // Group the result of the world status by country
    var resultWorld = [];
    data.reduce(function(res, value) {
        if (!res[value.countryRegion]){
            res[value.countryRegion] = { countryRegion: value.countryRegion, confirmed: 0, deaths: 0, recovered: 0 };
            resultWorld.push(res[value.countryRegion])
          }
        res[value.countryRegion].confirmed += parseInt(value.confirmed);
        res[value.countryRegion].deaths += parseInt(value.deaths);
        res[value.countryRegion].recovered += parseInt(value.recovered);
        return res;
    }, {});

    // Sort the result for world, us and China
    var sortedResultWorld = resultWorld.slice(0);
    sortedResultWorld.sort(function(a, b) {
        return b.confirmed - a.confirmed;
    })

    var sortedResultUS = dataUS.slice(0);
    sortedResultUS.sort(function(a, b) {
        return b.confirmed - a.confirmed;
    })

    var sortedResultChina = dataChina.slice(0);
    sortedResultChina.sort(function(a, b) {
        return b.confirmed - a.confirmed;
    })

    // Display the result for world, us and China
    var strTR = "";        
    sortedResultWorld.forEach(function(item) {
        strTR = "<tr><td>" + item.countryRegion + "</td><td>" + item.confirmed + "</td><td class='red'>" + item.deaths + "</td><td>" + item.recovered + "</td></tr>";
        $('#world .tbody-data').append(strTR);
    });
  
    sortedResultUS.forEach(function(item) {
        strTR = "<tr><td>" + item.provinceState + "</td><td>" + item.confirmed + "</td><td class='red'>" + item.deaths + "</td></tr>";
        $('#us .tbody-data').append(strTR);
    });
    $('#us .confirmed').text(resultUSA.confirmed.value);  
    $('#us .recovered').text(resultUSA.recovered.value);  
    $('#us .deaths').text(resultUSA.deaths.value);         
    $('#us .lastUpdated').text(formatDateTime(new Date(resultUSA.lastUpdate)));    

    sortedResultChina.forEach(function(item) {
        strTR = "<tr><td>" + item.provinceState + "</td><td>" + item.confirmed + "</td><td class='red'>" + item.deaths + "</td><td>" + item.recovered + "</td></tr>";
        $('#china .tbody-data').append(strTR);
    });
    $('#china .confirmed').text(resultChina.confirmed.value);  
    $('#china .recovered').text(resultChina.recovered.value);  
    $('#china .deaths').text(resultChina.deaths.value);         
    $('#china .lastUpdated').text(formatDateTime(new Date(resultChina.lastUpdate)));    
  })
})
