var topics = ["Barack Obama", "Chrissy Teigen", "Elon Musk", "Beyonce", "Elvis Presley", "Coco Chanel", "Nelson Mandela", "Muhammad Ali"];

topics.forEach(addButton);

function addButton(value) {
    $("#buttons").append(`
        <button type="button" class="btn btn-info gifButton" value ="${value}">
        ${value}
        </button> 
    `)
}

$(document).on('click', '.gifButton', (function () {
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + this.value + "&api_key=bH6Z2SnUPSwc92UD6IScs1cLTuUXEaLb&limit=10";

    console.log(this.value);
    $("#gifs").empty();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        response.data.forEach(display);
    });
}));

$("#submit").click(function () {
    var input = $("#input").val();
    console.log(input);
    addButton(input);
});

function display(gifObject) {

    var stillURL = gifObject.images.original_still.url;
    var animateURL = gifObject.images.original.url;
    var rating = gifObject.rating;

    var toInsert = `
    <figure class="figure">
        <img src="${stillURL}" class="figure-img img-fluid gif" alt="gif" state="still" stillURL=${stillURL} animateURL=${animateURL}>
            <figcaption class="figure-caption text-right">Rating: ${rating}</figcaption>
    </figure>
    `;

    $("#gifs").append(toInsert);
}

$(document).on('click', '.gif', function () {

    console.log("here");
    console.log(this);

    var state = $(this).attr("state");

    console.log(state);

    if (state === "still") {
        $(this).attr("src", $(this).attr("animateURL"));
        $(this).attr("state", "animate");
    }


    if (state === "animate") {
        $(this).attr("src", $(this).attr("stillURL"));
        $(this).attr("state", 'still');
    }

});

