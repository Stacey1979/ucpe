# UCPE theme

A base theme for a Drupal 8 site using Bootstrap, Webpack, and JS ES6.

## Requirements

To build this site's theme you must have:

1. Node version 11+. `node -v`
2. The ability to run `npm` commands (probably using the console).

## Setup and use

A lot of the look of the site can be configured at
`/admin/appearance/settings/ucpe_theme`, but if you need to update the sass,
you can follow the instructions below:

From within this directory (`web/themes/custom/ucpe_theme`):

- Run `npm install` to install dependencies.
- Run `npm run build` to run the production build.
- Run `npm run build:dev` to run the development build. Do not commit changes
  from development mode!
- Run `npm run start` to watch for changes and build.
- Run `npm run start:dev` to watch for changes and build in development mode.
  In this mode, your local site should automatically refresh when files change.
  **Note: Do not commit changes from development mode! Commit changes from
  `npm run build` instead.**
- Run `npm run prettier` to fix styling errors in js/scss files. This is run
  automatically if you commit files while inside the theme directory.

## Javascript compilation

Javascript is transpiled from ES6 ES5 using Babel, and then minified and
tree-shook by Webpack.

For more information on ES6, see https://dev.to/srebalaji/es6-for-beginners-with-example-c7

You can add additional javascript changes to your `web/themes/custom/ucpe_theme/js/main.js` file following this pattern:

1. Create a new javascript file in your `web/themes/custom/ucpe_theme/js/components` folder with the following boilerplate code:

```

export default function (context) {
  // Alias global jQuery object.
  const $ = jQuery;

  if (context == document) {
  // Put your custom code here.
  }
}

```

If you don't need to use jQuery, you can take out this line:
`const $ = jQuery;`

If this code should only run once, when the entire page first loads, leave in the `if (context == document) {` line (and closing `}` line). However, if this javascript should apply to items that get refreshed with ajax (like if you page through a view that uses ajax, for example), that line can cause your elements to load without the attached javascript after page load. Usually you'll want these lines, but that's a good reason to leave them out.

2. Name the file you created with snake_case, like "my_example_js".

3. In the `web/themes/custom/ucpe_theme/js/main.js` file, add a line importing your new javascript file. It's nice to use lowerCamelCase for the import name:

```
import myExampleJs from "./components/my_example_js.js";
```

4. Inside the `web/themes/custom/ucpe_theme/js/main.js` file, between these two lines:

```
(($, Drupal) => {
...
})(jQuery, Drupal);
```

add an attach declaration that connects your imported code:

```
(($, Drupal) => {

...
    Drupal.behaviors.myExampleJs = {
      attach: myExampleJs
    };
...
})(jQuery, Drupal);
```

There should already be at least one of these in this file.
