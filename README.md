# JUTs (jquery useful tools)

Набор JQuery-плагинов в том числе для работы со сложными формами --
дублирования групп полей для вложенных сущностей (например в случае,
когда сущости относятся как "оидн ко многим")

## Использование (Usage)

Некоторые плагины зависят только от jquery, другие ещё и от jquery-ui, 
в общем случае можно сразу подключать и то и то и сам JUTs в таком порядке:

```html
<script src="jquery.js"></script> 
<script src="jquery-ui.js"></script> 
<script src="jquery-useful-tools.js"></script> 
```

## Основные плагины JUTs 
Далее описаны наиболее сложные (крупные) плагины, которые в своей работе могут использовать 
сразу несколько более простых плагинов JUTs.
Кратно об основных:
1. `$.fromFiledsGroupAdderFromHiddenTemplate()`  копирует в родительский контейнер (на который и вешается событие) из скрытого шаблона
2. [`$.fn.parentInParentContainerDublicator()`  копирует родитеский элемент для данной кнопки (ссылки), 
в родительский элемент ещё более высокого уровня.](docs/parentInParentContainerDublicator.md)

### Копирование из скрытого шаблона. Плагин `$.fromFiledsGroupAdderFromHiddenTemplate()` 

[`$.fromFiledsGroupAdderFromHiddenTemplate()` -- призван копировать группу полей (скрытый блок), 
которые лежит в другом скрытом блоке -- его контейнере](docs/parentInParentContainerDublicator.md).


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
 Все параметры:

* `addSelector`:     обязателен: подразумевается уникальный селектор  //  по умолчанию=`"#add-group"`,
* `deleteSelector`:  обязателен: неуникальный селектор, так как кнопка удалить есть у любой группы //  по умолчанию=`".delete-group"`,
* `templateContainerSelector`:  обязателен:  подразумевается уникальный селектор (такой блок один на странице) 
эт скрытый блок в котором лежит, опять же скрытый элемент группы полей //  по умолчанию=`'#template-container'`,
* `filedsGroupSelector`:  обязателен: неуникальный селектор, так как любая группа находится в таком эелменте, и 
по этому селектору производится определение очередного порядкового номера
-- блок с таким же селектором (только скрытый) должен лежать в  `templateContainerSelector` //  по умолчанию=`'.template-selector'`,
* `replaceGroupNumerRegexp`: обязателен: Регулярное выражение замены порядкового номера после копирования шаблона,
если, например ваша рыба это строка `%fileds_group_number%` то передайте регулярку `%fileds_group_number%`  //   по умолчанию=`/%fileds_group_number%/g`,
* `parentLevelForDelete`: обязателен: 0, 
* `filedGroupsCounterInitValue`: НЕ обязательно: Уровень родительского блока для удаления  // по умолчанию=`0` 
   -- т.е. не посредственный родитель, чем больше номер -- тем более вложенной должны быть ссылка удаления.
* `afterAddCallback`:  НЕ обязательно: функция обратного вызова, для проведения доп. действий над элемементами // по умолчанию=`function($addedGroup) {}` 

Примечания:

Плагин `$.fromFiledsGroupAdderFromHiddenTemplate()` добавления групп полей на форму,
подразумевается к вызову на конкретонм элементе (контейнере всех групп)
по уникальному селектору

Плагин НЕ обеспечивает непрерыной нумерации групп полей
в общем случае после окончани редактирования формы
(в случае удалений некоторых групп полей пользоватлем),
НО пришедшие с бэкэнда или добавленные на форму любым другим
способом группы полей (т.е. не спомощью данного плагина)
ДОЛЖНЫ БЫТЬ пронумерованы НЕПРЕРЫВНО



## Прочие плагины JUTs

* Плагины `getAttrFragment` и `getNameFragment` 
Позволяют извлекать фрагмент значения атрибута вида:
```
people[123][groups][34][2]
```
 по номеру (парсят квадратные скобки). Полезны напр. для работы с атрибутом name сложных форм.

## @TODO 


### Возможные улучшения (идеи)

* `parentInParentContainerDublicator` мог бы не заменять специальную строку в прототипе с прследующей заменой значения
атрибута значением из прототипа, 
а вообще не использовать прототип (шаблон значения атрибута в дата-атрибуте), просто указывая какой именно по порядку сегомент имени надо заменить на порядковый номер.
(по аналогии с уже внедренной идеей, замены оставшихся спец,
 строк в шаблоне значения атрибута на аналогические реальные значения сегментам, но там 
каждый сегмент проверяется специально на то не является ли он подтрокой, что сложнее в том числе для использования). 


##  Старая документация (будет удалена) 
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
