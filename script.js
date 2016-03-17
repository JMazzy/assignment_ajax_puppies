var puppyListModule = (function() {
  var puppyList, jqXHR, breedList;

  var registerEventListener = function () {
    $("#get-puppies").on("click", function(e) {
      e.preventDefault();
      getPuppyList();
    });

    $("form").on("click", "#register-puppy" function(e) {
      e.preventDefault();
      var name = $("#name").val();
      var breed = $("#breed-list").val();
      createPuppy( name, breed );
    });
  };

  var createPuppy = function(name,breed) {
    $.ajax( {
      url: 'https://ajax-puppies.herokuapp.com/puppies.json',
      type: "POST",
      data: JSON.stringify( { name: name, breed_id: breed } ),
      dataType: "json",
      headers: JSON.stringify( { 'Content-Type': 'application/x-www-form-urlencoded') } ),
      success: function() {
        console.log("created puppy");
      },
      error: function() {
        console.log("didn't create puppy")
      },
      complete: function() {
        console.log("complete")
      }
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

  var getBreedList = function() {
    breedList = $.ajax( {
      url: "https://ajax-puppies.herokuapp.com/breeds.json",
      data: {},
      type: "GET",
      success: function() {
        populateBreedList();
      },
      error: function() {
        console.log("error");
      },
      complete: function() {
        console.log("complete");
      }
    })
  };

  var populateBreedList = function() {

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
