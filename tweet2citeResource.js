function loadFile(url, fn) {
        var done = false;
        var script = document.createElement("script");
        script.src = url;
        script.onload = script.onreadystatechange = function () {
            if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {

                done = true;

                fn();
            }
        };
        document.getElementsByTagName("body")[0].appendChild(script);
}


window.tweet2cite = (function () {
    // the minimum version of jQuery we want
    var v = "1.9";
    var tweet = {};
    // check prior inclusion and version
    if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
        url = "http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js";
        loadFile(url, citeThatContent);

    } else {
        citeThatContent();
    } 


    function citeThatContent() {
        var url = "http://tweet2cite.dev/jquery.modal.js";
        loadFile(url, citeThatContentLoaded)
    }

    function citeThatContentLoaded() {


        (window.citeThatContent = function () {

            //Create new target divs and hide them 
            //This can be DRYed up...
            
            var newDiv = document.createElement("div"); 
            var newerDiv = document.createElement("div"); 
            $(document.body.appendChild(newDiv)).attr("id", "citation-container").hide();
            $(document.body.appendChild(newerDiv)).attr({
                id: "display-citation-container",
                class: "modalCitationContent"
            }).hide();

            var citationDiv = document.getElementById("citation-container");


            //Clone Tweet content and place in hidden div

            $("div.tweet.permalink-tweet").clone().appendTo("div#citation-container");

            //Grab content from DOM elements

            var nameArr = $("div#citation-container strong.fullname:first").text(function (i, text) {
                            return text.replace("Verified account", "");
                            }).text().split(" ");

            var firstName = nameArr[0];

            var lastName = nameArr[-1];
            
            if (lastName === undefined) {
                lastName = "";
            } else {
                lastName = nameArr[-1] + ", ";
            };

            var fullName = nameArr.join(" ");

            var nameOptionsArr = [fullName, firstName, lastName, ];
            
            var mlaName = 0
            
            if (nameArr.length > 0) {
                mlaName = nameOptionsArr[0];
            } else {

            };

            var dateArr = $("div#citation-container div.client-and-actions .metadata span:first").text().trim().split(" ");
            
            var time = dateArr[0];
            
            var amPm = (dateArr[1]).toLowerCase().split("").join(".");
            
            var day = dateArr[3];
            
            var monthAbbr = dateArr[4];
            
            var monthArr = {
                "Jan": "January",
                "Feb": "February",
                "Mar": "March",
                "Apr": "April",
                "May": "May",
                "Jun": "June",
                "Jul": "July",
                "Aug": "August",
                "Sep": "September",
                "Oct": "October",
                "Nov": "November",
                "Dec": "December"
            };
            var month = monthArr[monthAbbr];
           
            var year = dateArr[5];
            
            $("div#citation-container .tweet-text:first a").each(function (k, v) {
                if($(this).text().match(/^https?:\/\//)) {
                    var v = $(v);
                    v.text(v.attr("href"));
                } else {
                    var v = $(v);
                    v.text(v.text());       
                }
            });
            
            var contentBody = $('div#citation-container .tweet-text:first').text().trim();
           
            var authorUserName = $("div#citation-container span.username:first b").text().trim();
        
            var apaDate = ("20" + year + ", " + month + " " + day);
            
            var mlaDate = (day + " " + month + " " + "20" + year + ", " + time + " " + amPm + ".");
            
            var url = $(location).attr("href"); //			
            
            tweet.mlaCitation = (lastName + firstName + ' ' + '(' + authorUserName + '). "' + contentBody + '" ' + mlaDate + ' Tweet.');
            
            tweet.apaCitation = (authorUserName + '. (' + apaDate + '). ' + contentBody + ' [Twitter Post]. Retrieved from ' + url);


            var tweetModalString = ("<style>@import url(https://fonts.googleapis.com/css?family=Droid+Serif);\
                #display-citation-container{font-family: font-family: 'Droid Serif','Georgia',serif;}#display-citation-container\
                h1{font-family: 'Lucida Grande','Lucida Sans','Tahoma',sans-serif;font-size: 3em;text-align: center;color: #444444;\
                margin-bottom: 15px;}#display-citation-container h2{font-family: 'Lucida Grande','Lucida Sans','Tahoma',sans-serif;\
                font-size: 1.6em;color: #444444;margin-bottom: 15px;margin-top: 15px;clear: both;}#display-citation-container span{width: 80%;\
                float: left;margin-bottom: 15px;margin-left: 20pxcolor: #222222;}#display-citation-container button.copy{cursor: pointer;\
                text-decoration:none;padding: 10px 15px 10px 15px;color: rgb(255, 255, 255);border-radius:8px 8px 8px 8px;\
                -moz-border-radius:8px 8px 8px 8px;-webkit-border-radius:8px 8px 8px 8px;background-color: rgb(158, 158, 158);\
                font: 16px helvetica;margin-left: 20px;}#display-citation-container button:hover{cursor: pointer;\
                text-decoration:none;padding: 10px 15px 10px 15px;color:rgb(255, 255, 255);border-radius:8px 8px 8px 8px;\
                -moz-border-radius:8px 8px 8px 8px;-webkit-border-radius:8px 8px 8px 8px;background-color: rgb(191, 191, 191);\
                font: 16px helvetica;}#display-citation-container button:active{cursor: pointer;text-decoration:none;\
                padding: 10px 15px 10px 15px;color:rgb(255, 255, 255);border-radius:8px 8px 8px 8px;-moz-border-radius:8px 8px 8px 8px;\
                -webkit-border-radius:8px 8px 8px 8px;background-color: rgb(191, 191, 191);font: 16px helvetica;}\
                .modalCitationContent{display: none;width: 60%;background: #ebf4f7;padding: 15px 30px;-webkit-border-radius: 8px;\
                -moz-border-radius: 8px;-o-border-radius: 8px;-ms-border-radius: 8px;border-radius: 8px;\
                -webkit-box-shadow: 0 0 10px #000;-moz-box-shadow: 0 0 10px #000;-o-box-shadow: 0 0 10px #000;\
                -ms-box-shadow: 0 0 10px #000;box-shadow: 0 0 10px #000;}.modalCitationContent a.close-modal{position: absolute;\
                top: -12.5px;right: -12.5px;display: block;width: 30px;height: 30px;text-indent: -9999px;\
                background: url(close.png) no-repeat 0 0;}</style><h1 id='tweet2cite-title'>Tweet2Cite</h1><h2>MLA:</h2>\
                <span id='mla-citation-content' class='tweet-citation-content'>"+tweet.mlaCitation+"</span><h2>APA:</h2>\
                <span id='apa-citation-content' class='tweet-citation-content'>"+tweet.apaCitation+"</span>");

            $("div#display-citation-container").append(tweetModalString);

            $("div#display-citation-container").modal()

        })();
    }

    return tweet;


})();