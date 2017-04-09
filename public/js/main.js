// hide before page loads
$('#error').hide();
$('#itemAddText').hide();

//*******************************************************//
//                    Cart Updates                       //
//*******************************************************//

updateNavItems();

function test123(){
  alert(">>>>Paypal Checkout Integration Goes Here<<<<");
}

function removeCartItem(item){
  localStorage.removeItem(item);
  updateNavItems();
  window.location.reload(false); 
}

function addToCart(id,name,price){
  $('#itemAddText').show();

  itemQuantity = $('#itemQuantity').val();
  var total = (itemQuantity*price).toFixed(2);
  var cartItem = { 'id': id, 'name':name, 'quantity': itemQuantity, 'price':price, 'total':total};
  // Put the object into storage
  localStorage.setItem(id, JSON.stringify(cartItem));
  updateNavItems();
}   

function updateNavItems(){
  var cartQuantity = 0;
  for(var lineItem in window.localStorage){
    var lineItemQuantity = parseInt(JSON.parse(window.localStorage.getItem(lineItem)).quantity);
    cartQuantity = cartQuantity + lineItemQuantity;
  }
  //Updated cartQuantity on Nav
  if(window.location.href.indexOf("auth") === -1){  
    $('#navCartItems')[0].textContent = " "+ cartQuantity + " Items";
  }  
}

//*******************************************************//
//*******************************************************//
//*******************************************************//


//On Page Load
$(function(){ 

  // $('#headlineTop').arctext({radius: 300});

  $('#list').click(function(event){event.preventDefault();$('#products .item').addClass('list-group-item');});
  $('#grid').click(function(event){event.preventDefault();$('#products .item').removeClass('list-group-item');$('#products .item').addClass('grid-group-item');});

  //Development || Auth Page
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
        } else {
          $('#error').show();
        }  
      }
    });    
  });

  // Check if user on cart page
  if(window.location.href.indexOf("cart") > -1){
    // window.location.reload(false);
    // Populate Shopping Cart Items and Totals using Local Storage
    if(window.localStorage.length===0){
      $('#emptyCart').show();    
      $('#cartTable').hide();
    }else{
      $('#emptyCart').hide();    
      $('#cartTable').show();
      var subtotal = 0;
      var shipping = 10;
      for (var item in window.localStorage){
        itemObj = JSON.parse(window.localStorage.getItem(item));
        subtotal = subtotal + (itemObj.price * itemObj.quantity);
        cartItemString = '<tr><td class="col-sm-8 col-md-6"><div class="media"><a class="thumbnail pull-left" href="#"> <img class="media-object" src="http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/72/product-icon.png" style="width: 72px; height: 72px;"> </a><div class="media-body"><h4 class="media-heading"><a href="#">'+itemObj.name+'</a></h4><h5 class="media-heading"> by <a href="#">Lyndee Lyndsey</a></h5><span>Status: </span><span class="text-success"><strong>In Stock</strong></span></div></div></td><td class="col-sm-1 col-md-1" style="text-align: center"><input type="number" class="form-control" id="quantity" value="'+itemObj.quantity+'" disabled></td><td class="col-sm-1 col-md-1 text-center"><strong>'+itemObj.price+'</strong></td><td class="col-sm-1 col-md-1 text-center"><strong>'+itemObj.total+'</strong></td><td class="col-sm-1 col-md-1"><button type="button" class="btn btn-danger" onclick="removeCartItem(\''+itemObj.id+'\')"><span class="glyphicon glyphicon-remove"></span> Remove</button></td></tr>';
        // $('#cartList').append('<li> Item: ',itemObj.name,' Quantity: ', itemObj.quantity,'</li>');    
        $('#cartList').prepend(cartItemString);
      }
      var sum = subtotal+shipping;
      var total = sum.toFixed(2);

      $('#cartSubtotal')[0].textContent = "$ "+subtotal.toFixed(2);
      $('#cartTotal')[0].textContent = "$ "+total;
    }

    //Render Paypal Checkout Button
    paypal.Button.render({
      env: 'production', // Optional: specify 'sandbox' environment
      client: {
          sandbox:    'AfzwsZK9-P2UwhNErfkSgUZ-_-Y1HRvOAtENmloeVZDRjvNVN-hxla5NSxmL0j_rs3HhDyutEuxV5Kg8',
          production: 'AWsviNjrOAXpMKGKmCcSZVpzT8vcHIiYK39aOBz0KRnbKqUyhejhNFPznlhJG1LdDX4UOFiOUEQCO7N8'
      },        
      payment: function() {
          var env    = this.props.env;
          var client = this.props.client; 
          return paypal.rest.payment.create(env, client, {
              transactions: [
                  {
                      amount: { total: '1.00', currency: 'USD' }
                  }
              ]
          });
      },
      commit: true, // Optional: show a 'Pay Now' button in the checkout flow        
      onAuthorize: function(data, actions) {      
        return actions.payment.execute().then(function() {
          window.localStorage.clear();
          window.location.href = "/confirmation";
        });
      }
    }, '#paypal-button');
  }





});



