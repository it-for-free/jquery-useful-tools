$( "document" ).ready(function(){
  
  console.log('hello!');
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
    }

});


