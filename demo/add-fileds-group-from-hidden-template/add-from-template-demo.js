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


