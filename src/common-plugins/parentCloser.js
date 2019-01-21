/**
 * Удаление/сокрытие родительских элементов
 */
import $ from 'jquery';
import AlreadyInitIdsStorage from '../common/AlreadyInitIdsStorage.js';
import   './juts-common-jquery-plugins.js';

/**
 * Плавно скрываем и удаляем родительский элемент при клике по данному/
 * Является обёрткой для __deleteParentByLevelForUnique()
 * 
 * @param {options} options  настройки:
 * 
 * parentLevel:     0,          уровень родителя относительно элеента, на который вещается плагин
 parentContainerLevel:   1,   // НЕОБЯЗАТЕЛЬНЫЙ ПАРАМЕТР уровень котейнера родителя (используются в частности для перенумерации элементов после удаления)
 containerCallback : function($container) {}    // НЕОБЯЗАТЕЛЬНЫЙ ПАРАМЕТР колбек для вызова на контейнере 
 -- элементе уровня parentContainerLevel, в который происходит дублирование, 
 может быть использован, например, для перенумерации потомков, после очередного добавления
 
 * @returns {block-dublicatorL#10.$.fn@call;each|Boolean}
 */
$.fn.parentCloser = function (options) {

    var settings = $.extend({
        parentLevel: 0,
        parentContainerLevel: 1,
        containerCallback: function ($container) {}
    }, options);


    var elementId = '';
    $(this).uniqueId();
    return this.each(function () {
        elementId = $(this).attr('id');

        if (!AlreadyInitIdsStorage.checkAndAddIfNeed(elementId, 'parentCloser')) {
            $('#' + elementId).__deleteParentByLevelForUnique(settings);
        }
    });
}



/**
 * @see НЕ вызывать напрямую!
 * Палавно скрываем и удаляем родительский элемент при клике по данному
 * 
 * @param {options} options  настройки:
 * 
 * parentLevel:     0,          уровень родителя относительно элеента, на который вещается плагин
 parentContainerLevel:   1,   // НЕОБЯЗАТЕЛЬНЫЙ ПАРАМЕТР уровень котейнера родителя (используются в частности для перенумерации элементов после удаления)
 containerCallback : function($container) {}    // НЕОБЯЗАТЕЛЬНЫЙ ПАРАМЕТР колбек для вызова на контейнере 
 -- элементе уровня parentContainerLevel, в который происходит дублирование, 
 может быть использован, например, для перенумерации потомков, после очередного добавления
 * @returns {undefined}
 */
$.fn.__deleteParentByLevelForUnique = function (options) {

    var settings = $.extend({
        parentLevel: 0,
        parentContainerLevel: 1,
        containerCallback: function ($container) {}
    }, options);

    var $controlElement = $(this);
    this.click(onClick);

    function onClick() {

        var $controlElement = $(this);
        var $parent = $controlElement.nthParent(settings.parentLevel);
        var $container = $controlElement.nthParent(settings.parentContainerLevel);

        $parent.removeSmoothly({
            afterRemoveFinishedCallback: settings.containerCallback,
            afterRemoveFinishedParams: $container
        });

        return false;
    }
}