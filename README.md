# JUTs (jquery useful tools)

Набор JQuery-плагинов в том числе для работы со сложными формами --
дублирования групп полей для вложенных сущностей (например в случае,
когда сущости относятся как "один ко многим")

## Использование (Usage)

Некоторые плагины зависят только от jquery, другие ещё и от jquery-ui, 
в общем случае можно сразу подключать и то и то и сам JUTs в таком порядке:

```html
<script src="jquery.js"></script> 
<script src="jquery-ui.js"></script> 
<script src="dist/juts-min.js"></script> 
```

## Основные плагины JUTs

Далее описаны наиболее сложные (крупные) плагины, которые в своей работе могут использовать 
сразу несколько более простых плагинов JUTs.
Кратно об основных:
1. [`$.fromFiledsGroupAdderFromHiddenTemplate()`  копирует в родительский контейнер 
(на который и вешается событие) из скрытого шаблона](docs/fromFiledsGroupAdderFromHiddenTemplate.md)
2. [`$.fn.parentInParentContainerDublicator()`  копирует родитеский элемент для данной кнопки (ссылки), 
в родительский элемент ещё более высокого уровня.](docs/parentInParentContainerDublicator.md)


## Прочие плагины JUTs

* Плагины `getAttrFragment` и `getNameFragment` 
Позволяют извлекать фрагмент значения атрибута вида:
```
people[123][groups][34][2]
```
 по номеру (парсят квадратные скобки). Полезны напр. для работы с атрибутом name сложных форм.

* `isInputsEmpty()` -- порверит пусты ли все поля-потомки данного элемента (можно проверять находится ли фрома  в состоянии по-умолчанию)
* `getInputType()`  -- выяснит тип тега/инпута 


## Сброка и другая работа с `npm`

Сборка:
```shell
npm run-script build
```
Отладочная сборка
```shell
npm run-script watch
```

## @TODO 


### Возможные улучшения (идеи)

* `parentInParentContainerDublicator` мог бы не заменять специальную строку в прототипе с прследующей заменой значения
атрибута значением из прототипа, 
а вообще не использовать прототип (шаблон значения атрибута в дата-атрибуте), просто указывая какой именно по порядку сегомент имени надо заменить на порядковый номер.
(по аналогии с уже внедренной идеей, замены оставшихся спец,
 строк в шаблоне значения атрибута на аналогические реальные значения сегментам, но там 
каждый сегмент проверяется специально на то не является ли он подтрокой, что сложнее в том числе для использования). 

* Может можно отказаться от глобальных массивов регистраций событий 
 и просто использовать проверку не привязано ли уже событие (так или иначе)

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
