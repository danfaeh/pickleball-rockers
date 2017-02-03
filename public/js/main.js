console.log('working');

$(function(){ 

  $('#list').click(function(event){event.preventDefault();$('#products .item').addClass('list-group-item');});
  $('#grid').click(function(event){event.preventDefault();$('#products .item').removeClass('list-group-item');$('#products .item').addClass('grid-group-item');});

  $('#error').hide();

  if (document.cookie === ""){
    $('#myModal').modal('show');
  }

  $('#admin').click(function(){
    var pass = $('#password').val();
    $.ajax({
      type: "POST",
      url: "/auth",
      data: {"pass": pass},
      success: function(data) { 
        if(data){
          document.cookie = pass;
          window.reload();
        } else {
          window.location.href = "/";
        }  
      }
    });    
  });


});



