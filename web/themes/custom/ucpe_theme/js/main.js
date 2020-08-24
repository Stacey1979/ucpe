/**
 * @file
 * Main theme behaviors.
 */

// You can import a default behavior to distinguish blocks of code from each
// other.
import resizeDropdown from "./components/resize_dropdown.js";

(($, Drupal) => {
  /**
   * This calls the tsCardLink behavior into the main.js global file.
   */
  Drupal.behaviors.exampleJS = {
    attach: resizeDropdown
  };

})(jQuery, Drupal);
