/**
 * @file
 * TS resizing behavior.
 *
 * Nav is transparent on homepage and needs to solidify in color upon scroll.
 */

export default function (context) {
  // // Alias global jQuery object.
  const $ = jQuery;

  function resizeScreen() {
    var viewport = $(window).width();
    const medium = 700; // TODO: where should this actually happen?

    if( viewport < medium) {
      $('.form-radios.dropdown .navbar-nav').addClass('dropdown-menu');
    }
    else {
      $('.form-radios.dropdown .navbar-nav.dropdown-menu').removeClass('dropdown-menu');
    }
  }

  // Execute code each time window size changes
  $(window).resize(Drupal.debounce(resizeScreen, 100));
  // Also execute on load.
  resizeScreen();
}
