console.log('working');

$(function(){ 

  $('#list').click(function(event){event.preventDefault();$('#products .item').addClass('list-group-item');});
  $('#grid').click(function(event){event.preventDefault();$('#products .item').removeClass('list-group-item');$('#products .item').addClass('grid-group-item');});

  $('#error').hide();

  if (document.cookie === ""){
    $('#myModal').modal('show');
  }

  $('#admin').click(function(){
    if ($('#password').val() === "dunedin"){
      document.cookie = "login=true;path=/";
      window.location.href = "/home";
    } else {
      $('#error').show();
    }
  });


});



