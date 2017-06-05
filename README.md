# Cadaver Theme

Cadaver is a simplified Shopify theme, to be used as a "blank slate" starting point for theme developers.  When I say 'basic' I really mean it.  Bootstrap and Font Awesome are included to get you going quickly but neither are required.  Comment out all the things you don't need and save yourself the bloat.

My intention when starting this project was to create something with more features than [Skeleton](http://shopify.github.io/skeleton-theme/) but less overhead than [Timber](https://shopify.github.io/Timber/) or [Slate](https://github.com/Shopify/slate).  I also wanted something that I could clone and start developing immediately without having to tear out old code or feel constrained my pre-existing CSS. Out of the box this theme doesn't look like much, but the boilerplate code and defaults mean you should be able to make this look halfway decent with a few days of work.

__Features:__
- Minimal theme settings.
- Minimal JS framework for utilizing Shopify sections.
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
├── sections
│   ├── shopify sections
├── snippets
│   └── optional custom code snippets
├── templates
│   ├── 404.liquid
│   ├── article.liquid
│   ├── blog.liquid
│   ├── cart.liquid
│   ├── collection.liquid
│   ├── index.liquid
│   ├── list-collections.liquid
│   ├── page.liquid
│   ├── product.liquid
│   └── search.liquid
```

### Getting Started

Install project dependencies and run default gulp task to start developing.  This will add the necessary npm modules, start watching files in the ```/_scss``` directory, and recompile them when they change.
```
npm install
.
.
gulp
```

If using Shopify Theme Kit for development, follow the [setup instructions](https://shopify.github.io/themekit/) and then run ```theme watch``` to start pushing the theme to your store.

### Development

Javascript work is done in the ``_js`` directory.  The gulp scripts task minifies and checks files for errors before exporting them to the assets directory.  We are using jshint for error checking, [see the docs](http://jshint.com/docs/) for more info on how to use it.

Scss work is done in the ``_scss`` directory.  Right now there is a single entry point for the stylesheet called ``app.scss.liquid``. The gulp styles task inlines all ``@import`` directives and exports a single scss file to the assets directory.  Due to the way Shopify compiles scss, we have to use a css inliner for imported files which means we have to use the native css ``@import`` syntax _not_ the scss one.

```scss
// Do this
@import url("theme/_pages.scss");

// Not this
@import "theme/pages"
```

### Theme Features

There are a few things about the theme to be aware of in order to get the most out of it.

##### Favicons

To add favicons, see the snippet ``favicon.liquid``.  There are 4 icon sizes that need to be generated and added to the assets folder.  See [realfavicongenerator.net](http://realfavicongenerator.net) to create these.

##### Font Icons

The site currently uses the Font Awesome font icon library.  To keep the CSS file as lightweight as possible, comment out unused icon rules in ``_scss/font-awesome/_icons.scss``.

##### Open Graph Images

All open graph tags are contained in the snippet ``open-graph-tags.liquid``.  OG images are generated from the store logo, product page images or blog images.  To add default share images, generate them following the [best practice guidelines](https://developers.facebook.com/docs/sharing/best-practices#images) and either hard code them in the snippet, or create theme settings for them.

##### Sections

This theme comes with 3 sections - header, footer and featured collection to be used on the home page.

### TODO

- Clean up and fix collection grid and product grid item.