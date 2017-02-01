console.log('working');

$(function(){ 

  $('#list').click(function(event){event.preventDefault();$('#products .item').addClass('list-group-item');});
  $('#grid').click(function(event){event.preventDefault();$('#products .item').removeClass('list-group-item');$('#products .item').addClass('grid-group-item');});

  $('#myModal').modal('show');
  $('#error').hide();

  $('#admin').click(function(){
    if ($('#password').val() === "dunedin"){
      window.location.href = "/home";
    } else {
      $('#error').show();
    }
  });


});



