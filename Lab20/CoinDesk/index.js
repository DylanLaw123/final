$(document).ready(function() {
  var myUrl = "https://api.coindesk.com/v1/bpi/currentprice/USD.json";
  var code = "USD";

  var graphData = [
    // {"period": "2018-02-24 15:00:00", "price": 3407.98},
  ];

  var ml = Morris.Line({
    element: 'graph',
    data: graphData,
    xkey: 'period',
    ykeys: ['price'],
    xlabels: '10sec',
    labels: ['price']
  });

  var count = 0;

  // Run the function every 5 seconds
  setInterval(function() {
    $.ajax({
      url: myUrl,
      success: function(data) {
        var bc = JSON.parse(data);
        price = bc.bpi[code].rate;
        console.log(price);
        $('#price').text(price);
        priceNumber = price.replace(/[^\d\.\-]/g, "");

        count++;
        if (count === 10){
          count = 0;
          graphData = [];
        } else {
          graphData.push(
            {"period": new Date().getTime(), "price": parseFloat(priceNumber).toFixed(2)}
          )
        }
        ml.setData(graphData);
      }
    });
  }, 10000);






});