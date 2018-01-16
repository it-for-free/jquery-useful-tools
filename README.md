#JUTs (jquery useful tools)

Набор JQuery-плагинов в том числе для работы со сложными формами --
дублирования групп полей для вложенных сущностей (например в случае,
когда сущости относятся как "оидн ко многим")

## Использование ##

Далее документация по наиболее "сложным" плагинам данного набора

### Зависимости: Что подключать на странице  ###

Некоторые плагины зависят только от jquery, другие ещё и от jquery-ui, 
в общем случае можно сразу подключать и то и то и сам JUTs в таком порядке:

```html
<script src="jquery.js"></script> 
<script src="jquery-ui.js"></script> 
<script src="jquery-useful-tools.js"></script> 
```

### Плагины JUTs ###


#### Плагин `$.fromFiledsGroupAdderFromHiddenTemplate()` ####

`$.fromFiledsGroupAdderFromHiddenTemplate()` -- призван копировать группу полей (скрытый блок), 
которые лежит в другом скрытом блоке -- его контейнере.


Плагин вызывается на блоке-контэйнере (подразумевается уникальный селектор), пример минимального вызова:
```javascript

$( "document" ).ready(function(){
  
   console.log('hi there!');
   
   $("#students-list").fromFiledsGroupAdderFromHiddenTemplate({
        addSelector:     "#add-new-student",
        deleteSelector:   ".delete-student",
        templateContainerSelector:   '#sudent-info-template-container',
        filedsGroupSelector:   '.student-info',
        replaceGroupNumerRegexp:   /%sudent-number%/g,
        parentLevelForDelete: 0
   });
});

```

**См. демонстрацию** в `demo/add-fileds-group-from-hidden-template/from-with-multiple-fieds-group.html`

##### Все параметры ######


* `addSelector`:     обязателен: подразумевается уникальный селектор  //  по умолчанию=`"#add-group"`,
* `deleteSelector`:  обязателен: неуникальный селектор, так как кнопка удалить есть у любой группы //  по умолчанию=`".delete-group"`,
* `templateContainerSelector`:  обязателен:  подразумевается уникальный селектор (такой блок один на странице)  //  по умолчанию=`'#template-container'`,
* `filedsGroupSelector`:  обязателен: неуникальный селектор, так как любая группа находится в таком эелменте, и 
по этому селектору производится определение очередного порядкового номера  //  по умолчанию=`'.template-selector'`,
* `replaceGroupNumerRegexp`: обязателен: Регулярное выражение замены порядкового номера после копирования шаблона,
если, например ваша рыба это строка `%fileds_group_number%` то передайте регулярку `%fileds_group_number%`  //   по умолчанию=`/%fileds_group_number%/g`,
* `parentLevelForDelete`: обязателен: 0, 
* `filedGroupsCounterInitValue`: НЕ обязательно: Уровень родительского блока для удаления  // по умолчанию=`0` 
   -- т.е. не посредственный родитель, чем больше номер -- тем более вложенной должны быть ссылка удаления.
* `afterAddCallback`:  НЕ обязательно: функция обратного вызова, для проведения доп. действий над элемементами // по умолчанию=`function($addedGroup) {}` 

##### Примечания ######

Плагин `$.fromFiledsGroupAdderFromHiddenTemplate()` добавления групп полей на форму,
подразумевается к вызову на конкретонм элементе (контейнере всех групп)
по уникальному селектору

Плагин НЕ обеспечивает непрерыной нумерации групп полей
в общем случае после окончани редактирования формы
(в случае удалений некоторых групп полей пользоватлем),
НО пришедшие с бэкэнда или добавленные на форму любым другим
способом группы полей (т.е. не спомощью данного плагина)
ДОЛЖНЫ БЫТЬ пронумерованы НЕПРЕРЫВНО




##  Старая документация (будет удалена) ##
В данный момент копирование из шаблона для контейнера инициллизируется как так:

```javascript
    var newFormAdder = new  FormFieldGroupsDinamicAdder();

    newFormAdder.init(
        ".new-report-add-person-field-group",
        ".new-report-delete-person-field-group",
        "#new-editable-report-persons-filed-groups-container",
        "#new-report-person-info-form-part-container",
        ".report-person-info-form-part",
        /%fileds_group_number%/g,
        initPeopleGroupFileds
    );
```

Где initPeopleGroupFileds -- функция, которая вызывается для инициллизации
полей из очередной добавленной группы, например она может выглядеть как-то так:

```javascript
function initAffectedPeopleGroupFileds ()
{

    // привязываем датапикер для динамически добавляемых элементов
    $('input.datepicker_recurring_start.date-only').on('mouseenter', function(){
        console.log('bind datetimepiker')
        var $input = $(this);
        $input.removeClass('datepicker_recurring_start');
        $input.datetimepickerMaster({
            timepicker:false,
            format:'d.m.Y'
        });

    });
    $('input.datepicker_recurring_start.date-with-time').on('mouseenter', function(){
        console.log('bind datetimepiker')
        var $input = $(this);
        $input.removeClass('datepicker_recurring_start');
        $input.datetimepickerMaster({
            format:'d.m.Y H:i'
        });

    });

    
}
``` 

(в этом примере производится привязка датапикеров к вновь добавляемым полям)


##TODO ##

* @УБРАТЬ ИЗ ЛИБЫ@ - исправить проблемы по этой фразе

