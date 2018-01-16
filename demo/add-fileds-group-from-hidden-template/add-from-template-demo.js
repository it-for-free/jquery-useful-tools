$( "document" ).ready(function(){
  
   console.log('hi there!');
   
   $("#students-data").fromFiledsGroupAdderFromHiddenTemplate({
       
        addSelector:     "#add-new-student",
        deleteSelector:   ".delete-student",
        templateContainerSelector:   '#sudent-info-template-container',
        filedsGroupSelector:   '.student-info',
        replaceGroupNumerRegexp:   /%sudent-number%/g,
        parentLevelForDelete: 1, 
        afterAddCallback:  function($addedGroup) {}
            
        
   });
}
);


