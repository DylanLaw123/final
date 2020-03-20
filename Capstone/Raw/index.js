$(document).ready(function() {
//    var myUrl = "https://api.coindesk.com/v1/bpi/currentprice/USD.json";
    var myUrl = "https://covid19.mathdro.id/api/daily/3-18-2020";

    var code = "USD";
    $('#hit-me').on('click', function(e) {
       alert("button hit!");
      $.ajax({
        url: myUrl,
        success: function(data) {
          //var bc = JSON.parse(data);

        //   price = bc.bpi[code].rate;
        //   console.log(price);
        //   $('#price').text(price);

            // var datap = data.filter(function (itt) {
            //     return (itt.countryRegion === "Italy" || itt.countryRegion === "France");
            // });

            var strTR = "";

            
            var result = [];
            data.reduce(function(res, value) {
                if (!res[value.countryRegion]){
                    res[value.countryRegion] = { countryRegion: value.countryRegion, confirmed: 0 };
                    result.push(res[value.countryRegion])
                  }
                res[value.countryRegion].confirmed += parseInt(value.confirmed);
                return res;
            }, {});


            var sortedResult = result.slice(0);
            sortedResult.sort(function(a, b) {
                return b.confirmed - a.confirmed;
            })

            sortedResult.forEach(function(item) {
                strTR = "<tr><td>" + item.countryRegion + "</td><td>" + item.confirmed + "</td></tr>";
                $('.tbody-data').append(strTR);
            });





            console.log(result);



            // Here's a simple array of "person" objects
            var people = [ 
                { name: "John", age: 20 }, 
                { name: "Mary", age: 35 }, 
                { name: "Arthur", age: 78 }, 
                { name: "Mike", age: 27 }, 
                { name: "Judy", age: 42 }, 
                { name: "Tim", age: 8 } 
            ];


            // filter is equivalent to Where

            var youngsters = people.filter(function (item) {
                return item.age < 30;
            });

            console.log("People younger than 30");

            console.log(youngsters);














        }
      });
    });
  });