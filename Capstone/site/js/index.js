$(document).ready(function() {
  var today = new Date();
  var yesterday = new Date(today.setDate(today.getDate() - 1));
  let dateFormatted = (yesterday.getMonth() + 1) + "-" + yesterday.getDate() + "-" + yesterday.getFullYear()
  $('.yesterday').text(dateFormatted);

  var covidUrl = "https://covid19.mathdro.id/api/daily/" + dateFormatted;
    $.ajax({
      url: covidUrl,
      success: function(data) {
        var dataUS = data.filter(function (item) {
          return (item.countryRegion === "US");
        });

        var dataChina = data.filter(function (item) {
          return (item.countryRegion === "China");
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
             
        sortedResultChina.forEach(function(item) {
            strTR = "<tr><td>" + item.provinceState + "</td><td>" + item.confirmed + "</td><td class='red'>" + item.deaths + "</td><td>" + item.recovered + "</td></tr>";
            $('#china .tbody-data').append(strTR);
        });         
      }
    })
  }
);
