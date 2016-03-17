var puppyListModule = (function() {
  var puppyList, jqXHR;

  var registerEventListener = function () {
    $("#get-puppies").on("click", function(e) {
      e.preventDefault();
      getPuppyList();
    });
  };

  var getPuppyList = function() {
    jqXHR = $.ajax( {
      url: "https://ajax-puppies.herokuapp.com/puppies.json",
      data: {},
      type: "GET",
      dataType: "json",
      success: function() {
        populatePuppyList();
      },
      error: function() { console.log("error"); },
      complete: function() { console.log("complete"); }
    });
  };

  var populatePuppyList = function() {
    var jsonArray = JSON.parse(jqXHR.responseText),
      newLi,
      newA,
      hook = $("#puppy-list");
      
    for (var i = 0; i < jsonArray.length; i++) {
      // Populate each puppy entry in list
      newLi = $("<li></li>");
      newLi.text( jsonArray[i].name + " (" +  jsonArray[i].breed.name + "), " + jsonArray[i].created_at + " -- " );

      // Create adopt link
      newA = $("<a></a>");
      newA.text("adopt");
      newA.attr("href", "#");

      // Append to DOM
      newA.appendTo(newLi);
      newLi.appendTo(hook);
    }

  };

  return {
    registerEventListener: registerEventListener,
    jqXHR: jqXHR
  };

})();

$(document).ready(function() {
  puppyListModule.registerEventListener();
});
