$(document).ready(()=>{
$("#searchForm").on("submit",(e)=>{
    e.preventDefault();
    let searchText = $("#searchText").val();
    getMovies(searchText);

});
});
const apikey='4dcad61a';

function getMovies(searchText)
{
    
    axios.get('https://omdbapi.com?apikey='+apikey+'&s='+searchText)
    .then((response)=>{
       console.log(response);
       let movies=response.data.Search;
       let output ='';
       $.each(movies,(index,movie)=>{
           //console.log(movie.Poster);
           output+=`
           <div class="col-md-3">
            <div class="well text-center">
              <img src = "${movie.Poster}">
              <br>
              <h4 style="user-select: auto;">${movie.Title}</h4>
              <a onClick="movieSelected('${movie.imdbID}')" class="btn btn-outline-info href="#">Movie Details</a>
            </div>
           </div>
            `
       })
       $('#movies').html(output);
    })
    .catch((error)=>{
        console.log(error);
        
    })
    ;
}
// difference between localstorage and session storage is 
// session storage clears out when you close browser window
// we are saving it here in session storage
function movieSelected(id){
   sessionStorage.setItem('movieId', id);
   window.location = 'movie.html';
   return false;
}

function getMovie(){
    let movieId=sessionStorage.getItem('movieId');
    axios.get('https://omdbapi.com?apikey='+apikey+'&i='+movieId)
    .then((response)=>{
       console.log(response);
       let  movie=response.data;
      
       let output=`
           <div class="row">
            <div class="col-md-4">
              <img src = "${movie.Poster}">
            </div>
            <div class="col-md-8>
              <h2>${movie.Title}</h2>
              <ul class="list-group">
              <li class="list-group-item">Genre: ${movie.Genre}</li>
              <li class="list-group-item">Released:</strong> ${movie.Released}</li>
              <li class="list-group-item">Rated:</strong> ${movie.Rated}</li>
              <li class="list-group-item">IMDB Rating:</strong> ${movie.imdbRating}</li>
              <li class="list-group-item">Director:</strong> ${movie.Director}</li>
              <li class="list-group-item">Actors:</strong> ${movie.Actors}</li>
              <li class="list-group-item">Writers:</strong> ${movie.Writer}</li>
              <li class="list-group-item">Production House:</strong> ${movie.Production}</li>
              </ul>
            </div>
           </div>
           <hr>
           <div class="row">
            <div class="well">
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-info">Go Back to HomePage</a>
            </div>
           </div>
            `
            $('#movie').html(output);
    })
    .catch((error)=>{
        console.log(error);
        
    })
    ;

}
