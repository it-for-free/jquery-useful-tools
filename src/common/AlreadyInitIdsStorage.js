export default jutsAlreadyInitIdsStorage;
import jswl from "js-wrapper-lib";

/**
 * Функции (плагины), данного набора,
 *  привязывающие обработчики на элементы с уникальным id,
 *  могут дописывать в данный объект
 *  поля, в которых хранить списки 
 *   id для, которых уже применён данный плагин (необходим чтобы 
 *  обработчики одного и того же плагина не вешались
 *  на один и тот же элемент дважды)
 *  
 *  Можно использовать импортировав как AlreadyInitIdsStorage
 *  
 * @returns {object}
 */
jutsAlreadyInitIdsStorage = function(){}; 

/**
 *  Уже используемые
 * 
 * @type Object
 */
var _storageData = {};

/**
* Проверит наличие элемента в списке __alreadyInitIdsStorage
*  и если его там не было, то добавит.
*  Используйте эту функцию, прежде чем привязывать событие в плагинах
* 
* @param {String} elementId        id элемента, который проверяется на актуальность инициллизации данном плагином
* @param {String} substorageName   имя хранилища для данной плагина (подразумевается, что один плагин использует хотя бы одно уникальное имя для себя)
* @returns {Boolean} был ли элемент отмечен как инициллизированный ранее (до вызова этой функции), если не был -- то можете вещать обработчики в вашем плагине
*/
jutsAlreadyInitIdsStorage.checkAndAddIfNeed = function(elementId, substorageName)
{
   /* Инициаллизируем хранилище, на случае если его ещё не было*/
   if (jswl.isNullOrUndefined(jutsAlreadyInitIdsStorage._storageData[substorageName])) {
       jutsAlreadyInitIdsStorage._storageData[substorageName] = [];
   }

   var result = true;
   if (!jswl.inArray(elementId, jutsAlreadyInitIdsStorage._storageData[substorageName])) {
       jutsAlreadyInitIdsStorage._storageData[substorageName].push(elementId); // запоминаем значение
       result = false;
   } 

   return result;
}


