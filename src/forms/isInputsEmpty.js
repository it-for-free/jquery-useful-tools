import $ from 'jquery';
import './getInputType.js';
import jswl from "js-wrapper-lib";

/**
 * Проверит что все потомки-инпуты любого уровня "пусты"
 * (цель -- убедиться, что форма находится в состоянии "по умолчанию")
 * 
 * ((jquery check than all from elements are empty, in default state))
 * 
 * @return {boolean}
 */
$.fn.isInputsEmpty = function (options) {

    var settings = $.extend({
        ignoreCustom: true,
        ignoreCustomTypes: ['radio'],
        ignoreTypesDefault: ['submit'],
        emptyZero: false, // считать ли ноль пустым значением
        trim: true,
    }, options);
    
    var $this = $(this);
    var result = true;
    $this.find(":input").each(function() {
        var $input = $(this);
        if (!(settings.ignoreCustom  // если игнорирование выключено или тип не из списка игнорирования
            && jswl.inArray($input.getInputType(), settings.ignoreCustomTypes))
            && !jswl.inArray($input.getInputType(), settings.ignoreTypesDefault)) {
            
            var value  = $input.val();
            if (settings.trim) {
               value = $.trim(value); 
            }
            
            console.log(value, $input.getInputType(), '|');

            if (!jswl.isEmpty(value)
                || (!settings.emptyZero && (value === 0  || value === '0')))
            {
                result = false;
                return false; // breack each
            }
        } 
    });
    return result;
}

