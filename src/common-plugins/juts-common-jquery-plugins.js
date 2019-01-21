import $ from 'jquery';
import jswl from "js-wrapper-lib";

/**
 * Накрутит счетчик в дата-атрибуте данного элемента,
 * или если такого атрибута нет, то
 * 
 * Инициаллизирует счетчик  в 
 * дата-атрибует данного элемента (подразумевается уникальный)
 * Убедитесь, что передаваемое имя уникального для данного 
 * элемента (чтобы он смог поддерживать разные счетчики)/
 * Если такого атрибута нет, то он будет создан со значением 1
 * 
 * @see Убедитесь, что ваш элемент выбран по id или 
 * относительно id (чтобы он был единственным -- это важно 
 * если вы используете)
 * 
 * @param {JQuery} $element
 * @param {String} counterName   имя атрибута (будет data-counterName)
 * @returns {undefined}
 */
$.fn.incDataAttrCounter = function(counterName) {

    var $element = $(this);
    if ($element.isDataAttrEmpty(counterName)) {
        $element.data(counterName, (1).toString());
    } else {
        var oldValue = $element.data(counterName);
        $element.data(counterName, (Number(oldValue) + 1).toString());
    }
}

/**
 * Получает родиля указанного уровня для данного элемента
 * 
 * @param {integer} n  уровень родителя (вверх по дереву DOM)
 *                     Например: уровень папы = 0, прадедушки = 2
 * @returns {type.fn.nthParent.$p}
 */
$.fn.nthParent = function(n){
    var $p = $(this);
    while ( n-- >= 0 )
    {
      $p = $p.parent();
    }
    return $p;
};

/**
 * Склонирует элемент и все дата атрибуты, отвязав события
 * от самого элемента и всех его потомков
 * 
 * @returns {unresolved}
 */
$.fn.cloneWithDataAttrs = function() {   
    var $this = $(this);
    return $this.clone().off().unbindAllForChildren();
}

/**
 * 
 * Получит значение счетчика, устанавливаемого в data-атрибут с помощью
 * @param {type} counterName
 * @returns {unresolved}
 */
$.fn.getDataAttrCounter = function(counterName) {      
    var $element = $(this);

    if ($element.isDataAttrEmpty(counterName)) {
        throw new Error("Counter is with name ", counterName,
            "undefined for : ", $element, " // use $.incDataAttrCounter() at least onse ");
    }

    return $element.data(counterName);
}

/**
 * Проверит есть ли data-атрибут с указанным имененем
 * А если есть -- то не пуст ли он.
 * 
 * @param {String} attrName
 * @returns {unresolved}
 */
$.fn.isDataAttrEmpty = function(attrName) {

    var dataAttr = $(this).data(attrName);
    return (jswl.isEmpty(dataAttr));
}


/**
 * Проверит есть ли атрибут с указанным имененем
 * А если есть -- то не пуст ли он.
 * 
 * @param {String} attrName  имя атрибута
 * @returns {unresolved}
 */
$.fn.isAttrEmpty = function(attrName) {

    var dataAttrName = $(this).attr(attrName);
    var result = ((typeof(dataAttrName) === 'undefined')
            || (dataAttrName === false));
    return result;
}

/**
 * Заменит id всех потомков (рекурсивно) на уникальные (или создаст эти id,
 * если их не было)
 * 
 * @returns {type.fn.renewUniqueIdsForChildren.$this}
 */
$.fn.renewUniqueIdsForChildren = function() {
    var $this = $(this);
    $this.find('*').removeAttr('id').renewUniqueId();
    return $this;
}


/**
 * Отвяжет все обработчики событий от потомков
 * 
 * @returns {type.fn.unbindAllForChildren.$this}
 */
$.fn.unbindAllForChildren = function() {
    var $this = $(this);
    $this.find('*').unbind();
    return $this;
}



/**
 * Плавно скроет, а затем удалит блок
 * ВНИМАНИЕ: работает асинхронно.
 * 
 * @param {object} options настройки
 *   afterRemoveFinishedCallback: function() {} // НЕОБЯЗАТЕЛЬНЫЙ ПАРАМЕТР для вызова после того
 *                            как элемент будет убран из DOM 
 *                            (полезно тз-зп асинхронности плагина)
 *   afterRemoveFinishedParams:  {}  // НЕОБЯЗАТЕЛЬНЫЙ ПРАМЕТР параметры для колбека
 * @returns {undefined}
 */
