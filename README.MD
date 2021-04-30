Custom JavaScript And CSS/LESS Containers
=====
[![Scrutinizer](https://scrutinizer-ci.com/g/dneustadt/DneCustomJsCss/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/dneustadt/DneCustomJsCss/?branch=master)
[![Travis CI](https://travis-ci.org/dneustadt/DneCustomJsCss.svg?branch=master)](https://travis-ci.org/dneustadt/DneCustomJsCss)

This plugin for [Shopware](https://www.shopware.de) features a backend container manager to easily add custom
JavaScript and/or CSS/LESS to the theme compilation.

![DneCustomJsCss](https://github.com/dneustadt/DneCustomJsCss/blob/master/preview.png)

The plugin offers the following features:

* Create unlimited containers of JavaScript and/or CSS/LESS
* Each container can be limited to any number of shops/subshops
* LESS variables and mixins are inherited from themes and plugins and can be accessed
* JS/CSS is injected into theme compilation. This means no dependency conflicts or additional resource requests.
* Languages: English, German

Requirements
-----
1.1.1
* Shopware >= 5.7

1.1.0
* Shopware >= 5.6

1.0.0
* Shopware >= 5.2.27 _see releases_

Installation
====
Clone this repository into a folder called **DneCustomJsCss** within the **custom/plugins** directory of the Shopware installation.

* Install the plugin through the Plugin-Manager within the Shopware backend.

## Install with composer
* Change to your root Installation of shopware
* Run command `composer require dneustadt/dne-custom-js-css`
* Install and activate plugin with the Plugin Manager 

Usage
=====
The module will be accessible in backend by a new menu entry called _Custom JavaScript/CSS_ under the _Configuration_ menu tab.
