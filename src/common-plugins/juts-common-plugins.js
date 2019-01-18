import $ from 'jquery';

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