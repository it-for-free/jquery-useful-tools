import $ from 'jquery';
import   '../common/nthParent.js';

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
$.fn.fromFiledsGroupAdderFromHiddenTemplate = function (options) {


    var $this = $(this);

    var settings = $.extend({
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
    var $filedsGroupTemplateContainer = $(settings.templateContainerSelector);

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

        $(addFieldsGroupControlElementSelector).off("click"); // вырубаем иные обработчики
        $(addFieldsGroupControlElementSelector).on("click", function (e) { // добавляем блок с полями
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
        $(deleteFieldsGroupControlElementSelector).on("click", function () { // удаляем элемент
            var $element = $(this).nthParent(settings.parentLevelForDelete); // получаем родителя

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
            $(this).remove();
        }
        );

    }

    /**
     * Добавит новую группу полей в основной контейнер
     * @returns {Boolean}
     */
    this.addNewFiledsGroup = function () {

        var $newFiledsGroup = $($filedsGroupTemplateContainer.html()
                .replace(replaceGroupNumerRegexp, researchIndex));
        $newFiledsGroup.find('*').removeAttr('id'); // все потомки должны быть неуникальными

        $newFiledsGroup.appendTo($mainFiedsGroupsContainer).show('slow');

        researchIndex++;

        return false;
    }


    self.initAddProcess();
    self.initDeleteProcess();

}