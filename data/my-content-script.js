/**
 * Created by SMT on 05.09.2015.
 */
var temperature_html = currency_html = "";
function parse_and_show_object(data, type) {
    $.each(data, function (index, value) {
        if (typeof(value) == "object") {
            parse_and_show_object(value, type);
        } else {
            switch (type) {
                case 'temp':
                {
                    if (index == "icon" || index == "description" || index == "temp") {

                        switch (index)
                        {
                            case 'icon':
                                value = "<img src='http://openweathermap.org/img/w/" + value + ".png'>";
                                break;
                            case 'temp':
                                value = Math.round(value) + '&deg;';
                                break;
                        }

                        temperature_html = temperature_html + "<div class='temp_" + index + "'>" +  value + "</div>";
                    }
                    break;
                }
                case 'curr':
                {
                    if (index == "Name" || index == "Rate") {

                        switch (index)
                        {
                            case 'Rate':
                                value = Math.round(value);
                                break;
                        }
                        currency_html = currency_html + "<div class='cur_" + index + "'>" +  value + "</div>";
                    }
                    break;
                }
            }
        }
    });
}

function load() {
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=Minsk,by&units=metric&lang=ru", function (data) {
        parse_and_show_object(data, 'temp');
        $("#res").html(temperature_html);
        temperature_html = "";
        //console.log("weather updated");
    });
    $.getJSON("https://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.xchange+where+pair+=+%22USDBYR,EURBYR%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=", function (data) {
        parse_and_show_object(data, 'curr');
        $("#currencies").html(currency_html);
        currency_html = "";
        //console.log("currencies updated");
    });

}
load();
setInterval(load, 600000);