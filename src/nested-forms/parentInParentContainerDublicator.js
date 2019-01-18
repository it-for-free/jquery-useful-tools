import $ from 'jquery';
import AlreadyInitIdsStorage from '../common/AlreadyInitIdsStorage.js';
import jswl from "js-wrapper-lib";

/**
 * По клику на элемент Дублирует родительский блок указаного уровня, 
 * в родительский контейнер указаного уровня
 * (в реализации использованы относительные селекторы).
 * Таким образом сам управляющий элемент тоже окажется продублированным.
 * 
 * По факту является обёрткой для $('').__relativeParentInParentContainerDublicatorForUnique(), которая проверяет, 
 * которая добавляет все выбранным элементам уникальный id (если такового нет),
 * а затем уже каждому из них по уникальному селектору назначает обработчика,
 * который будет отсчитывать родителей от конкретного уникального элемента.
 * 
 * 
 * {
 "thisSelector": '',            селектор элемента на который вещается плагин (управляющего, того,
 по которому пользователь будет длеать клик при дублировании блока)
 "containerParentLevel": 1,      уровень родительского контейнера 
 (в который добавляем)
 "parentLevel": 0,               уровень родителя (папа = 0) (копию 
 которого добавляем в родительский блок с уровнем containerParentLevel)   
 "replaceRegexp": /%plholder%/g, регулярное выражение для замены 
 в аттрибутах подстроки на порядокый номер данного элемента в родителе
 "afterCloneCallback": function($addedGroup) {}    НЕ ОБЯЗАТЕЛЕН: эта функция будет 
 вызвна для копируемого шаблона (вы можете провести дополнительные инициллизации)
 attributesToReplaceFromTemplate:   ['name', 'for', 'class'], // НЕОБЯЗАТЕЛЬНЫЙ ПАРАМЕТР Массив атрибутов 
 каждого клонированного элемента (внутри склонированного блока),
 в которых необходимо провести замену из шаблона, определяемого templateDataFieldAdditionalPart
 templateDataFieldAdditionalPart: '-template' // НЕОБЯЗАТЕЛЬНЫЙ ПАРАМЕТР прибавка к имени (для определения data-атрибута)
 например если замена проходит для атрибута for, 
 то шаблон будет искаться в атрибуте data-for-template
 
 copyValuesInsteadOtherPlaceholders      // НЕОБЯЗАТЕЛЬНЫЙ ПАРАМЕТР Делать ли замену плейсхолдеров, которые остались в шаблоне значения атрибута после подстановки вместо replaceRegexp (основная)
 checkNameFragmentIsPlaceholderCallback:: function(attrSubstr) {   // НЕОБЯЗАТЕЛЬНЫЙ ПАРАМЕТР колбек для определения того, что фрагмент атрибута является плейсхолдером 
 return jswl.checkForSubstring(attrSubstr, '%');
 },
 containerCallback : function($container) {}    // НЕОБЯЗАТЕЛЬНЫЙ ПАРАМЕТР колбек для вызова на контейнере 
 -- элементе уровня containerParentLevel, в который происходит дублирование, 
 может быть использован, например, для перенумерации потомков, после очередного добавления
 }
 * @param {object}   options          настройки.
 * @returns {window.$|jQuery|$|_$|@pro;window@pro;$|Window.$}
 */
$.fn.parentInParentContainerDublicator = function (options) {

    var $this = $(this);
    var settings = $.extend({
        "thisSelector": '',
        "containerParentLevel": 1,
        "parentLevel": 0,
        "replaceRegexp": /%fields_group_number_2%/g,
        afterCloneCallback: function ($addedGroup) {},
        attributesToReplaceFromTemplate: ['name', 'for', 'class'],
        templateDataFieldAdditionalPart: '-template',
        copyValuesInsteadOtherPlaceholders: false,
        checkNameFragmentIsPlaceholderCallback: function (attrSubstr) {
            return jswl.checkForSubstring(attrSubstr, '%');
        },
        containerCallback: function ($container) {}
    }, options);



    $(this).uniqueId();
    var elementId = '';
    return this.each(function () {
        elementId = $(this).attr('id');

        if (!AlreadyInitIdsStorage.checkAndAddIfNeed(elementId,
                'parentInParentContainerDublicator')) {

            $('#' + elementId).__relativeParentInParentContainerDublicatorForUnique(
                    settings);
        }
    });
}
