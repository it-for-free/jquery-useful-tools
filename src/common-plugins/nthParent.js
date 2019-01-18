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