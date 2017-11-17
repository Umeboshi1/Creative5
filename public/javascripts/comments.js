$(document).ready(function(){
  $("#registerUser").click(function(){
      var myobj = {Username:$("#userName").val(),Password:$("#password").val()};
      jobj = JSON.stringify(myobj);
      $("#json").text(jobj);
      var url = "user";
      $.ajax({
      url:url,
      type: "POST",
      data: jobj,
      contentType: "application/json; charset=utf-8",
      success: function(data,textStatus) {
      $("#done").html(textStatus);
      }
    });
  });

$("#loginUser").click(function() {
    $.getJSON('user', function(data) {
      console.log(data);
      var everything = "<p>";
      if(data === true) {
        console.log('data is true');
        everything += "<h2> Login Successful! </h2>";
      }
      else {
        console.log('data is false');
        everything += "<h2> Login not successful, try registering first! </h2>";
      }
//       var everything = "<ul>";
//       for(var comment in data) {
//         com = data[comment];
//         everything += "<li> Username: " + com.Username + " -- Password: " + com.Password + "</li>";
//       }
      everything += "</p>";
      $("#comments").html(everything);
    })
  })
  
  $("#showAll").click(function() {
    $.getJSON('user', function(data) {
      console.log(data);
      var everything = "<ul>";
      for(var comment in data) {
        com = data[comment];
        everything += "<li> Username: " + com.Username + " -- Password: " + com.Password + "</li>";
      }
      everything += "</ul>";
      $("#comments").html(everything);
    })
  })

  $("#deleteUser").click(function() {
    var myobj = {Username:$("#userName").val(),Password:$("#password").val()};
    jobj = JSON.stringify(myobj);
    $.ajax({
    url:"user",
    type: "DELETE",
    data:jobj,
    success: function(data,textStatus) {
    $("#comments").html("User deleted!");
}
})
});
});
