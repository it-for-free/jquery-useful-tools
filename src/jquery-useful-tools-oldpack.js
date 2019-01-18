/**
 * Набор полезных JQuery-плагинов,
 * в том числе посвящённых быстрой работе со сложными формами (подойдёт для 
 * пототипирования приложения, главная цель -- совместимость с любой (условно любой) версткой)
 * 
 * @todo Может можно отказаться от глобальных массивов регистраций событий 
 * и просто использовать проверку не привязано ли уже событие (так или иначе)
 * depends: jqueryui ()
 * 
 */
(function($) {

    
   
    
    

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
    $.fn.replaceInChildrenAttrsUsingTemplatesFromDataFileds = function(options) {
        
        var $parent  = $(this);
        
        var settings = $.extend({
            searchRegexp:     /%fileds_group_number_lavel2%/g,
            newValue:         '888',
            attributeNames:   ['name', 'for'],
            templateDataFieldAdditionalPart: '-template',
            copyValuesInsteadOtherPlaceholders: false, 
            checkNameFragmentIsPlaceholderCallback: function(substr) {
                return false;
            }
            
        }, options);
        
        $parent.find('*').each(function()
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
    $.fn.replaceInAttrsUsingTemplatesFromDataFileds = function(options) {
        
        var $this  = $(this);
        
        var settings = $.extend({
            searchRegexp:     /%fileds_group_number_lavel2%/g,
            newValue:         '888',
            attributeNames:   ['name', 'for'],
            templateDataFieldAdditionalPart: '-template',
            copyValuesInsteadOtherPlaceholders: false, 
            checkNameFragmentIsPlaceholderCallback: function(nameSection) {
                return false;
            }
            
        }, options);
        
        var templateValue = '';
        var templateValueAfterReplacement = '';
        settings.attributeNames.forEach(function(attrName, index, array) {
            templateValue = $this.attr('data-' + attrName + settings.templateDataFieldAdditionalPart);
            if (!jswl.isEmpty(templateValue)) {
                templateValueAfterReplacement = templateValue.replace(
                    settings.searchRegexp, 
                    settings.newValue
                );

                if ((attrName === 'name') // если работаем с атрибутом name
                        && settings.copyValuesInsteadOtherPlaceholders) {
                    var attrValue  = $this.attr(attrName);
                    var templateNameFragments = jswl.getSquareBracketedFragments(templateValueAfterReplacement);

                    templateNameFragments.forEach(function(templateFragment, index, array) {
                        
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
    $.fn.replaceInAttrs  = function (searchRegexp, newValue, attributeNames) {
        var $this = $(this);
        
        var oldValue = '';
        
        attributeNames.forEach(function(attrName, index, array) {
            oldValue = $this.attr(attrName);
            $this.attr(attrName, oldValue.replace(searchRegexp, newValue));
        });
        
        return $this;
    }
    
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
    $.fn.parentCloser = function(options) {

        var settings = $.extend({
            parentLevel:     0,
            parentContainerLevel:   1,
            containerCallback: function($container) {} 
            }, options);

        
        var elementId = '';
        $(this).uniqueId();
        return this.each(function() {
            elementId = $(this).attr('id');
            
            if (!checkOrAndAddToAlreadyInitIds(elementId, 'parentCloser')) {
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
    $.fn.__deleteParentByLevelForUnique = function(options) {
       
        var settings = $.extend({
            parentLevel:     0,
            parentContainerLevel:   1,
            containerCallback: function($container) {} 
            }, options);
            
        var $controlElement = $(this);
        this.click(onClick);

        function onClick(){ 
            
            var $controlElement = $(this);
            var $parent =  $controlElement.nthParent(settings.parentLevel);
            var $container = $controlElement.nthParent(settings.parentContainerLevel);
            
            $parent.removeSmoothly({
                afterRemoveFinishedCallback: settings.containerCallback,
                afterRemoveFinishedParams: $container
            });
 
            return false;
        }
    }
    
    /**
     * 
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
     * Прокрутит страницу к данному блоку
     * .scrollParent() -- метод из JQuery UI,
     * который позволяет опрделить ближайший
     * родительский блок, в котором есть прокрутка
     * 
     * @param {string} scrollableElementSelector  строка селектора (можно пустую, 
     *  n но тогда будет произведен выбор какого-то старшего родителя (в зависиости от браузера html или body)
     *  Если вместо селктора передать сторку "&get-scroll-parent" -- будет произведена попытка использовать .scrollParent() -- метод из JQuery UI,
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
    
    
 
    
}( jQuery ));

var jswl = new JSWrapperLib();

/**
 * Набор обёрток, с более удобным синтаксисо
 * (чистый JavaScript)
 * 
 * Если объявить точку входа как:
 *   var jswl = new JSWrapperLib();
 * 
 * То функции в вашем скрипте можно вызывать как:
 * 
 * jswl.имяфункции()
 * 
 * @returns {undefined}
 */
function JSWrapperLib() {


    var self = this;

    /**
     * Проверит является ли 
     * значение null или undefined
     * 
     * @param {mixed} value  проверяемое значение
     * @returns {boolean}
     */
    this.isNullOrUndefined = function(value)
    {
        return (typeof value === "undefined" 
                || value === null);
    }


    /**
     * Проверит содержится ли элемент в массиве
     * 
     * @param {mixed} value
     * @param {array} array
     * @returns {Boolean}
     */
    this.inArray = function(value, array)
    {
        return (!(array.indexOf(value) === -1));
    }

    /**
     * Проверка на пустоту
     * 
     * @param {mixed} value
     * @returns {Boolean}  проверяемое значение
     */
    this.isEmpty = function(value) {
        return (typeof value === "undefined" || value === null || value ===  "");
    }

    /**
     * Получит фрагмент строки фрагмент, если её части разделены квадратными скобками:
     * people[123][groups][34][2]
     * -- для номера 3 вернёт 34
     * 
     * @param {string} str  строка с фрагментами. окружеными квадратными скобками
     * @param {int} number  номер фрагмента (начиная с нуля)
     * @returns {string}
     */
    this.getSquareBracketedFragmentByNumber = function(str, number) {

        var nameFrags = self.getSquareBracketedFragments(str);
        return nameFrags[number];
    }


    /**
     * Получит фрагментs строки фрагмент, если её части 
     * разделены квадратными скобками в виде массива,
     *  например дпя:
     * people[123][groups][34][2]
     * вернёт массив элементов (строк):
     * [people, 123, groups, 34, 2]
     * -- по факту разбиение идёт по открывающей скобке
     * 
     * @param {string} str  строка с фрагментами. окружеными квадратными скобками
     * @returns {array} массив строк
     */
    this.getSquareBracketedFragments = function(str) {

        var nameFrags = str.split('['); // разбиваем по открывающей скобке
        nameFrags.forEach(function(element, index, nameFrags) {
            nameFrags[index] = element.replace(/\]/g, ""); 
        });
        return nameFrags;
    }

    /**
     * Проверит, что подстрока входит в данную строку
     * (содержится в строке) 
     * 
     * @param {string} str    строка
     * @param {string} substr  подстрока
     * @returns {Boolean}
     */
    this.checkForSubstring = function(str, substr)
    {
        return (str.indexOf(substr) !== -1);
    }
}