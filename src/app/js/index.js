(function ($) {

    $(function () {
        prepareSkills();
        // animateSkills();
        addHeaderLinkEvents();
        // addSectionChangelisteners();

    });

    function prepareSkills() {
        function chooseColor(percent) {
            if (percent < 25) {
                return '#A63D40';
            } else if (percent < 50) {
                return '#FDE74C';
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
            var currentProcent = $this.data('percent');
            $this
                .find('.skillbar__bar, .skillbar__title')
                .css('background', chooseColor(currentProcent));

            $this
                .find('.skillbar__bar')
                .css('width', currentProcent + '%');

            $this
                .find('.skillbar__percent')
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

    function uncheckAllHeaderLink() {
        $('.b-navigation__item').each(function () {
            $(this).attr('data-active', 'false');
        })
    }

    function addHeaderLinkEvents() {
        $('.b-navigation__item').on('click', function (e) {
            e.preventDefault();
            var $this = $(this);
            uncheckAllHeaderLink();
            $this.attr('data-active', 'true');
            var targetEl = $this.attr('data-scrollto');

            $('html, body').animate({
                scrollTop: $(targetEl).offset().top - 66
            }, 1000);
        })
    }

    // function addSectionChangelisteners() {
    //     function getElementsWithPositions() {
    //         return $('.b-navigation__item').map(function (_, el) {
    //             var target = $(el).attr('data-scrollto');
    //             return {element: $(target), position: $(target).offset().top};
    //         });
    //     }
    //
    //     var elementsWithPositions = getElementsWithPositions().sort(function (a, b) {
    //         return b.position - a.position
    //     });
    //     var viewporHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    //
    //     console.info(elementsWithPositions);
    //     $(window).on('scroll', function () {
    //
    //
    //         $(this).scrollTop()
    //
    //     })
    // }

})(jQuery);
