import $ from 'jquery';

/**
 * Определит тип тега (полезно, в частности для инпутов)
 * 
 * @link https://stackoverflow.com/a/9116746
 * 
 * ((jquery check than all from elements are empty, in default state))
 * 
 * @return {String}
 */
$.fn.getInputType = function () {

    return (this[0].tagName == "INPUT" ? 
        this[0].type.toLowerCase() : 
        this[0].tagName.toLowerCase());
}
