# Cadaver Theme

The Cadaver theme is a simplified Shopify theme, to be used as a "blank slate" starting point for theme designers.  When I say 'basic' I really mean it.  All of Bootstrap is included if you want to use it, but it's main utility is baseline styling and boring stuff like forms and tables.  Comment out all the things you don't need and save yourself the bloat.

__Features:__
- Almost no theme settings.
- Commented code to teach you Liquid concepts in practice.
- Gulp task to inline scss files allowing theme stylesheets to be broken up since Shopify doesn't support scss importing.
- Bootstrap is included to take advantage of the grid.  File imports have been modified to work with gulp-cssimport (native SCSS import syntax not supported)
- Supports the official [Shopify Theme Gem](https://github.com/Shopify/shopify_theme) for easy development

### Project Structure
```
├── _js
│   └── Working javascript files.  Compiles and minfies with gulp and exports to assets directory
├── _scss
│   └── Working scss files.  Compiles with gulp and exports to assets directory
├── assets
│   └── Javascript, CSS, and theme images
├── config
│   └── custom Theme Settings
├── layout
│   ├── theme.liquid
│   └── optional alternate layouts
├── snippets
│   └── optional custom code snippets
├── templates
│   ├── 404.liquid
│   ├── article.liquid
│   ├── blog.liquid
│   ├── cart.liquid
│   ├── collection.liquid
│   ├── index.liquid
│   ├── page.liquid
│   ├── product.liquid
│   └── search.liquid
│   └── list-collections.liquid
```

### Getting Started

Install project dependencies and run default gulp task to start developing.  This will add the necessary npm modules, start watching files in the ```/_scss``` directory, and recompile them when they change.
```
npm install
.
.
gulp
```

If using the Shopify Theme Gem for development, follow the [setup instructions](https://github.com/Shopify/shopify_theme) and then run ```theme watch``` to start pushing the theme to your store.

### Development

Javascript work is done in the ``_js`` directory.  The gulp scripts task minifies and checks files for errors before exporting them to the assets directory.  We are using jshint for error checking, [see the docs](http://jshint.com/docs/) for more info on how to use it.

Scss work is done in the ``_scss`` directory.  Right now there is a single entry point for the stylesheet called ``app.scss.liquid``. The gulp styles task inlines all ``@import`` directives and exports a single scss file to the assets directory.  Due to the way Shopify compiles scss, we have to use a css inliner for imported files which means we have to use the native css ``@import`` syntax _not_ the scss one.

```scss
// Do this
@import url("theme/_pages.scss");

// Not this
@import "theme/pages"
```