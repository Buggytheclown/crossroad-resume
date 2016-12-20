(function ($) {
    // USE FEATHERBOX

    $(function () {
        prepareSkills();
        // animateSkills();
        addHeaderLinkEvents();
        addSectionChangelisteners();
        watchForHeader();
        $(document).ready(function () {
            $(".fancybox").fancybox();
        });

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

    function toggleHeaderTo(exept) {
        $('.b-navigation__item').each(function () {
            $(this).attr('data-active', 'false');
        });
        exept.attr('data-active', 'true');
    }

    function addHeaderLinkEvents() {
        var HIDE_MOBILE_MENU_CLS = 'b-navigation--hidemobile';

        listenForToggleMenu();
        clickOutside();
        listenForElementClick();

        function clickOutside() {
            $(document).click(function (e) {
                var target = e.target;
                if ($(target).parents('.b-navigation-mobile').length === 0 && !$(target).is('.b-navigation')) {
                    $('.b-navigation').addClass(HIDE_MOBILE_MENU_CLS);
                }
            });
        }

        function listenForToggleMenu() {
            $('.b-navigation-mobile__menu-button').on('click', function () {
                $('.b-navigation').toggleClass(HIDE_MOBILE_MENU_CLS)
            });
        }

        function listenForElementClick() {
            $('.b-navigation__item').on('click', function (e) {
                e.preventDefault();
                $('.b-navigation').addClass(HIDE_MOBILE_MENU_CLS);
                var targetEl = $(this).attr('data-scrollto');

                $('html, body').animate({
                    scrollTop: $(targetEl).offset().top - 70
                }, 1000);
            })
        }
    }

    function addSectionChangelisteners() {
        function getViewporHeight() {
            return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        }

        function getElementsWithPositions() {
            return $('.b-navigation__item').map(function (_, el) {
                var target = $(el).attr('data-scrollto');
                return {element: $(el), position: $(target).offset().top};
            });
        }

        function getSectionInView() {
            var elementInView;
            var elementsWithPositions = getElementsWithPositions();
            for (var i = elementsWithPositions.length - 1; i >= 0; i--) {
                var comparedElement = elementsWithPositions[i];
                if (comparedElement.position <= $(this).scrollTop() + getViewporHeight() / 2) {
                    elementInView = comparedElement;
                    break;
                }
            }
            return elementInView.element;
        }

        $(window).on('scroll', function () {
            toggleHeaderTo(getSectionInView());
        })
    }

    function watchForHeader() {
        var target = $('nav.b-header');
        var targetIsEmbedded = true;
        $(window).on('scroll', function () {
            var scrollTop = $(this).scrollTop();
            if (scrollTop > 0 && targetIsEmbedded) {
                targetIsEmbedded = false;
                target.removeClass('b-header--embedded').addClass('b-header--static');
            } else if (scrollTop === 0 && !targetIsEmbedded) {
                targetIsEmbedded = true;
                target.removeClass('b-header--static').addClass('b-header--embedded');
            }

        })
    }

})(jQuery);
