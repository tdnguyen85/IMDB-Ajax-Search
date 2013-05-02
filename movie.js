


$(document).ready(function(){
  $('#results-list').on('click', 'li', function(){
    var imdbID = $(this).attr('data-id');
    $.ajax({
      url: 'http://www.omdbapi.com/?i=' + imdbID,
      method: 'get',
      dataType: 'json',
      success: function(movie){
        var movieTitle = movie['Title'];
        var movieYear = movie['Year'];
        var movieRuntime = movie['Runtime'];
        var movieGenre = movie['Genre'];
        var movieDirector = movie['Director'];
        var moviePlot = movie['Plot'];
        var selectionBox = $('#selected-result');
        var listElements = $('<li><h3></h3></li>');
        listElements.append(movieTitle);
        selectionBox.append(listElements);
      }
    });
  });
  $('form').bind('keyup submit', function(event){
    event.preventDefault();
    var form = $(this);
    var searchQuery = $('#input-box').val();
    //var resultsBox = $('#search-results');
    var resultsList = $('#results-list');
    //var selectionBox = $('#selected-result');
    var searchResults;
    //var selectedResult;
    var imdb;
    $.ajax({
      url: 'http://www.omdbapi.com/?s=' + searchQuery,
      method: 'get',
      dataType: 'jsonp',
      success: function(omdb){
        $('#input-box').html(' ');
        searchResults = omdb.Search;
        for(i=0; i<searchResults.length; i+=1){
          //var listLink = $("<a href=''></a>");
          var title = searchResults[i]['Title'];
          var year = searchResults[i]['Year'];
          imdb = searchResults[i]['imdbID'];
          var listItem = $('<li data-id="' + imdb + '"></li>');

          //listLink.append(year, title);
          listItem.append(year, ' : ', title);
          resultsList.append(listItem);
          //http://www.omdbapi.com/?i=" + imdbID + "'></a>
        }
      },
      error: function(){
        $('.error').slideDown();
        setTimeout(function(){$('.error').slideUp();}, 3000);
      }
    });
  });
});