/**
 * Набор JQuery-плагинов, посвящённых быстрой работе со сложными формами (подойдёт для 
 * пототипирования приложения, главная цель -- совместимость с любой версткой)
 * 
 * depends: jqueryui ()
 * 
 * @param {type} $
 * @returns {undefined}
 */
(function( $ ) {
    
 
    /**
     *  Функции (плагины), данного набора,
     *  привязывающие обработчики на элементы с уникальным id,
     *  могут дописывать в данный объект
     *  поля, в которых хранить списки 
     *   id для, которых уже применён данный плагин (необходим чтобы 
     *  обработчики одного и того же плагина не вешались
     *  на один и тот же элемент дважды)
     * 
     * @type Object
     */
    var __alreadyInitIdsStorage = {};
    
    
    /**
     * Проверит наличие элемента в списке __alreadyInitIdsStorage
     *  и если его там не было, то добавит.
     *  Используйте эту функцию, прежде чем привязывать событие в плагинах
     * 
     * @param {String} elementId        id элемента, который проверяется на актуальность инициллизации данном плагином
     * @param {String} substorageName   имя хранилища для данной плагина (подразумевается, что один плагин использует хотя бы одно уникальное имя для себя)
     * @returns {Boolean} был ли элемент отмечен как инициллизированный ранее (до вызова этой функции), если не был -- то можете вещать обработчики в вашем плагине
     */
    function checkOrAndAddToAlreadyInitIds(elementId, substorageName)
    {
        /* Инициаллизируем хранилище, на случае если его ещё не было*/
        if (jswl.isNullOrUndefined(__alreadyInitIdsStorage[substorageName])) {
            __alreadyInitIdsStorage[substorageName] = [];
        }
        
        var result = true;
        if (!jswl.inArray(elementId, __alreadyInitIdsStorage[substorageName])) {
            __alreadyInitIdsStorage[substorageName].push(elementId); // запоминаем значение
            result = false;
            //console.log(elementId, substorageName, 'new!');
        } 
//        else {
//            console.log(elementId, substorageName, 'already init');
//        }

        return result;
    }
    


    /**
     * По клику на элемент Дублирует родительский блок указаного уровня, 
     * в родительский контейнер указаного уровня
     * (в реализации использованы относительные селекторы).
     * Таким образом сам управляющий элемент тоже окажется продублированным.
     * 
     * По факту является обёрткой, которая проверяет, 
     * которая добавляет все выбранным элементам уникальный id (если такового нет),
     * а затем уже каждому из них по уникальному селектору назначает обработчика,
     * который будет отсчитывать родителей от конкретного уникального элемента.
     * 
     * Является обёрткой для $('').__relativeParentInParentContainerDublicatorForUnique()
     * 
     * @param  {String} thisSelector            селектор элемента на который вещается плагин (управляющего, того,
     *                                          по которому пользователь будет длеать клик при дублировании блока)
     *                                          
     * @param {integer}  containerParentLevel                уровень родительского контейнера (в который добавляем) 
     * @param {integer}  parentLevel                         уровень родителя (папа = 0) (копию которого добавляем в родительский блок с уровнем containerParentLevel)   
     * @param {function} initParentElementsHandlersFunction  эта функция будет вызвна для копируемого шаблона, чтобы включить на нём необходимые обработчики   
     * @param {RegExp}   namesInParentResearchRegexp           регулярное выражение для замены в аттрибутах name скопированного контейнера.
     * @returns {window.$|jQuery|$|_$|@pro;window@pro;$|Window.$}
     */
    $.fn.parentInParentContainerDublicator = function(thisSelector, containerParentLevel,
        parentLevel, initParentElementsHandlersFunction, namesInParentResearchRegexp) {
       
        
        $(this).uniqueId();
        var elementId = '';
        return this.each(function() {
            elementId = $(this).attr('id');

            if (!checkOrAndAddToAlreadyInitIds(elementId, 
                'parentInParentContainerDublicator')) {
                
                $('#' + elementId).__relativeParentInParentContainerDublicatorForUnique(
                    thisSelector, // инициллизируем плагин для конкретного уникального элемента
                    containerParentLevel, 
                    parentLevel, 
                    initParentElementsHandlersFunction, 
                    namesInParentResearchRegexp);

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
     * 
     * @param  {String} thisSelector            селектор элемента на который вещается плагин (управляющего, того,
     *                                          по которому пользователь будет длеать клик при дублировании блока)
     *   
     * @param {integer}  containerParentLevel    уровень родительского контейнера (в который добавляем) 
     * @param {integer} parentLevel             уровень родителя (папа = 0) (копию которого добавляем в родительский блок с уровнем containerParentLevel)   
     * @param {function} initParentElementsHandlersFunction  эта функция будет вызвна для копируемого шаблона, чтобы включить на нём необходимые обработчики   
     * @param {RegExp}   namesInParentResearchRegexp           регулярное выражение для замены в аттрибутах name скопированного контейнера.  например /%fileds_group_number_2%/g
     * @returns {window.$|jQuery|$|_$|@pro;window@pro;$|Window.$}
     */
    $.fn.__relativeParentInParentContainerDublicatorForUnique = function(thisSelector, containerParentLevel, 
        parentLevel, initParentElementsHandlersFunction, namesInParentResearchRegexp) {
        
        
        var controlElementSelector = thisSelector; 

        
        var $controlElement = $(this);
        var $container = $controlElement.nthParent(containerParentLevel);
        var $template =  $controlElement.nthParent(parentLevel);
            
        $container.incDataAttrCounter(thisSelector); // фактически докрутит счетчик до нужного значения, по числу элементов в контейнере ещё до лкика на добавление очередного 
        
       // console.log('Инициаллизация плагина: ', $controlElement.attr('id'), $controlElement);
        this.click(onClick);

        function onClick(){ 
            
//            var $controlElement = $(this);
//            var $container = $controlElement.nthParent(containerParentLevel);
//            var $template =  $controlElement.nthParent(parentLevel);
//            
//            $container.incDataAttrCounter(thisSelector);
            
//            console.log('this', this);
//            console.log('contorol-element:', $controlElement.attr('id'), $controlElement);
//            console.log('container:', containerParentLevel,  $container);
//            console.log('template:', parentLevel, $template);
            
                    // $container.incDataAttrCounter(thisSelector); // накручиваем счетчик
            var $clonedTemplate = $template.cloneWithDataAttrs();
            
            $clonedTemplate.hide();
            $clonedTemplate.find('*').removeAttr('id'); // удаляем id всех элементах скопированного шаблона, чтобы блок был "нейтральным"
    
            $clonedTemplate.replaceInChildrenAttrsUsingTemplatesFromDataFileds({
                searchRegexp:     namesInParentResearchRegexp,
                newValue:         $container.getDataAttrCounter(thisSelector),
                attributeNames:   ['name', 'for'],
                templateDataFieldAdditionalPart: '-template'
            });
                

            
            $container.append($clonedTemplate);
            initParentElementsHandlersFunction($clonedTemplate); // выполняем необходимые действия типа привязки событий
            $clonedTemplate.show('slow');
            
            //
//            console.log('cloned = ', $clonedTemplate);
//            
//            console.log('look for: ', controlElementSelector, $controlElement);
//            console.log('founded control = ', $clonedTemplate.find(controlElementSelector));
            
            var $newContorlElement = $clonedTemplate.find(controlElementSelector);
            $newContorlElement.parentInParentContainerDublicator(controlElementSelector, containerParentLevel, 
                parentLevel, initParentElementsHandlersFunction, namesInParentResearchRegexp);

            return false;
        }
        
    } 
    

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
        }
     * @returns {type.fn.replaceInChildrenAttrsUsingTemplateNameDataAttr.$parent}
     */
    $.fn.replaceInChildrenAttrsUsingTemplatesFromDataFileds = function(options) {
        
        var $parent  = $(this);
        
        var settings = $.extend({
            searchRegexp:     /%fileds_group_number_lavel2%/g,
            newValue:         '888',
            attributeNames:   ['name', 'for'],
            templateDataFieldAdditionalPart: '-template'
            
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
        }
     * @returns {type.fn.replaceInChildrenAttrsUsingTemplateNameDataAttr.$parent}
     */
    $.fn.replaceInAttrsUsingTemplatesFromDataFileds = function(options) {
        
        var $this  = $(this);
        
        var settings = $.extend({
            searchRegexp:     /%fileds_group_number_lavel2%/g,
            newValue:         '888',
            attributeNames:   ['name', 'for'],
            templateDataFieldAdditionalPart: '-template'
            
        }, options);
        
        var templateValue = '';
        settings.attributeNames.forEach(function(attrName, index, array) {
            templateValue = $this.attr('data-' + attrName + settings.templateDataFieldAdditionalPart);
            if (!jswl.isEmpty(templateValue)) {
                $this.attr(
                    attrName, 
                    templateValue.replace(
                        settings.searchRegexp, 
                        settings.newValue
                    )
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
     * @param {integer} parentLevel  уровень родителя
     * @returns {block-dublicatorL#10.$.fn@call;each|Boolean}
     */    
    $.fn.parentCloser = function(parentLevel) {

        
        var elementId = '';
        $(this).uniqueId();
        return this.each(function() {
            elementId = $(this).attr('id');
            
            if (!checkOrAndAddToAlreadyInitIds(elementId, 'parentCloser')) {
                $('#' + elementId).__deleteParentByLevelForUnique(parentLevel);
            }
        });
    }
    
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
     * @see НЕ вызывать напрямую!
     * Палавно скрываем и удаляем родительский элемент при клике по данному
     * 
     * 
     * @param {type} parentLevel
     * @returns {undefined}
     */      
    $.fn.__deleteParentByLevelForUnique = function(parentLevel) {
       
        var $controlElement = $(this);
       //console.log('init delete for:', $controlElement.attr('id'), $controlElement);
        this.click(onClick);

        function onClick(){ 
            
            var $controlElement = $(this);
            var $parent =  $controlElement.nthParent(parentLevel);
            
            //console.log("удаляем родителя", parentLevel, $parent);
            
             $parent.removeSmoothly();

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
           // console.log('Устанавливаем счетчиктеперь', $element.data(counterName));
        } else {
            var oldValue = $element.data(counterName);
            $element.data(counterName, (Number(oldValue) + 1).toString());
           // console.log('Накручиваем счетчик, теперь ', $element.data(counterName));
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
        
        
        console.log('counter name:', counterName);
        console.log('counter value:', $element.data(counterName), $element);
        
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
//        console.log('проверяем на пустоту', attrName, dataAttr, 'тип', typeof(dataAttr));
//        console.log('проверяем пусто ли ', (typeof(dataAttr) === 'undefined')
//                || (dataAttr === false));
        return ((typeof(dataAttr) === 'undefined')
                || (dataAttr === false));
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
        console.log('is empty^', result);
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
    */
    $.fn.removeSmoothly = function() {
        this.stop().animate({
                height: "0px", // высоту к нулю
                width: "0px", // высоту к нулю
                opacity: 0, // прозрачность к нулю
            }, 600, function() {
                $(this).remove(); // удаляем из DOM (если требуется, если же нет, то "закомментируйте" эту строку)
            }
        );
    };
   
        
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
        
        console.log('scrollableElementSelector', scrollableElementSelector);
        
        if (jswl.isEmpty(scrollableElementSelector)) {
            console.log('empty-- take for browser');
            
            $scrollableParent = $.browser.mozilla ? $('html') : $('body');
            // $scrollableParent = $this.scrollParent();
        } else if (scrollableElementSelector === '&get-scroll-parent&') {
            console.log('auto');
            
            $scrollableParent = $this.scrollParent();
        } else {
            console.log('like user set');
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
        
        console.log('прокрутка блока ',  $this),
        console.log(' к блоку ', $element);
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
        // console.log('$oldSpan:', $oldSpan);
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
    
    }
       
        
    //return $(this);

 
}( jQuery ));