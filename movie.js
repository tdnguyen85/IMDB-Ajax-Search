


$(document).ready(function(event){
  $('#results-list').on('click', 'li', function(){
    var selectionBox = $('#selected-result');
    var imdbID = $(this).attr('data-id');
    $.ajax({
      url: 'http://www.omdp.com/?i=' + imdbID,
      method: 'get',
      dataType: 'jsonp',
      success: function(movie){
        var movieTitle = movie['Title'];
        var movieYear = movie['Year'];
        var movieRuntime = movie['Year'];
        var movieGenre = movie['Genre'];
        var movieDirector = movie['Director'];
        var moviePlot = movie['Plot'];
        var selectionBox = $('#selected-result');
        selectionBox.append(movieTitle, movieYear, movieRuntime, movieGenre, movieDirector, moviePlot);
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
    var imdbID;
    $.ajax({
      url: 'http://www.omdbapi.com/?s=' + searchQuery,
      method: 'get',
      dataType: 'jsonp',
      success: function(omdb){
        $('#input-box').html(' ');
        searchResults = omdb.Search;
        console.log(omdb.Search);
        for(i=0; i<=searchResults.length; i+=1){
          var listItem = $("<li></li>");
          //var listLink = $("<a href=''></a>");
          var title = searchResults[i]['Title'];
          var year = searchResults[i]['Year'];
          imdbID = searchResults[i]['imdbID'];
          //listLink.append(year, title);
          listItem.append(year, title);
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