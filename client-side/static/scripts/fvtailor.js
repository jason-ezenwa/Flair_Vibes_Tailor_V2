$(document).ready(function(){
    // direct the user to the flair vibes tailor from the landing page whenever any of these buttons is clicked.
    $('#tryit_button').click(function() {
        window.location = './flair-vibes-tailor-form.html';
    });
    $('#cta_button').click(function() {
        window.location = './fvt-landing-page.html';
    });


    // code for the flair vibes tailor server side 
    const apiUrl = 'http://flair-vibes-tailor-backend.vercel.app/api/v1/get_recommendations';
    let query_data = {}
    $('form#submit_songs').submit(function(event) {
        event.preventDefault();
        let songTitle = $('#song_title').val();
        let artistName = $('#artist_name').val();
        query_data['song_name'] = songTitle;
        query_data['artist'] = artistName;

        $.ajax({
            // handles the post request for submitting song details and handles rendering of the recommendations
            type: 'POST',
            url: apiUrl,
            contentType: 'application/json',
            data: JSON.stringify(query_data),
            success: function(response) {
                $('section.welcome').empty();
                $('section.submission').empty();
                $('section.recommendations').empty();

                // get tracks from the submit_song endpoint reponse
                let tracks = response['tracks'];
                let thankYouNote = `<h2 class="thankyounote">Thank you for using Flair Vibes Tailor</h2>`
                let message = `<h4 class="recommendation-text">Based on your favourite song, <b>${songTitle}</b>, here are some songs we think you might like!</h4>`;
                let goagainButton = `<form>
                    <input type="submit" value="ouu i wanna go again!" id="goagainButton">
                </form>`

                // append the thank you note and the message.
                $('section.welcome').append(thankYouNote);
                $('section.recommendations').append(message);
                console.log(tracks)
                for (const track of tracks) {
                    //parsedTrack = JSON.parse(track)
                    // each track returned by the response is listed/rendered to the screen
                    let recommendations = `
                    <ul class="recommendation-list">
                    <li><b>${track['title']}</b> by ${track['artist']}
                    <p class="listtext"> listen to <a href="${track['link']}" target="_blank"> ${track['title']}</a> on spotify</p>
                    </li>
                    </ul>`;
                    $('section.recommendations').append(recommendations);
                }
                $('section.recommendations').append(goagainButton);
            },

            // handle errors 400 and 500
            error: function(tokenErr, textStatus, errorThrown) {
                $('section.recommendations').empty();
                if (tokenErr.status === 400) {
                // handle error
                let message = `<h4>oops something went wrong, please try again some other time</h4>`;
                $('section.recommendations').append(message);
                } else if (tokenErr.status === 500) {
                    // if the error returned is 500, then it is most likely that there is an error in the song details submitted
                    let message = `<h4>oops something went wrong, please check your submitted details</h4>
                                    <p>note: the song submited might not be present on major streaming services like apple music and/or spotify</p>`;
                    $('section.recommendations').append(message);
                }
            }
        });
    });

    // reloads the page if the go again button is clicked
    $('form#goagainButton').submit(function(event) {
        event.preventDefault();
        location.reload(true);
    });
});