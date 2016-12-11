(function ($) {

    $(function () {
        prepareSkills();
        // animateSkills();
    });

    function prepareSkills() {
        function chooseColor(percent) {
            if (percent < 25) {
                return '#A63D40';
            } else if (percent < 50) {
                return '#E9B872';
            } else if (percent < 75) {
                return '#00a8ff';
            } else if (percent <= 100) {
                return '#88cd2a';
            } else {
                throw 'in chooseColor - wrong percent: ' + percent;
            }
        }

        jQuery('.skillbar').each(function () {
            var $this = jQuery(this);
            var currentProcent = $this.attr('data-percent');
            $this
                .find('.skillbar-bar, .skillbar-title')
                .css('background', chooseColor(currentProcent));

            $this
                .find('.skillbar-bar')
                .css('width', currentProcent + '%');

            $this
                .find('.skill-bar-percent')
                .html(currentProcent + '%');

        });
    }

    // function animateSkills() {
    //     jQuery('.skillbar').each(function () {
    //         jQuery(this).find('.skillbar-bar').animate({
    //             width: jQuery(this).attr('data-percent') + '%'
    //         }, 2000);
    //     });
    // }


})(jQuery);
