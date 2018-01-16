
/**
 * Динамическое добавление в
 * форму групп полей, описывающих вложенные документы
 * 
 * @returns {undefined}
 */
function FormFieldGroupsDinamicAdder()
{ 
    
     /*-----------------начало обязательно переопределяемого в потомках блока ------------------*/
    
    /**
     * По клику по нему очередная группа полей будет добавляться в форму
     * 
     * @type String
     */    
    var addFieldsGroupControlElementSelector = '.add-affected-person-field-group'; 
    
    
    /**
     * По клику по этому элементу будет удаляться
     * содержащий его блок c полями (группа полей)
     * 
     * @type String
     */    
    var deleteFieldsGroupControlElementSelector = '.delete-affected-person-field-group';
    
    /**
     * В этот элемент мы будет добавляеть группы полей,
     * а также удалять их их него если потребуется
     * 
     * @type window.$|jQuery|$|_$|@pro;window@pro;$|Window.$
     */
    var $mainFiedsGroupsContainer = $('#affected-persons-filed-groups-container');  
    
    /**
     * Используется для извлечения создержимого --
     * подразумевается, что это скрытый блок-шаблон
     * для группы полей, где в дальнейшем будет
     * произведена замена имени
     * 
     * @type window.$|jQuery|$|_$|@pro;window@pro;$|Window.$
     */
    var $filedsGroupTemplateContainer = $('#affected-person-info-form-part-container');
    
    /*
     * Селектор элемента, в который завернуты поля одной группы (по-идее класс)
     * -- исходный скрытый элемент, по-идее id
     * 
     * @type String
     */
    var filedsGroupContainerSelector = '.affected-person-info-form-part';
    
    
    
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
    var replaceGroupNumerRegexp = /%fileds_group_number%/g;
    
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
    var researchIndex = 0;
         
    /**
     * Для вызова методов класса из других методов, вызванных в обработчиках
     */
    var self = this; // ВАЖНО: назначим псевдоним
    
    
    /**
     * Этот метод класса надо вызвать извне чтобы он заработал
     * Принимает ряд селекторов
     * 
     * @param {String} addFieldsGroupControlElementSelector_    -- клик по нему добавляем группу полей   
     * @param {String} deleteFieldsGroupControlElementSelector_ -- клик по нему удаляет группу  полей
     * @param {String} mainFiedsGroupsContainerSelector_        -- вместилище групп на форме
     * @param {String} filedsGroupTemplateContainerSelector_    -- вместилище для скрытого блока-шаблона 
     * @param {String} filedsGroupContainerSelector_            -- скрытый блок-шаблон группы полей, тут нужен неуникальный селектор (например класс), используется в том числе для подсчета числа групп полей
     * @param {String} replaceGroupNumerRegexp_                 -- регулярное выражение (с подстрокой), которую нажно заменить на номер группы, при добавлении очереной группы полей на форму
     * @param {function} initAddtionalAfterNewFiledsAddingFunction -- функция, которую надо вызывать после добавления очередной группы полей
     * @returns {undefined}
     */
    this.init = function(addFieldsGroupControlElementSelector_,
        deleteFieldsGroupControlElementSelector_, 
        mainFiedsGroupsContainerSelector_,
        filedsGroupTemplateContainerSelector_,
        filedsGroupContainerSelector_,
        replaceGroupNumerRegexp_,
        initAddtionalAfterNewFiledsAddingFunction) {
        
        
        console.log('init FormFieldGropusAdder class');

        
        /* Инициаллизируем поля */
        addFieldsGroupControlElementSelector = addFieldsGroupControlElementSelector_; 
        deleteFieldsGroupControlElementSelector = deleteFieldsGroupControlElementSelector_;
        $mainFiedsGroupsContainer = $(mainFiedsGroupsContainerSelector_);  
        $filedsGroupTemplateContainer = $(filedsGroupTemplateContainerSelector_);
        filedsGroupContainerSelector = filedsGroupContainerSelector_;
        replaceGroupNumerRegexp = replaceGroupNumerRegexp_;
        self.initAddtionalAfterNewFiledsAdding = initAddtionalAfterNewFiledsAddingFunction;
        
        
        /* тут надо написать нормальноую инициаллизацию извне */
        
        researchIndex = $mainFiedsGroupsContainer.find(filedsGroupContainerSelector).length; // определяем исходное (пришедшее с бэкэнда) число групп полей
        
        self.initAddProcess();
        self.initDeleteProcess();
        
//        console.log('----finish init. Число изначальных блоков', filedsGroupContainerSelector,' в контейнере: ', 
//            researchIndex, $mainFiedsGroupsContainer);
    }
    
    /**
     * Добавление группы полей (прикручиваем обработчики)
     * 
     * @returns {undefined}
     */
    this.initAddProcess  = function() {
        
        $(addFieldsGroupControlElementSelector).off("click"); // вырубаем иные обработчики
        $(addFieldsGroupControlElementSelector).on("click", function(e) { // добавляем блок с полями
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
    this.initDeleteProcess  = function() {
        
        /* Удаление группы полей */
        $(deleteFieldsGroupControlElementSelector).on("click", function() { // удаляем элемент
            $element = $(this).nthParent(settings.parentLevelForDelete); // получаем родителя
            self.removeFiledsGroup($element);
            return false;
        });
    }
 
    /**
     * Производим дополнительные действия после 
     * добавления группы полей, например,
     * привязываем к некторорым полям группы специфические обработчики и т.д.
     * 
     * @returns {undefined}
     */
    this.initAddtionalAfterNewFiledsAdding = function() {}
    
    
    /**
     * Добавит новую группу полей в основной контейнер
     * 
     * @param {type} $groupElement
     * @returns {undefined}
     */
    this.removeFiledsGroup =  function ($groupElement) {
        $groupElement.stop().animate({ // анимация средствами JQuery

                height: "0px", // высоту к нулю
                width: "0px", // высоту к нулю
                opacity: 0, // прозрачность к нулю
            }, 600, function() {
                $(this).remove(); 
            }
        );

        researchIndex--;    
            
    }
    
    /**
     * Добавит новую группу полей в основной контейнер
     * @returns {Boolean}
     */
    this.addNewFiledsGroup =  function () {
        
        console.log('add fileds group...');

        
             
        console.log(filedsGroupContainerSelector);
        var $newFiledsGroup = $($filedsGroupTemplateContainer.html()
                .replace(replaceGroupNumerRegexp, researchIndex));
        
        $newFiledsGroup.find('.outtaHere').removeClass('outtaHere'); // УБРАТЬ ИЗ ЛИБЫ
        $newFiledsGroup.find('div.customSelect').remove(); // УБРАТЬ ИЗ ЛИБЫ
        
        $newFiledsGroup.find('*').removeAttr('id'); // все потоми должны быть неуникальными
        
        $newFiledsGroup.appendTo($mainFiedsGroupsContainer).show('slow');
         
        console.log('add row!!', 'RR=', $filedsGroupTemplateContainer, $mainFiedsGroupsContainer);
        researchIndex++;
            
        return false;
    }
     
     

}




 



