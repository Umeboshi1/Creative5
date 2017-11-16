$(document).ready(function(){
  $("#registerUser").click(function(){
      var myobj = {Username:$("#name").val(),Password:$("#password").val()};
      jobj = JSON.stringify(myobj);
      $("#json").text(jobj);
      var url = "comment";
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
    $.getJSON('comment', function(data) {
      console.log(data);
      var everything = "<ul>";
      for(var comment in data) {
        com = data[comment];
        everything += "<li> Name: " + com.Name + " -- Comment: " + com.Comment + "</li>";
      }
      everything += "</ul>";
      $("#comments").html(everything);
    })
  })

  $("#deleteUser").click(function() {
    $.ajax({
    url:"comment",
    type: "DELETE",
    success: function(data,textStatus) {
    $("#comments").html("User deleted!");
}
})
});
});
