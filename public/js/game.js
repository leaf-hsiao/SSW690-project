$('.duck').on('click', function (ev) {
    // pew pew
    $(ev.target).removeClass('active');
});

var pop_up = function (interval) {
    console.log(interval);

    // pick a duck
    var sels = $('.duck:not(.active)');

    // handle resetting if we don't have a duck
    if (sels.length == 0) {
        $('.field').css('animationName', 'reset');
        // reset the animation when we're done with it so we can do it again
        setTimeout(_ => $('.field').css('animationName', ''), 1000);

        // put the ducks away
        $('.duck').removeClass('active');

        // reset!
        setTimeout(_ => pop_up(1000), 2000);
        return;
    }

    // vroom
    $('.progress').css('width', interval / 10 + '%');

    // interval
    $(sels[Math.floor(Math.random() * sels.length)]).addClass('active');
    interval = interval > 10 ? interval - 10 : interval;

    setTimeout(function () {
        pop_up(interval);
    }.bind(this), interval);
};

// aaand go!
pop_up(1000);


/*--------*/

var animateButton = function (e) {

    e.preventDefault;
    //reset animation
    e.target.classList.remove('animate');

    e.target.classList.add('animate');
    setTimeout(function () {
        e.target.classList.remove('animate');
    }, 300);
};

var bubblyButtons = document.getElementsByClassName("bubbly-button");

for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener('click', animateButton, false);
}