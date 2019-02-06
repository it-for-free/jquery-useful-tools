$( "document" ).ready(function(){

    
//    // начать повторы с интервалом 3 сек
//    var timerId = setInterval(function() {
//      checkForm();
//    }, 3000);
//
//
//    setTimeout(function() {
//      clearInterval(timerId);
//      alert( 'стоп' );
//    }, 180000);

    checkForm();
    $("form :input").change(function() {
        console.log('------');
        checkForm();
    });

    
});


function checkForm()
{   
    if ($("#my-form").isInputsEmpty({ignoreCustomTypes: ['radio', 'select']})) {
        console.log('Поля пусты!');
    } else {
        console.log('Поля НЕ пусты!');
    }
}


