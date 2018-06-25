$(document).ready(function() {

$("#find-gif").on("click", function(event) {
    event.preventDefault();
    var gif = $("#gif-input").val();

    let newButton = $("<button>");
    newButton.text(gif)
    newButton.addClass("gif-button");
    $("#gif-buttons").append(newButton);
    $("#gif-input").val("")
}); //click function closer

$(document).on("click", ".gif-button", function (){
    var gif = $(this).text();
    var queryURL = "https://api.giphy.com/v1/gifs/search";
    
    $.ajax({
        data: {
            "q": gif,
            "api_key": "tPlgZhd5JvBYUo8ZY4Zk4CXWGhslT3x4",
            "limit":10,
        },
        url: queryURL,
        method: "GET",
    })

    .then(function(response) {
        $("#gif-view").empty();
        console.log(response)
        response.data.forEach(element => {
            
            var gifDiv = $("<div class='card' style='width: 18rem'>");
            var ratingDiv = $("<div class='card-body'>")
            var rating = $("<p class='card-text'>").text("Rating: " + element.rating);
            ratingDiv.append(rating)

            let urlStill = element.images.fixed_height_still.url;
            let urlAnimate = element.images.fixed_height.url;
            console.log("Url: ", urlStill)
            let newImg = $("<img class='card-img-top gif' data-state='still'>");
            newImg.attr("src", urlStill);
            newImg.attr("data-still", urlStill);
            newImg.attr("data-animate", urlAnimate);

            gifDiv.prepend(newImg, ratingDiv);

            $("#gif-view").append(gifDiv);

        }); //forEach function closer

    }); //.then function closer
    
}); //click function closer

$(document).on("click", ".gif", function (){
    var state = ($(this).data("state"));
    if(state === "still"){  // this gif that is clicked on if that state is equal to still then do following:
        
        $(this).attr("src", $(this).data("animate")); //changing this gif's attribute src to read from data-animate instead of data-still url.
        $(this).data("state","animated"); //changing this gif's data state from still to animated tag. 
      }

      else if (state === "animated") {

        $(this).attr("src", $(this).data("still"));
        $(this).data("state", "still");
      }
});













}); //ready function closer

