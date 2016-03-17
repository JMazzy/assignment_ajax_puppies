var puppyListModule = (function() {
  var puppyList, ajaxPuppies, breedList, ajaxBreeds;

  var registerEventListener = function () {
    $("#get-puppies").on("click", function(e) {
      e.preventDefault();
      getPuppyList();
    });

    $("form").on("click", "#register-puppy", function(e) {
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
      contentType: "application/x-www-form-urlencoded",
      dataType: "json",
      headers: JSON.stringify( { 'Content-Type': 'application/x-www-form-urlencoded' } ),
      success: function() {
        console.log("created puppy");
        addToPuppyList(name, breed, new Date());
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
    ajaxPuppies = $.ajax( {
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
    var jsonArray = JSON.parse(ajaxPuppies.responseText)
    $("#puppy-list").empty();

    for (var i = 0; i < jsonArray.length; i++) {
      var name = jsonArray[i].name;
      var breed = jsonArray[i].breed.name;
      var createdAt = jsonArray[i].created_at;
      addToPuppyList(name, breed, createdAt);
    }
  };

  var addToPuppyList = function(name, breed, createdAt) {
    var newLi,
    newA,
    $hook = $("#puppy-list");

    // Populate each puppy entry in list
    newLi = $("<li></li>");
    newLi.text( name + " (" +  breed + "), " + createdAt + " -- " );

    // Create adopt link
    newA = $("<a></a>");
    newA.text("adopt");
    newA.attr("href", "#");

    // Append to DOM
    newA.appendTo(newLi);
    newLi.appendTo($hook);
  }

  var getBreedList = function() {
    ajaxBreeds = $.ajax( {
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
    var jsonArray = JSON.parse(ajaxBreeds.responseText),
      newOption,
      $hook = $("#breed-select");
      $hook.empty();

    for (var i = 0; i < jsonArray.length; i++) {
      // Populate each puppy entry in list
      newOption = $("<option></option>");
      newOption.val( jsonArray[i]["id"] );
      newOption.text( jsonArray[i]["name"] );

      // Append to DOM
      newOption.appendTo($hook);
    }
  };

  return {
    registerEventListener: registerEventListener,
    getPuppyList: getPuppyList,
    getBreedList: getBreedList,
  };

})();

$(document).ready(function() {
  puppyListModule.registerEventListener();
  puppyListModule.getBreedList();
  puppyListModule.getPuppyList();
});
