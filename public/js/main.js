// hide before page loads
$('#error').hide();
$('#itemAddText').hide();

//*******************************************************//
//                    Cart Updates                       //
//*******************************************************//

updateNavItems();

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

//*******************************************************//
//                Remove Products / Logos                //
//*******************************************************//

function removeProduct(productId){
  $.ajax({
    type: "POST",
    url: "/products/remove",
    data: {"productId": productId},
    success: function(data) { 
      if(data){
        window.location.reload(false);         
      } else {
        console.log("fail!!!!");
      }  
    }
  });
}

function removeLogo(logoId){
    console.log("inside AJAX function", logoId);
  $.ajax({
    type: "POST",
    url: "/logos/remove",
    data: {"logoId": logoId},
    success: function(data) { 
      if(data){
     console.log("AJAX success logo remove");
        window.location.reload(false);         
      } else {
        console.log("fail!!!! logo");
      }  
    }
  });
}

//*******************************************************//
//*******************************************************//
//*******************************************************//

function changeSex(){
  var sex = $('#sex').val();
  if (sex =="male"){
    $('#menColor').show();
    $('#womenColor').hide();    
    $('#menSize').show();
    $('#womenSize').hide();
  } 
  else{
    $('#womenColor').show();
    $('#menColor').hide();
    $('#womenSize').show();
    $('#menSize').hide();    
  }  
}

//On Page Load
$(function(){ 

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

  if(window.location.href === "http://localhost:4000/" || window.location.href === "http://www.pickleballrockers.com/"){
    setTimeout(function(){ 
      $('#home1').hide(); 
      $('#home2').show(); 

      $('#topArc').circleType({radius: 190});
      $('#bottomArc').circleType({radius: 190, dir:-1});
    }, 5000);
  }

  // Check if user on cart page
  if(window.location.href.indexOf("cart") > -1){

    // Populate Shopping Cart Items and Totals using Local Storage
    if(window.localStorage.length===0){
      $('#emptyCart').show();    
      $('#cartTable').hide();
    }else{
      $('#emptyCart').hide();    
      $('#cartTable').show();

      var subtotal = 0;
      var shipping = 10;
      var paypalCartItems=[];

      //loop through Local Storage Cart Items and append them to the customer Cart. Also build cartItems array.
      for (var item in window.localStorage){
        itemObj = JSON.parse(window.localStorage.getItem(item));

        var paypalCartItem = {
          "name": itemObj.name,
          // "description": "Brown hat.",
          "quantity": itemObj.quantity,
          "price": itemObj.price,
          // "tax": "0.00",
          "sku": itemObj.id,
          "currency": "USD"          
        };

        paypalCartItems.push(paypalCartItem);

        cartItemString = '<tr><td class="col-sm-8 col-md-6"><div class="media"><a class="thumbnail pull-left" href="#"> <img class="media-object" src="http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/72/product-icon.png" style="width: 72px; height: 72px;"> </a><div class="media-body"><h4 class="media-heading"><a href="#">'+itemObj.name+'</a></h4><h5 class="media-heading"> by <a href="#">Lyndee Lyndsey</a></h5><span>Status: </span><span class="text-success"><strong>In Stock</strong></span></div></div></td><td class="col-sm-1 col-md-1" style="text-align: center"><input type="number" class="form-control" id="quantity" value="'+itemObj.quantity+'" disabled></td><td class="col-sm-1 col-md-1 text-center"><strong>$'+itemObj.price+'</strong></td><td class="col-sm-1 col-md-1 text-center"><strong>$'+itemObj.total+'</strong></td><td class="col-sm-1 col-md-1"><button type="button" class="btn btn-danger" onclick="removeCartItem(\''+itemObj.id+'\')"><span class="glyphicon glyphicon-remove"></span> Remove</button></td></tr>';
        $('#cartList').prepend(cartItemString);

        subtotal = subtotal + (itemObj.price * itemObj.quantity);
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
          production: 'AbRDZyz98jAw1NKIOafI93bTz7rG8dEgD3VjvM_hnMi1JF-0LbE1p5TJGi_fMRhRk-4GLmqZb8TOGmqg'
      },        
      payment: function() {
          var env    = this.props.env;
          var client = this.props.client; 
          return paypal.rest.payment.create(env, client, {
              transactions: [
                {
                  "amount": {
                  "total": total,
                  "currency": "USD",
                  "details": {
                    "subtotal": subtotal,
                    // "tax": "0.07",
                    "shipping": shipping
                  }
                  },
                  "description": "The payment transaction description.",
                  // "custom": "EBAY_EMS_90048630024435",
                  // "invoice_number": "48787589673",
                  // "payment_options": {
                  // "allowed_payment_method": "INSTANT_FUNDING_SOURCE"
                  // },
                  // "soft_descriptor": "ECHI5786786",
                  "item_list": {
                  "items": paypalCartItems
                  }
                }
                ]


          });
      },
      commit: true, // Optional: show a 'Pay Now' button in the checkout flow        
      onAuthorize: function(data, actions) {      
        return actions.payment.execute().then(function() {
          sendConfirmationEmail(paypalCartItems);
          window.localStorage.clear();
          updateNavItems();
          window.location.href = "/confirmation";
        });
      }
    }, '#paypal-button');
  }

  function sendConfirmationEmail(orderItems){
    console.log("inside sendConfirmationEmail",orderItems);
    $.ajax({
      type: "POST",
      url: "/orderConfirmation",
      data: {"orderItems": orderItems},
      success: function(data) { 
        if(data){
          console.log("order details successfully sent to email");
          console.log("data: ", data);
        } else {
          console.log("There was an error processing the order.");
        }  
      }
    });
  }



});



