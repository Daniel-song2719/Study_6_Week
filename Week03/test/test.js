let countryList = [];


fetch("https://restcountries.eu/rest/v2/all") 

 
  .then(function (response) {

    
    country = response.json();

  
    return country;
  })

  .then(function (country) {
    for (var i = 0; i < country.length; i++) {
      
      countryList.push(country[i].name.toLowerCase());
    }
    
    return countryList;
  })
  .then()


// variables
var input = document.querySelector('input');
var results;


console.log(countryList)

// functions
function autocomplete(val) {
  var countryList_return = [];

  for (i = 0; i < countryList.length; i++) {
    if (val === countryList[i].slice(0, val.length)) {
      countryList_return.push(countryList[i]);
    }
  }

  return countryList_return;
}

// events
input.onkeyup = function(e) {
  input_val = this.value; // updates the variable on each ocurrence

  if (input_val.length > 0) {
    var countryList_to_show = [];

    autocomplete_results = document.getElementById("autocomplete-results");
    autocomplete_results.innerHTML = '';
    countryList_to_show = autocomplete(input_val);
    
    for (i = 0; i < countryList_to_show.length; i++) {
      autocomplete_results.innerHTML += '<li>' + countryList_to_show[i] + '</li>';

    }
    autocomplete_results.style.display = 'block';
  } else {
    countryList_to_show = [];
    autocomplete_results.innerHTML = '';
  }
}