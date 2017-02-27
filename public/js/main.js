console.log('working');
$('#error').hide();

$(function(){ 

  // $('#headlineTop').arctext({radius: 300});

  $('#list').click(function(event){event.preventDefault();$('#products .item').addClass('list-group-item');});
  $('#grid').click(function(event){event.preventDefault();$('#products .item').removeClass('list-group-item');$('#products .item').addClass('grid-group-item');});

  $('#admin').click(function(){
    var pass = $('#password').val();
    if(pass === "dunedin"){
      document.cookie = pass;
      window.location.href = "/";
    }
    // $.ajax({
    //   type: "POST",
    //   url: "/auth",
    //   data: {"pass": pass},
    //   success: function(data) { 
    //     if(data){
    //       document.cookie = pass;
    //       window.location.href = "/";
    //       console.log("dunedin rocks!");
    //     } else {
    //       $('#error').show();
    //     }  
    //   }
    // });    
  });


});



