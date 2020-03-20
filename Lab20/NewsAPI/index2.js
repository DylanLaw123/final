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
  $('#search-submit').on('click', function(e) {
    var searchTerm = $('input').val();
    var newApiUrl = `http://newsapi.org/v2/everything?q=${searchTerm}&from=2020-02-20&sortBy=publishedAt&apiKey=ffccfb27dd914159ac7a448987736ee0`;
  
    $.ajax({
      url: newApiUrl,
      success: function(data) {

          $('.total-results').text(data.totalResults);
          var strLi = "";
          $('ul').empty();
          data.articles.forEach(function(item) {
            strLi = 
              `<li>
                  <p class="p-item">
                    <a href=${item.url}><img src=${item.urlToImage} alt="News picture" /></a>
                    <div class="item-text">
                      <a href=${item.url}><h5>${item.title}</h5></a>
                      <span class="small"><i>${item.author}</i></span>
                      <p>${item.description}</p>
                      <p class="small">${formatDateTime(new Date(item.publishedAt))} - ${item.source.name}</p>
                    </div>
                  </p>
                </li>`;
            $('ul').append(strLi);
            $('ul li:last').attr('class', 'list-group-item');
          });
      }
    });
  });
});
