console.log('working');
$('#error').hide();

$(function(){ 

  // $('#headlineTop').arctext({radius: 300});

  $('#list').click(function(event){event.preventDefault();$('#products .item').addClass('list-group-item');});
  $('#grid').click(function(event){event.preventDefault();$('#products .item').removeClass('list-group-item');$('#products .item').addClass('grid-group-item');});

  //Development Auth Page
  $('#admin').click(function(e){
    e.preventDefault();
    var pass = $('#password').val();
    $.ajax({
      type: "POST",
      url: "/auth",
      data: {"pass": pass},
      success: function(data) { 
        if(data){
          document.cookie = pass;
          window.location.href = "/";
          console.log("dunedin rocks!");
        } else {
          $('#error').show();
        }  
      }
    });    
  });

  function addToCart(id,quantity){
    document.cookie = {
      id: id,
      quantity: quantity
    };
  }


});



