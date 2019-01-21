$( "document" ).ready(function(){
  

    $(".add-block").parentInParentContainerDublicator(
        {
        "thisSelector": ".add-block", 
        "containerParentLevel": 1,   
        "parentLevel": 0, 
        "replaceRegexp": /%fields_group_number_2%/g,   
    });
    
    $(".delete-block").parentCloser({parentLevel: 0});
    
    function initParentElementsHandlers($block) {
        $(".delete-block").parentCloser({parentLevel: 0});
        $block.find(".file").remove();
        $block.find(".file_input").val("");
        $block.find(".consultation_key").remove();
        FormComponent.reinitCustomSelectFull($block);
        FormComponent.initDatapickers();
    }

});


