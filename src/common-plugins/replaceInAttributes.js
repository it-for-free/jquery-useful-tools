/**
 * Замены в атрибутах
 */
import $ from 'jquery';
import jswl from "js-wrapper-lib";

/**
 * Проведёт замены значений атрибутов ВСЕХ ПОТОМКОВ данного элемента,
 * на значение сформированное из значения
 * специального поля-шаблона, в котором предварительно 
 * по регулярному выражению заменяется подстрока
 * 
 * @param {type} options -- массив вида (значения по умолчанию):
 *      {
 searchRegexp:     /%fileds_group_number_lavel2%/g,  // Регулярное выражения для подстроки которую надо заменить
 newValue:         '888',                            // Новая подстрока
 attributeNames:   ['name', 'for'],                  // Массив атрибутов, в которых необходимо провести замену
 templateDataFieldAdditionalPart: '-template'  // -- прибавка к имени (для определения data-атрибута)
 // например если замена проходит для атрибута for, 
 // то шаблон будет искаться в атрибуте data-for-template
 copyValuesInsteadOtherPlaceholders            // НЕОБЯЗАТЕЛЬНЫЙ ПАРАМЕТР Делать ли замену плейсхолдеров, которые остались в шаблоне после подстановки вместо searchRegexp (основная)
 checkNameFragmentIsPlaceholderCallback        // НЕОБЯЗАТЕЛЬНЫЙ ПАРАМЕТР колбек для определения того, что фрагмент атрибута является плейсхолдером 
 }
 * @returns {type.fn.replaceInChildrenAttrsUsingTemplateNameDataAttr.$parent}
 */
$.fn.replaceInChildrenAttrsUsingTemplatesFromDataFileds = function (options) {

    var $parent = $(this);

    var settings = $.extend({
        searchRegexp: /%fileds_group_number_lavel2%/g,
        newValue: '888',
        attributeNames: ['name', 'for'],
        templateDataFieldAdditionalPart: '-template',
        copyValuesInsteadOtherPlaceholders: false,
        checkNameFragmentIsPlaceholderCallback: function (substr) {
            return false;
        }

    }, options);

    $parent.find('*').each(function ()
    {
        var $current = $(this);
        $current.replaceInAttrsUsingTemplatesFromDataFileds(settings);
    })

    return $parent;
}



/**
 * Проведёт замены значений атрибутов данного элемента,
 * на значения сформированные из значений
 * специальных полей-шаблонов 
 * (для каждого искомого атрибута такой data-атрибут-шаблон
 * должен существовать, иначе никаких действий для данного 
 * атрибута произведено не будет), в котором предварительно 
 * по регулярному выражению заменяется подстрока
 * 
 * @param {type} options -- массив вида (значения по умолчанию):
 *      {
 searchRegexp:     /%fileds_group_number_lavel2%/g,  // Регулярное выражения для подстроки которую надо заменить
 newValue:         '888',                            // Новая подстрока
 attributeNames:   ['name', 'for'],                  // Массив атрибутов, в которых необходимо провести замену
 templateDataFieldAdditionalPart: '-template'  // -- прибавка к имени (для определения data-атрибута)
 // например если замена проходит для атрибута for, 
 // то шаблон будет искаться в атрибуте data-for-template
 copyValuesInsteadOtherPlaceholders            // НЕОБЯЗАТЕЛЬНЫЙ ПАРАМЕТР Делать ли замену плейсхолдеров, которые остались в шаблоне после подстановки вместо searchRegexp (основная)
 checkNameFragmentIsPlaceholderCallback        // НЕОБЯЗАТЕЛЬНЫЙ ПАРАМЕТР колбек для определения того, что фрагмент атрибута является плейсхолдером                                        
 }
 * @returns {type.fn.replaceInChildrenAttrsUsingTemplateNameDataAttr.$parent}
 */
$.fn.replaceInAttrsUsingTemplatesFromDataFileds = function (options) {

    var $this = $(this);

    var settings = $.extend({
        searchRegexp: /%fileds_group_number_lavel2%/g,
        newValue: '888',
        attributeNames: ['name', 'for'],
        templateDataFieldAdditionalPart: '-template',
        copyValuesInsteadOtherPlaceholders: false,
        checkNameFragmentIsPlaceholderCallback: function (nameSection) {
            return false;
        }

    }, options);

    var templateValue = '';
    var templateValueAfterReplacement = '';
    settings.attributeNames.forEach(function (attrName, index, array) {
        templateValue = $this.attr('data-' + attrName + settings.templateDataFieldAdditionalPart);
        if (!jswl.isEmpty(templateValue)) {
            templateValueAfterReplacement = templateValue.replace(
                    settings.searchRegexp,
                    settings.newValue
                    );

            if ((attrName === 'name') // если работаем с атрибутом name
                    && settings.copyValuesInsteadOtherPlaceholders) {
                var attrValue = $this.attr(attrName);
                var templateNameFragments = jswl.getSquareBracketedFragments(templateValueAfterReplacement);

                templateNameFragments.forEach(function (templateFragment, index, array) {

                    if (settings.checkNameFragmentIsPlaceholderCallback(templateFragment)
                            && !jswl.isEmpty(attrValue)) { // если это заглушка (плейсхолдер) и есть из чего копировать       
                        var initialFragment = jswl.getSquareBracketedFragmentByNumber(attrValue, index);
                        if (!jswl.isEmpty(initialFragment)) { // если и в исходном (заменяемом значении) этот фрагмент не пуст

                            templateValueAfterReplacement = templateValueAfterReplacement.replace(
                                    templateFragment,
                                    initialFragment
                                    );
                        }
                    }
                });
            }

            $this.attr(
                    attrName,
                    templateValueAfterReplacement
                    );
        }
    });

    return $this;
}

/**
 * Проведёт замену подстроки по указанному регулярному выражению
 * в списке указанных атрибутов
 * 
 * @param {regexp} searchRegexp    Регулярное выражения для подстроки которую надо заменить
 * @param {literal} newValue       Новая подстрока
 * @param {array} attributeNames   Массив атрибутов, в которых необходимо провести замену
 * @returns {type.fn.replaceInAttrs.$parent}
 */
$.fn.replaceInAttrs = function (searchRegexp, newValue, attributeNames) {
    var $this = $(this);

    var oldValue = '';

    attributeNames.forEach(function (attrName, index, array) {
        oldValue = $this.attr(attrName);
        $this.attr(attrName, oldValue.replace(searchRegexp, newValue));
    });

    return $this;
}