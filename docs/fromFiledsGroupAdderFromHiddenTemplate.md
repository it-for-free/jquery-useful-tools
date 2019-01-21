# Копирование из скрытого шаблона. Плагин `$.fromFiledsGroupAdderFromHiddenTemplate()` 

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
