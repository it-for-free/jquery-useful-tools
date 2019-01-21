/**
 * Плагиныд для JqueryUi (с опорой на функционал jqueryui)
 */

import $ from 'jquery';
import jswl from "js-wrapper-lib";
import   './juts-common-jquery-plugins.js';

/**
 * Прокрутит страницу к данному блоку
 * .scrollParent() -- метод из JQuery UI,
 * который позволяет опрделить ближайший
 * родительский блок, в котором есть прокрутка
 * 
 * @param {string} scrollableElementSelector  строка селектора (можно пустую, 
 *  n но тогда будет произведен выбор какого-то старшего родителя 
 *  (в зависиости от браузера html или body)
 *    Если вместо селектора передать сторку "&get-scroll-parent",
 *  будет произведена попытка использовать .scrollParent() -- метод из JQuery UI,
 *  
 *  
 * @returns {undefined}
 */
$.fn.scrollToMe = function(scrollableElementSelector) {
    var $this = $(this); 
    var $scrollableParent = 'none';

    if (jswl.isEmpty(scrollableElementSelector)) {
        $scrollableParent = $.browser.mozilla ? $('html') : $('body');
        // $scrollableParent = $this.scrollParent();
    } else if (scrollableElementSelector === '&get-scroll-parent&') {
        $scrollableParent = $this.scrollParent();
    } else {

        $scrollableParent = $(scrollableElementSelector);
    }

    $scrollableParent.scrollMeTo($this);
}

/**
 * Удалит uniqueId
 * и заново вызовет функцию uniqueId()
 * Использует функциона jqueryUI 
 * 
 * @param {type} n
 * @returns {type.fn.renewUniqueId.$p}
 */
$.fn.renewUniqueId = function(){
    var $this = $(this);
    $this.removeUniqueId().uniqueId();
    return $this;

};