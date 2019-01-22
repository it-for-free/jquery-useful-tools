# Копирование элемента (в т.ч. полей формы). Плагин `$.fn.parentInParentContainerDublicator()`

Плагин конирует имеющийся элемент (напр. содержащий группу полей формы) в родительсеий элмент более высокого порядка ("контейнер").
При этом для корректной замены атрибутов, придётся определить специальные data-шаблоны, например:

```html
<h3>Данные  консультациях</h3>
<div class="row">
    <div class="consult-item-item-container input-holder">
        <div class="col-3-in-row">
            <label>Ф.И.О. консультанта</label>
            <input type="text" name="people[{$personSubkey}][consultation][0][fio]"
                   data-name-template="people[{$personSubkey}][consultation][%fields_group_number_2%][fio]">
        </div>
        <a class="btn-input add-block" href="#"></a>
        <a class="btn-input close-btn delete-block" href="#"></a>
    </div>
</div>
```

Пример вызова вместе с плагином удаления `parentCloser()`:

```javascript
$(".add-student").parentInParentContainerDublicator(
    {
    "thisSelector": ".add-student", 
    "containerParentLevel": 1,   
    "parentLevel": 0, 
    "replaceRegexp": /%fields_group_number_2%/g,
    "afterCloneCallback": initParentElementsHandlers
});

$(".delete-student").parentCloser({parentLevel: 0});

function initParentElementsHandlers($block) {
    $(".delete-student").parentCloser({parentLevel: 0});
    FormComponent.reinitCustomSelectFull($block);
}
```

Параметры (через двоеточие указаны значения по умолчанию):

* `thisSelector: '', `           селектор элемента на который вещается плагин (управляющего, того,
                                           по которому пользователь будет длеать клик при дублировании блока)
* `containerParentLevel: 1,`      уровень родительского контейнера 
                                                (в который добавляем)
* `parentLevel: 0,`               уровень родителя (папа = 0) (копию 
                                                которого добавляем в родительский блок с уровнем containerParentLevel)   
* `replaceRegexp: /%plholder%/g`, регулярное выражение для замены 
                                           в аттрибутах подстроки на порядокый номер данного элемента в родителе
* `afterCloneCallback: function($addedGroup) {}`    НЕ ОБЯЗАТЕЛЕН: эта функция будет 
                                            вызвана для копируемого шаблона (вы можете провести дополнительные инициллизации), по факту
                                            в данный момент она используется, как минимум для повторной иницилизации элемента удаления
* `attributesToReplaceFromTemplate:   ['name', 'for', 'class']`, // НЕОБЯЗАТЕЛЬНЫЙ ПАРАМЕТР Массив атрибутов 
                                           каждого клонированного элемента (внутри склонированного блока),
                                           в которых необходимо провести замену из шаблона, определяемого templateDataFieldAdditionalPart
* `templateDataFieldAdditionalPart: '-template'` // НЕОБЯЗАТЕЛЬНЫЙ ПАРАМЕТР прибавка к имени (для определения data-атрибута)
                                            например если замена проходит для атрибута for, 
                                                то шаблон будет искаться в атрибуте data-for-template

* `copyValuesInsteadOtherPlaceholders`      // НЕОБЯЗАТЕЛЬНЫЙ ПАРАМЕТР Делать ли замену плейсхолдеров, которые остались в шаблоне значения атрибута после подстановки вместо replaceRegexp (основная)
* `checkNameFragmentIsPlaceholderCallback: function(attrSubstr) {   
                return jswl.checkForSubstring(attrSubstr, '%');`
            },                    // НЕОБЯЗАТЕЛЬНЫЙ ПАРАМЕТР колбек для определения того, что фрагмент атрибута является плейсхолдером 
* `containerCallback` : function($container) {}`    // НЕОБЯЗАТЕЛЬНЫЙ ПАРАМЕТР колбек для вызова на контейнере 
                             -- элементе уровня containerParentLevel, в который происходит дублирование, 
                            может быть использован, например, для перенумерации потомков, после очередного добавления
