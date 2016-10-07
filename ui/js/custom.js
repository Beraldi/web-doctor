var commandsList = ["walk", "start", "up", "forward", "down", "back", "left", "right", "stop"];

if (annyang) {

    var goTo = function(direction) {
        console.log("direction", direction);
        switch (direction) {
            case 'walk':
            case 'start':
            case 'up':
            case 'forward':
                $.get("/webdoctor/goto/w");
                break;

            case 'down':
            case 'back':
                $.get("/webdoctor/goto/s");
                break;

            case 'left':
                $.get("/webdoctor/goto/a");
                break;

            case 'right':
                $.get("/webdoctor/goto/d");
                break;

            case 'stop':
                $.get("/webdoctor/stop");
                break;
        }
    }

    // Let's define our first command. First the text we expect, and then the function it should call
    var commands = {
        '*direction': goTo,
        'please *direction': goTo,
        'go to *direction': goTo
    };

    // Add our commands to annyang
    annyang.addCommands(commands);

    annyang.addCallback('resultMatch', function(userSaid, commandText, phrases) {

        var stopSearch = true;

        console.log("userSaid", userSaid); // sample output: 'hello'
        console.log("commandText", commandText); // sample output: 'hello (there)'
        console.log("phrases",phrases); // sample output: ['hello', 'halo', 'yellow', 'polo', 'hello kitty']

        $.each(phrases, function(phrasesIndex, phrasesValue){
            console.log("phrasesIndex, phrasesValue", phrasesIndex, phrasesValue);
            $.each(commandsList, function(commandsListIndex, commandsListValue){

                console.log("commandsListIndex, commandsListValue", commandsListIndex, commandsListValue);

                if(phrasesValue.indexOf(commandsListValue) != -1){
                    goTo(commandsListValue);
                    stopSearch = false;
                    return stopSearch;
                }
            });
            return stopSearch;
        });

    });

    annyang.debug();

    annyang.start();
}

// Closes the sidebar menu
$("#menu-close").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});

// Opens the sidebar menu
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});

// Scrolls to the selected menu item on the page
$(function() {
    $('a[href*=#]:not([href=#],[data-toggle],[data-target],[data-slide])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ?
                target :
                $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});

//#to-top button appears after scrolling
var fixed = false;
$(document).scroll(function() {
    if ($(this).scrollTop() > 250) {
        if (!fixed) {
            fixed = true;
            // $('#to-top').css({position:'fixed', display:'block'});
            $('#to-top').show("slow", function() {
                $('#to-top').css({
                    position: 'fixed',
                    display: 'block'
                });
            });
        }
    } else {
        if (fixed) {
            fixed = false;
            $('#to-top').hide("slow", function() {
                $('#to-top').css({
                    display: 'none'
                });
            });
        }
    }
});

// Disable Google Maps scrolling See http://stackoverflow.com/a/25904582/1607849 Disable scroll zooming and bind back the click event
var onMapMouseleaveHandler = function(event) {
    var that = $(this);
    that.on('click', onMapClickHandler);
    that.off('mouseleave', onMapMouseleaveHandler);
    that.find('iframe').css("pointer-events", "none");
}

var onMapClickHandler = function(event) {
    var that = $(this);
    // Disable the click handler until the user leaves the map area
    that.off('click', onMapClickHandler);
    // Enable scrolling zoom
    that.find('iframe').css("pointer-events", "auto");
    // Handle the mouse leave event
    that.on('mouseleave', onMapMouseleaveHandler);
}

// Enable map zooming with mouse scroll when the user clicks the map
$('.map').on('click', onMapClickHandler);