$.fn.removeSmoothly = function(options) {

    var settings = $.extend({
        afterRemoveFinishedCallback: function() {},
        afterRemoveFinishedParams: {}, 
    }, options);

    this.stop().animate({
            height: "0px", // высоту к нулю
            width: "0px", // высоту к нулю
            opacity: 0, // прозрачность к нулю
        }, 600, function() {
            $(this).remove(); // удаляем из DOM (если требуется, если же нет, то "закомментируйте" эту строку)
            settings.afterRemoveFinishedCallback(
                settings.afterRemoveFinishedParams
            ); // вызываем колбек
        }
    );
};
 

/**
 * Прокрутит блок (предполагается что родельский) 
 * к данному элементу
 * 
 * @param {JQuery} $element -- элемент который должен стать видимым
 * @returns {undefined}
 */
$.fn.scrollMeTo = function($element) {
    var $this = $(this);

    $this.animate({
         scrollTop: $element.offset().top
    }, 600);
}


/**
 * Remove select2 span container
 * 
 * @returns {type.fn.removeSelect2Span.$this}
 */
$.fn.removeSelect2Span = function () {
    var $this = $(this); // your select
    var $oldSpan = $this.next('span.select2-container');
    $oldSpan.remove();

    return $this;
}

/**
 * Получит основной "видимый" элемент select2
 * -- по факту этого span, добавленный сразу после вашего 
 * селекта..
 * 
 * @returns {type.fn.removeSelect2Span.$this}
 */
$.fn.select2GetSpan = function () {
    var $this = $(this); // your select
    var $select2Span = $this.next('span.select2-container');

    return $select2Span;
}

/**
 * Выставит CSS для неверного значения (ошибки) в select2 
 * (монжо вызывать например напр. после валидации)
 * 
 * @param {object} options   CSS свойства 
 * @returns {undefined}
 */
$.fn.select2SetError = function(options) {
    var $this = $(this);
    var settings = $.extend({
        // These are the defaults.
        "border-color": 'red',
        "border-style": 'solid'
    }, options);

    var $select2Span = $this.select2GetSpan();
    $select2Span.css(settings);
}

/**
 * Получит первый инпут с указаннм селектором
 * 
 * Вызывайте например так (для произвольной формы):
 * $(form).formFirstInput('вашСлектро');
 * -- в этом случае поиск будет осуществляться среди вообще 
 * всех веб-форм на странице.
 * 
 * Реализовано на основании идеи @see http://fkn.ktu10.com/?q=node/9850
 * 
 * @param {type} className
 * @returns {type.fn.fromFirstInputWithClass.$result}
 */
$.fn.formFirstInput = function(inputSelector) {
    var $this  = $(this);

    if (jswl.isEmpty(inputSelector)) {
       inputSelector = ''; 
    }

    var classFilter = ':input' + inputSelector + ':first';  
    var $result = $this.find('*').filter(classFilter);

    return $result;
}

/**
 * Вернёт весь html код
 * данного элемента, а не только внутренний
 * 
 * @returns {string}  весь HTML элемента
 */
$.fn.outerHTML = function(){
    var $this = $(this);
    return $this[0].outerHTML;
}


/**
 * В случае если значение атрибута разделено квадратными скобками
 * (напр. для name сложной формы)
 * получит его фрагмент, например для:
 * people[123][groups][34][2]
 * -- для fragmentNumber: 3 вернёт 34
 * 
 * @param {object} options Опции плагина
 * "attributeName": 'name', 
   "fragmentNumber": 0,
 * @returns string
 */
$.fn.getAttrFragment = function(options) {

    var $this = $(this);
    var settings = $.extend({
        "attributeName": 'name',
        "fragmentNumber": 0
    }, options);

    var str = $this.attr(settings.attributeName);

    return jswl.getSquareBracketedFragmentByNumber(str, settings.fragmentNumber);
}

/**
 * Получит значение секции атрибута name (имени) по номеру секции
 * Обёртка над $.fn.getAttrFragment для атрибута  name данного элемент
 * 
 * ((jquery js get name section subsection string by number))
 * 
 * @param   {int} fragmentNumber
 * @returns {string}
 */
$.fn.getNameFragment = function(fragmentNumber) {
    var $this = $(this);
    return $this.getAttrFragment({"attributeName": 'name',
        "fragmentNumber": fragmentNumber});
}