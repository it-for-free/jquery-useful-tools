#JUTs (jquery useful tools)

Набор JQuery-плагинов в том числе для работы со сложными формами --
дублирования групп полей для вложенных сущностей (например в случае,
когда сущости относятся как "оидн ко многим")

## Использование ##

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

