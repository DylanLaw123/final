$(document).ready(function () {
  // --------- jQuery Data Section ---------
  var book1 = {
    title: "The Lost Hero",
    date: "October 12, 2010",
    image: "LostHero.jpg"
  };
  var book2 = {
    title: "Son Of Neptune",
    date: "October 4 2011",
    image: "SonOfNeptune.png"
  };
  var book3 = {
    title: "Mark of Athena",
    date: "October 2 2012",
    image: "Athena.jpg"
  };
  var book4 = {
    title: "House of Hades",
    date: "October 8 2013",
    image: "Hades.jpg"
  };
  var book5 = {
    title: "Blood of Olympus",
    date: "October 7 2014",
    image: "Olympus.jpg"
  };

  var books = new Array();
  books.push(book1);
  books.push(book2);
  books.push(book3);
  books.push(book4);
  books.push(book5);

  var img_ref = {
    url:
      "https://i.insider.com/5a8de646391d948e008b4795?width=1300&format=jpeg&auto=webp",
    src: "https://bit.ly/338TQE6",
    alt: "Bill Gates",
    height: 150,
    width: 250
  };

  var reference = {
    url:
      "https://www.businessinsider.com/bill-gates-book-recommendations-summer-2019-5",
    src: "http://usat.ly/20hirO3",
    alt: "Gates Books",
    text: "BG:5 Books for Summer 2019"
  };
 

  $('#bg-pic img').attr('src', img_ref.src);
  $('#bg-pic img').attr('alt', img_ref.alt);
  $('#bg-pic img').attr({
    'height': img_ref.height,
    'width': img_ref.width
  });

  $('#bg-5books').css('padding-left', '10px');
  $('#bg-5books a').text(reference.text);
  $('#bg-5books a').attr('href', reference.url);
  $('#bg-5books a').attr('src', reference.src);


  var divImg = document.createElement("div");
  divImg.id = "image-div";
  divImg.style.margin = "auto";
  divImg.style.padding = "10px";
  

  var imgBook = document.createElement("img");
  imgBook.id = "book-image";
  imgBook.style.height = "300px";
  imgBook.src = "images/" + books[0].image;

  divImg.appendChild(imgBook);
  $('.card').append(divImg);


  $('ol').addClass("list-group");
  $('li').addClass("list-group-item");
  
  $('li').each(function (i) {

    this.innerText = books[i].title + ' / ' + books[i].date;
  });


  $('li:nth-child(1)').mouseover(function(){
    $("#image-div").css("display", "block");
    $("#book-image").attr("src", "images/" + books[0].image);
  });

  $('li:nth-child(2)').mouseover(function(){
    $("#image-div").css("display", "block");
    $("#book-image").attr("src", "images/" + books[1].image);
  });

  $('li:nth-child(3)').mouseover(function(){
    $("#image-div").css("display", "block");
    $("#book-image").attr("src", "images/" + books[2].image);
  });
  
  $('li:nth-child(4)').mouseover(function(){
    $("#image-div").css("display", "block");
    $("#book-image").attr("src", "images/" + books[3].image);
  });
  
  $('li:nth-child(5)').mouseover(function(){
    $("#image-div").css("display", "block");
    $("#book-image").attr("src", "images/" + books[4].image);
  });  


  $('li').mouseout(function(){
    $("#image-div").css("display", "none");
  });  

  $('li').each(function (i) {

    if (i % 2 !== 0)
    $(this).css({'background-color': 'pink'});
  });
 



});