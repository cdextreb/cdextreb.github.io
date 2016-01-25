
  var latitude = '52.4308';
    var longitude = '13.2588';
  function ForecastIO(config) {
   
    if(!config) {
      console.log('You must pass ForecastIO configurations');
    }
    if(!config.PROXY_SCRIPT) {
      if(!config.API_KEY) {
        console.log('API_KEY or PROXY_SCRIPT must be set in ForecastIO config');
      }
    }
    this.7f43ecf485828c3fbdae18d1e559fb23 = config.7f43ecf485828c3fbdae18d1e559fb23;
    this.url = (typeof config.PROXY_SCRIPT !== 'undefined') ? config.PROXY_SCRIPT + '?url=': 'https://api.forecast.io/forecast/' + config.7f43ecf485828c3fbdae18d1e559fb23 + '/';
  };


  ForecastIO.prototype.requestData = function requestData(latitude, longitude) {
    var requestUrl = this.url + latitude + ',' + longitude;
    var xhr = new XMLHttpRequest();
    var content = null;
    xhr.onreadystatechange = function() {
      if(xhr.readyState < 4) {
                return;
            }
            if(xhr.status !== 200) {
                return;
            }
            if(xhr.readyState === 4) {
            content = xhr.responseText;
            }
          else {
        console.log('there was a problem getting the weather data. Status: ' + xhr.status + ' State: ' + xhr.readyState);
        return false;
          }
    };
    xhr.open('GET', requestUrl, false);
    xhr.send();

    if(content !== '' && (content)) {
      return JSON.parse(content);
    } else {
      return false;
    }
  };

  ForecastIO.prototype.getForecastWeek = function getForecastWeek(latitude, longitude) {
    var data = this.requestData(latitude, longitude);
    if(data !== false) {
      var conditions = [];
      for(var i = 0; i < data.daily.data.length; i++) {
        var rawData = data.daily.data[i];
        conditions.push(new ForecastIOConditions(rawData));
      }
      return conditions;
    } else {
      return false;
    }
  };

$(function() {
  var handleWeatherResponse = function(data) {

    console.log(data);

    window.data = data;
    
   



    var markup = "<p>The weather report... " + "will be here when I finish my homework.</p>";
    // End of your code. No, really. Don't change anything below this, or above line 11.

    // Takes the contents of the "markup" variable (which should contain HTML) 
    // and write it out to the page.
    $('.weather-report').html(markup);
  }
  $('a.get-the-weather').on('click', function(event) {
    event.preventDefault();
    $.ajax({
      type: 'GET',
      url: 'https://api.forecast.io/forecast/6dbe98374cc5b8f9ea63d5ec73de9c04/42.056459,-87.675267?callback=?',
      dataType: 'jsonp',
      contentType: "application/json",
      success: handleWeatherResponse
    });
  });
});