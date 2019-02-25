// add sound variable
const ovation = new Audio("assets/effects/ovation.mp3");
const sad = new Audio("assets/effects/sad.mp3");

$('.Game-form').each(function(){

    // on submit
    $(this).on('submit', function(){

      // discover val from this form
      var numberToGuess = $(this).find('input').val();

      // find input
      var inputToZero = $(this).find('input');

      // button variable
      var button = $(this).find('button').prop('id');
      var btn = $('#'+button);

      //discover id of form for url submition
      var formId = $(this).prop('id');

      // get number from id of form.
      var srt = formId.match(/(\d+)/g);
      var player = srt[0];


      // var label
      var labelHigher = $(this).find('.Game-label.higher');

      // add loading classes
      $(btn).addClass('spinner-grow');
      $(btn).find('span').addClass('sr-only');

      // start chamada api
          $.getJSON({
          type: 'GET',
          url: 'https://www.drukzo.nl.joao.hlop.nl/challenge.php?player='+player+'&guess='+numberToGuess,
          success: function(data){
            // Higher
            if(data.guess == 'higher'){
              //  add sound effect
              sad.play();

              // remove loading classes
              $(btn).removeClass('spinner-grow');
              $(btn).find('span').removeClass('sr-only');

              // add label warning
              $(this).find('.Game-label.higher').css('display','block');

              // add animation classes
              $(btn).removeClass('btn-success');
              $(btn).addClass('btn-danger');
              $(btn).addClass('shake shake-constant shake-slow');

              setTimeout(function(){
                  $(inputToZero).val('');
                // remove animation classes
                  $(btn).addClass('btn-success');
                  $(btn).removeClass('btn-danger');
                  $(btn).removeClass('shake shake-constant shake-slow');
                  $(this).find('.Game-label.higher').fadeOut(200);
              }, 2000);

              // lower
            } else if (data.guess == 'lower') {

              //  add sound effect
              sad.play();

              // remove loading classes
              $(btn).removeClass('spinner-grow');
              $(btn).find('span').removeClass('sr-only');

              // add label warning
              $(this).find('.Game-label.lower').css('display','block');

              // add animation classes
              $(btn).removeClass('btn-success');
              $(btn).addClass('btn-warning');
              $(btn).addClass('shake shake-constant shake-slow');

              // set time out
              setTimeout(function(){
                    $(this).find('.Game-label.lower').fadeOut(300);
                    $(btn).addClass('btn-success');
                    $(btn).removeClass('btn-warning');
                    $(btn).removeClass('shake shake-constant shake-slow');
                    $(inputToZero).val('');
              }, 2000);

            }else{

              //  add sound effect
                ovation.play();

             // disable all buttons
                $('.Game-form-btn').prop('disabled', true);

            // remove loading
              $(btn).removeClass('spinner-grow');
              $(btn).find('span').removeClass('sr-only');

            // add label warning
              $(this).find('.Game-label.bingo').css('display','block');

            // add animation classes
              $('.Game-form-btn').removeClass('btn-success');
              $('.Game-form-btn').addClass('btn-light');

            // use set time out
            setTimeout(function(){
                $('.modal .modal-title').append(formId +' you have won this game');
                $('.modal .modal-body p').append('Very well '+formId+'! You choose correctly');
                $('.modal').modal('show');
            }, 2000);

            }

          }

      });

      return false;

  });

});

// New game
$('#new-game').on('click', function(){
      location.reload();
});
