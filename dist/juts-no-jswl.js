/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = $;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = jswl;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = null;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "$"
var external_$_ = __webpack_require__(0);
var external_$_default = /*#__PURE__*/__webpack_require__.n(external_$_);

// EXTERNAL MODULE: external "jswl"
var external_jswl_ = __webpack_require__(1);
var external_jswl_default = /*#__PURE__*/__webpack_require__.n(external_jswl_);

// CONCATENATED MODULE: ./src/common-plugins/juts-common-jquery-plugins.js



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
external_$_default.a.fn.incDataAttrCounter = function(counterName) {

    var $element = external_$_default()(this);
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
external_$_default.a.fn.nthParent = function(n){
    var $p = external_$_default()(this);
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
external_$_default.a.fn.cloneWithDataAttrs = function() {   
    var $this = external_$_default()(this);
    return $this.clone().off().unbindAllForChildren();
}

/**
 * 
 * Получит значение счетчика, устанавливаемого в data-атрибут с помощью
 * @param {type} counterName
 * @returns {unresolved}
 */
external_$_default.a.fn.getDataAttrCounter = function(counterName) {      
    var $element = external_$_default()(this);

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
external_$_default.a.fn.isDataAttrEmpty = function(attrName) {

    var dataAttr = external_$_default()(this).data(attrName);
    return (external_jswl_default.a.isEmpty(dataAttr));
}


/**
 * Проверит есть ли атрибут с указанным имененем
 * А если есть -- то не пуст ли он.
 * 
 * @param {String} attrName  имя атрибута
 * @returns {unresolved}
 */
external_$_default.a.fn.isAttrEmpty = function(attrName) {

    var dataAttrName = external_$_default()(this).attr(attrName);
    var result = ((typeof(dataAttrName) === 'undefined')
            || (dataAttrName === false));
    return result;
}

/**
 * Отвяжет все обработчики событий от потомков
 * 
 * @returns {type.fn.unbindAllForChildren.$this}
 */
external_$_default.a.fn.unbindAllForChildren = function() {
    var $this = external_$_default()(this);
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
external_$_default.a.fn.removeSmoothly = function(options) {

    var settings = external_$_default.a.extend({
        afterRemoveFinishedCallback: function() {},
        afterRemoveFinishedParams: {}, 
    }, options);

    this.stop().animate({
            height: "0px", // высоту к нулю
            width: "0px", // высоту к нулю
            opacity: 0, // прозрачность к нулю
        }, 600, function() {
            external_$_default()(this).remove(); // удаляем из DOM (если требуется, если же нет, то "закомментируйте" эту строку)
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
external_$_default.a.fn.scrollMeTo = function($element) {
    var $this = external_$_default()(this);

    $this.animate({
         scrollTop: $element.offset().top
    }, 600);
}


/**
 * Remove select2 span container
 * 
 * @returns {type.fn.removeSelect2Span.$this}
 */
external_$_default.a.fn.removeSelect2Span = function () {
    var $this = external_$_default()(this); // your select
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
external_$_default.a.fn.select2GetSpan = function () {
    var $this = external_$_default()(this); // your select
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
external_$_default.a.fn.select2SetError = function(options) {
    var $this = external_$_default()(this);
    var settings = external_$_default.a.extend({
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
external_$_default.a.fn.formFirstInput = function(inputSelector) {
    var $this  = external_$_default()(this);

    if (external_jswl_default.a.isEmpty(inputSelector)) {
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
external_$_default.a.fn.outerHTML = function(){
    var $this = external_$_default()(this);
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
external_$_default.a.fn.getAttrFragment = function(options) {

    var $this = external_$_default()(this);
    var settings = external_$_default.a.extend({
        "attributeName": 'name',
        "fragmentNumber": 0
    }, options);

    var str = $this.attr(settings.attributeName);

    return external_jswl_default.a.getSquareBracketedFragmentByNumber(str, settings.fragmentNumber);
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
external_$_default.a.fn.getNameFragment = function(fragmentNumber) {
    var $this = external_$_default()(this);
    return $this.getAttrFragment({"attributeName": 'name',
        "fragmentNumber": fragmentNumber});
}
// EXTERNAL MODULE: external "null"
var external_null_ = __webpack_require__(2);

// CONCATENATED MODULE: ./src/common-plugins/juts-common-jquery-ui-plugins.js
/**
 * Плагины для JqueryUi (с опорой на функционал jqueryui)
 */






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
external_$_default.a.fn.scrollToMe = function(scrollableElementSelector) {
    var $this = external_$_default()(this); 
    var $scrollableParent = 'none';

    if (external_jswl_default.a.isEmpty(scrollableElementSelector)) {
        $scrollableParent = external_$_default.a.browser.mozilla ? external_$_default()('html') : external_$_default()('body');
        // $scrollableParent = $this.scrollParent();
    } else if (scrollableElementSelector === '&get-scroll-parent&') {
        $scrollableParent = $this.scrollParent();
    } else {

        $scrollableParent = external_$_default()(scrollableElementSelector);
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
external_$_default.a.fn.renewUniqueId = function(){
    var $this = external_$_default()(this);
    $this.removeUniqueId().uniqueId();
    return $this;

};

/**
 * Заменит id всех потомков (рекурсивно) на уникальные (или создаст эти id,
 * если их не было)
 * 
 * @returns {type.fn.renewUniqueIdsForChildren.$this}
 */
external_$_default.a.fn.renewUniqueIdsForChildren = function() {
    var $this = external_$_default()(this);
    $this.find('*').removeAttr('id').renewUniqueId();
    return $this;
}
// CONCATENATED MODULE: ./src/common/AlreadyInitIdsStorage.js




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
 var jutsAlreadyInitIdsStorage = function(){}; 

/**
 *  Уже используемые
 * 
 * @type Object
 */
jutsAlreadyInitIdsStorage._storageData = {};

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
   if (external_jswl_default.a.isNullOrUndefined(jutsAlreadyInitIdsStorage._storageData[substorageName])) {
       jutsAlreadyInitIdsStorage._storageData[substorageName] = [];
   }

   var result = true;
   if (!external_jswl_default.a.inArray(elementId, jutsAlreadyInitIdsStorage._storageData[substorageName])) {
       jutsAlreadyInitIdsStorage._storageData[substorageName].push(elementId); // запоминаем значение
       result = false;
   } 

   return result;
}

/* harmony default export */ var AlreadyInitIdsStorage = (jutsAlreadyInitIdsStorage);
// CONCATENATED MODULE: ./src/common-plugins/parentCloser.js
/**
 * Удаление/сокрытие родительских элементов
 */




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
external_$_default.a.fn.parentCloser = function (options) {

    var settings = external_$_default.a.extend({
        parentLevel: 0,
        parentContainerLevel: 1,
        containerCallback: function ($container) {}
    }, options);


    var elementId = '';
    external_$_default()(this).uniqueId();
    return this.each(function () {
        elementId = external_$_default()(this).attr('id');

        if (!AlreadyInitIdsStorage.checkAndAddIfNeed(elementId, 'parentCloser')) {
            external_$_default()('#' + elementId).__deleteParentByLevelForUnique(settings);
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
external_$_default.a.fn.__deleteParentByLevelForUnique = function (options) {

    var settings = external_$_default.a.extend({
        parentLevel: 0,
        parentContainerLevel: 1,
        containerCallback: function ($container) {}
    }, options);

    var $controlElement = external_$_default()(this);
    this.click(onClick);

    function onClick() {

        var $controlElement = external_$_default()(this);
        var $parent = $controlElement.nthParent(settings.parentLevel);
        var $container = $controlElement.nthParent(settings.parentContainerLevel);

        $parent.removeSmoothly({
            afterRemoveFinishedCallback: settings.containerCallback,
            afterRemoveFinishedParams: $container
        });

        return false;
    }
}
// CONCATENATED MODULE: ./src/common-plugins/replaceInAttributes.js
/**
 * Замены в атрибутах
 */



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
external_$_default.a.fn.replaceInChildrenAttrsUsingTemplatesFromDataFileds = function (options) {

    var $parent = external_$_default()(this);

    var settings = external_$_default.a.extend({
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
        var $current = external_$_default()(this);
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
external_$_default.a.fn.replaceInAttrsUsingTemplatesFromDataFileds = function (options) {

    var $this = external_$_default()(this);

    var settings = external_$_default.a.extend({
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
        if (!external_jswl_default.a.isEmpty(templateValue)) {
            templateValueAfterReplacement = templateValue.replace(
                    settings.searchRegexp,
                    settings.newValue
                    );

            if ((attrName === 'name') // если работаем с атрибутом name
                    && settings.copyValuesInsteadOtherPlaceholders) {
                var attrValue = $this.attr(attrName);
                var templateNameFragments = external_jswl_default.a.getSquareBracketedFragments(templateValueAfterReplacement);

                templateNameFragments.forEach(function (templateFragment, index, array) {

                    if (settings.checkNameFragmentIsPlaceholderCallback(templateFragment)
                            && !external_jswl_default.a.isEmpty(attrValue)) { // если это заглушка (плейсхолдер) и есть из чего копировать       
                        var initialFragment = external_jswl_default.a.getSquareBracketedFragmentByNumber(attrValue, index);
                        if (!external_jswl_default.a.isEmpty(initialFragment)) { // если и в исходном (заменяемом значении) этот фрагмент не пуст

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
external_$_default.a.fn.replaceInAttrs = function (searchRegexp, newValue, attributeNames) {
    var $this = external_$_default()(this);

    var oldValue = '';

    attributeNames.forEach(function (attrName, index, array) {
        oldValue = $this.attr(attrName);
        $this.attr(attrName, oldValue.replace(searchRegexp, newValue));
    });

    return $this;
}
// CONCATENATED MODULE: ./src/nested-forms/fromFiledsGroupAdderFromHiddenTemplate.js



/**
 * Плагин добавления групп полей на форму,
 * подразумевается к вызову на конкретонм элементе (контейнере всех групп)
 * по уникальному селектору
 * 
 * Плагин НЕ обеспечивает непрерыной нумерации групп полей
 * в общем случае после окончани редактирования формы
 * (в случае удалений некоторых групп полей пользоватлем),
 * НО пришедшие с бэкэнда или добавленные на форму любым другим
 * способом группы полей (т.е. не спомощью данного плагина)
 * ДОЛЖНЫ БЫТЬ пронумерованы НЕПРЕРЫВНО
 * 
 * @returns {type.fn.unbindAllForChildren.$this}
 */
external_$_default.a.fn.fromFiledsGroupAdderFromHiddenTemplate = function (options) {


    var $this = external_$_default()(this);

    var settings = external_$_default.a.extend({
        addSelector: "#add-group",
        deleteSelector: ".delete-group",
        templateContainerSelector: '#template-container',
        filedsGroupSelector: '.template-selector',
        replaceGroupNumerRegexp: /%fileds_group_number%/g,
        parentLevelForDelete: 0,
        filedGroupsCounterInitValue: 0,
        afterAddCallback: function ($addedGroup) {}

    }, options);

    /*-----------------начало обязательно переопределяемого в потомках блока ------------------*/

    /**
     * По клику по нему очередная группа полей будет добавляться в форму
     * 
     * @type String
     */
    var addFieldsGroupControlElementSelector = settings.addSelector;


    /**
     * По клику по этому элементу будет удаляться
     * содержащий его блок c полями (группа полей)
     * 
     * @type String
     */
    var deleteFieldsGroupControlElementSelector = settings.deleteSelector;

    /**
     * В этот элемент мы будет добавляеть группы полей,
     * а также удалять их их него если потребуется
     * 
     * @type window.$|jQuery|$|_$|@pro;window@pro;$|Window.$
     */
    var $mainFiedsGroupsContainer = $this;

    /**
     * Используется для извлечения создержимого --
     * подразумевается, что это скрытый блок-шаблон
     * для группы полей, где в дальнейшем будет
     * произведена замена имени
     * 
     * @type window.$|jQuery|$|_$|@pro;window@pro;$|Window.$
     */
    var $filedsGroupTemplateContainer = external_$_default()(settings.templateContainerSelector);

    /*
     * Селектор элемента, в который завернуты поля одной группы (по-идее класс)
     * -- исходный скрытый элемент, по-идее id
     * 
     * @type String
     */
    var filedsGroupContainerSelector = settings.filedsGroupSelector;



    /**
     * Регулярное выражение, подстроку извлечённую из него
     * будем заменять на текущее значение researchIndex
     * 
     *  Например, если в вашем случае пэйсхолдером (обычно его размещаю в имени элементов input)
     *  является подстрока %element-index%, например:
     *  <input placeholder="возраст" name="person-list[%element-index%][age]" type="text">
     *   то надо в качестве значения данного свойства
     *   нужно указать указать /%element-index%/g
     * 
     * @type RegExp
     */
    var replaceGroupNumerRegexp = settings.replaceGroupNumerRegexp;


    /**
     * Производим дополнительные действия после 
     * добавления группы полей, например,
     * привязываем к некторорым полям группы специфические обработчики и т.д.
     * 
     * @returns {undefined}
     */
    this.initAddtionalAfterNewFiledsAdding = settings.afterAddCallback;

    /*-----------------конец обязательно переопределяемого в потомках блока ------------------*/


    /**
     * Фактически число -- при инициаллизации класса в него 
     * попадёт число уже имеющихся групп полей.
     * Используется в качестве индекса при добавлении новых групп/
     * 
     * Подразумевается, что добавленные на страницу статически (с бэкэнда)
     * блоки должны нумероваться с нуля
     * 
     * @type jQuery.prototype.pushStack.ret.length|jQuery.length
     */
    var researchIndex = settings.filedGroupsCounterInitValue;

    /**
     * Для вызова методов класса из других методов, вызванных в обработчиках
     */
    var self = this; // ВАЖНО: назначим псевдоним




    /* тут надо написать нормальноую инициаллизацию извне */

    researchIndex = researchIndex + $mainFiedsGroupsContainer.find(filedsGroupContainerSelector).length; // определяем исходное (пришедшее с бэкэнда) число групп полей

    /**
     * Добавление группы полей (прикручиваем обработчики)
     * 
     * @returns {undefined}
     */
    this.initAddProcess = function () {

        external_$_default()(addFieldsGroupControlElementSelector).off("click"); // вырубаем иные обработчики
        external_$_default()(addFieldsGroupControlElementSelector).on("click", function (e) { // добавляем блок с полями
            self.addNewFiledsGroup();
            self.initDeleteProcess();
            self.initAddtionalAfterNewFiledsAdding();

            return false;
        });
    }

    /**
     * Удаление группы полей (прикручиваем обработчики)
     * 
     * @returns {undefined}
     */
    this.initDeleteProcess = function () {

        /* Удаление группы полей */
        external_$_default()(deleteFieldsGroupControlElementSelector).on("click", function () { // удаляем элемент
            var $element = external_$_default()(this).nthParent(settings.parentLevelForDelete); // получаем родителя

            self.removeFiledsGroup($element);
            return false;
        });
    }



    /**
     * Добавит новую группу полей в основной контейнер
     * 
     * @param {type} $groupElement
     * @returns {undefined}
     */
    this.removeFiledsGroup = function ($groupElement) {
        $groupElement.stop().animate({// анимация средствами JQuery
            height: "0px", // высоту к нулю
            width: "0px", // высоту к нулю
            opacity: 0, // прозрачность к нулю
        }, 600, function () {
            external_$_default()(this).remove();
        }
        );

    }

    /**
     * Добавит новую группу полей в основной контейнер
     * @returns {Boolean}
     */
    this.addNewFiledsGroup = function () {

        var $newFiledsGroup = external_$_default()($filedsGroupTemplateContainer.html()
                .replace(replaceGroupNumerRegexp, researchIndex));
        $newFiledsGroup.find('*').removeAttr('id'); // все потомки должны быть неуникальными

        $newFiledsGroup.appendTo($mainFiedsGroupsContainer).show('slow');

        researchIndex++;

        return false;
    }


    self.initAddProcess();
    self.initDeleteProcess();

}
// CONCATENATED MODULE: ./src/nested-forms/parentInParentContainerDublicator.js




/**
 * По клику на элемент Дублирует родительский блок указаного уровня, 
 * в родительский контейнер указаного уровня
 * (в реализации использованы относительные селекторы).
 * Таким образом сам управляющий элемент тоже окажется продублированным.
 * 
 * По факту является обёрткой для $('').__relativeParentInParentContainerDublicatorForUnique(), которая проверяет, 
 * которая добавляет все выбранным элементам уникальный id (если такового нет),
 * а затем уже каждому из них по уникальному селектору назначает обработчик,
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
external_$_default.a.fn.parentInParentContainerDublicator = function (options) {

    var $this = external_$_default()(this);
    var settings = external_$_default.a.extend({
        "thisSelector": '',
        "containerParentLevel": 1,
        "parentLevel": 0,
        "replaceRegexp": /%fields_group_number_2%/g,
        afterCloneCallback: function ($addedGroup) {},
        attributesToReplaceFromTemplate: ['name', 'for', 'class'],
        templateDataFieldAdditionalPart: '-template',
        copyValuesInsteadOtherPlaceholders: false,
        checkNameFragmentIsPlaceholderCallback: function (attrSubstr) {
            return external_jswl_default.a.checkForSubstring(attrSubstr, '%');
        },
        containerCallback: function ($container) {}
    }, options);



    external_$_default()(this).uniqueId();
    var elementId = '';
    return this.each(function () {
        elementId = external_$_default()(this).attr('id');

        if (!AlreadyInitIdsStorage.checkAndAddIfNeed(elementId,
                'parentInParentContainerDublicator')) {

            external_$_default()('#' + elementId).__relativeParentInParentContainerDublicatorForUnique(
                    settings);
        }
    });
}

/**
* @see НЕ вызывать напрямую!
* 
* По клику на элемент Дублирует родительский блок указаного уровня, 
* в родительский контейнер указаного уровня
* (в реализации использованы относительные селекторы)
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
   "afterCloneCallback": function($addedGroup) {}  // НЕОБЯЗАТЕЛЬНЫЙ ПАРАМЕТР эта функция будет 
                                         вызвна для копируемого шаблона (вы можете провести дополнительные инициллизации)
   attributesToReplaceFromTemplate:   ['name', 'for', 'class'], // НЕОБЯЗАТЕЛЬНЫЙ ПАРАМЕТР Массив атрибутов 
                                      каждого клонированного элемента (внутри склонированного блока),
                                      в которых необходимо провести замену из шаблона, определяемого templateDataFieldAdditionalPart
   templateDataFieldAdditionalPart: '-template' // НЕОБЯЗАТЕЛЬНЫЙ ПАРАМЕТР прибавка к имени (для определения data-атрибута)
                                       например если замена проходит для атрибута for, 
                                           то шаблон будет искаться в атрибуте data-for-template

   copyValuesInsteadOtherPlaceholders      // НЕОБЯЗАТЕЛЬНЫЙ ПАРАМЕТР Делать ли замену плейсхолдеров, которые остались в шаблоне значения атрибута после подстановки вместо replaceRegexp (основная)
   checkNameFragmentIsPlaceholderCallback  // НЕОБЯЗАТЕЛЬНЫЙ ПАРАМЕТР колбек для определения того, что фрагмент атрибута является плейсхолдером 
   containerCallback : function($container) {}    // НЕОБЯЗАТЕЛЬНЫЙ ПАРАМЕТР колбек для вызова на контейнере 
                -- элементе уровня containerParentLevel, в который происходит дублирование, 
               может быть использован, например, для перенумерации потомков, после очередного добавления
   }
* @param {object}   options          настройки.
* @returns {window.$|jQuery|$|_$|@pro;window@pro;$|Window.$}
*/
external_$_default.a.fn.__relativeParentInParentContainerDublicatorForUnique = function(options) {

    var $this = external_$_default()(this);
    var settings = external_$_default.a.extend({
       "thisSelector": '', 
       "containerParentLevel": 1,   
       "parentLevel": 0, 
       "replaceRegexp": /%fields_group_number_2%/g,
       afterCloneCallback: function($addedGroup) {},
       attributesToReplaceFromTemplate:  ['name', 'for', 'class'],
       templateDataFieldAdditionalPart: '-template',
       copyValuesInsteadOtherPlaceholders: false, 
       checkNameFragmentIsPlaceholderCallback: function(substr) {
           return false;
       },
       containerCallback: function($container) {} 
           }, options);

    var controlElementSelector = settings.thisSelector; 

//        console.log('copy other:', settings.copyValuesInsteadOtherPlaceholders);
//        console.log('bind on:', $this);

    var $controlElement = external_$_default()(this);
    var $container = $controlElement.nthParent(settings.containerParentLevel);
    var $template =  $controlElement.nthParent(settings.parentLevel);

    $container.incDataAttrCounter(settings.thisSelector); // фактически докрутит счетчик до нужного значения, по числу элементов в контейнере ещё до лкика на добавление очередного 

    this.click(onClick);

    function onClick(){ 

       var $clonedTemplate = $template.cloneWithDataAttrs();

       $clonedTemplate.hide();
       $clonedTemplate.find('*').removeAttr('id'); // удаляем id всех элементах скопированного шаблона, чтобы блок был "нейтральным"


       $clonedTemplate.replaceInChildrenAttrsUsingTemplatesFromDataFileds({
           searchRegexp:     settings.replaceRegexp,
           newValue:         $container.getDataAttrCounter(settings.thisSelector),
           attributeNames:   settings.attributesToReplaceFromTemplate,
           templateDataFieldAdditionalPart: settings.templateDataFieldAdditionalPart,
           copyValuesInsteadOtherPlaceholders: settings.copyValuesInsteadOtherPlaceholders, 
           checkNameFragmentIsPlaceholderCallback: 
                   settings.checkNameFragmentIsPlaceholderCallback
           }
       );

       $clonedTemplate.find('input').val('');

       $container.append($clonedTemplate);
       settings.afterCloneCallback($clonedTemplate); // выполняем необходимые действия типа привязки событий
       settings.containerCallback($container); // перенумеровываем элементы
       $clonedTemplate.show('slow');


       var $newContorlElement = $clonedTemplate.find(controlElementSelector);

       $newContorlElement.parentInParentContainerDublicator(settings);

       return false;
   }
}

// CONCATENATED MODULE: ./src/forms/getInputType.js


/**
 * Определит тип тега (полезно, в частности для инпутов)
 * 
 * @link https://stackoverflow.com/a/9116746
 * 
 * ((jquery check than all from elements are empty, in default state))
 * 
 * @return {String}
 */
external_$_default.a.fn.getInputType = function () {

    return (this[0].tagName == "INPUT" ? 
        this[0].type.toLowerCase() : 
        this[0].tagName.toLowerCase());
}

// CONCATENATED MODULE: ./src/forms/isInputsEmpty.js




/**
 * Проверит что все потомки-инпуты любого уровня "пусты"
 * (цель -- убедиться, что форма находится в состоянии "по умолчанию")
 * 
 * ((jquery check than all from elements are empty, in default state))
 * 
 * @return {boolean}
 */
external_$_default.a.fn.isInputsEmpty = function (options) {

    var settings = external_$_default.a.extend({
        ignoreCustom: true,
        ignoreCustomTypes: ['radio'],
        ignoreTypesDefault: ['submit'],
        emptyZero: false, // считать ли ноль пустым значением
        trim: true,
    }, options);
    
    var $this = external_$_default()(this);
    var result = true;
    $this.find(":input").each(function() {
        var $input = external_$_default()(this);
        if (!(settings.ignoreCustom  // если игнорирование выключено или тип не из списка игнорирования
            && external_jswl_default.a.inArray($input.getInputType(), settings.ignoreCustomTypes))
            && !external_jswl_default.a.inArray($input.getInputType(), settings.ignoreTypesDefault)) {
            
            var value  = $input.val();
            if (settings.trim) {
               value = external_$_default.a.trim(value); 
            }
            
            console.log(value, $input.getInputType(), '|');

            if (!external_jswl_default.a.isEmpty(value)
                || (!settings.emptyZero && (value === 0  || value === '0')))
            {
                result = false;
                return false; // breack each
            }
        } 
    });
    return result;
}


// CONCATENATED MODULE: ./src/main.js
// плагины общего назначения


 


// Вложенные формы (группы полей)



// Работа с формами
 // определяет что все потомки-инпуты условно "пусты"
 // определяем тип

/***/ })
/******/ ]);
//# sourceMappingURL=juts-no-jswl.js.map