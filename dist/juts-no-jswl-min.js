!function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t){e.exports=$},function(e,t){e.exports=jswl},function(e,t){e.exports=null},function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(1),o=n.n(i);r.a.fn.incDataAttrCounter=function(e){var t=r()(this);if(t.isDataAttrEmpty(e))t.data(e,1..toString());else{var n=t.data(e);t.data(e,(Number(n)+1).toString())}},r.a.fn.nthParent=function(e){for(var t=r()(this);e-- >=0;)t=t.parent();return t},r.a.fn.cloneWithDataAttrs=function(){return r()(this).clone().off().unbindAllForChildren()},r.a.fn.getDataAttrCounter=function(e){var t=r()(this);if(t.isDataAttrEmpty(e))throw new Error("Counter is with name ",e,"undefined for : ",t," // use $.incDataAttrCounter() at least onse ");return t.data(e)},r.a.fn.isDataAttrEmpty=function(e){var t=r()(this).data(e);return o.a.isEmpty(t)},r.a.fn.isAttrEmpty=function(e){var t=r()(this).attr(e);return void 0===t||!1===t},r.a.fn.unbindAllForChildren=function(){var e=r()(this);return e.find("*").unbind(),e},r.a.fn.removeSmoothly=function(e){var t=r.a.extend({afterRemoveFinishedCallback:function(){},afterRemoveFinishedParams:{}},e);this.stop().animate({height:"0px",width:"0px",opacity:0},600,function(){r()(this).remove(),t.afterRemoveFinishedCallback(t.afterRemoveFinishedParams)})},r.a.fn.scrollMeTo=function(e){r()(this).animate({scrollTop:e.offset().top},600)},r.a.fn.removeSelect2Span=function(){var e=r()(this);return e.next("span.select2-container").remove(),e},r.a.fn.select2GetSpan=function(){return r()(this).next("span.select2-container")},r.a.fn.select2SetError=function(e){var t=r()(this),n=r.a.extend({"border-color":"red","border-style":"solid"},e);t.select2GetSpan().css(n)},r.a.fn.formFirstInput=function(e){var t=r()(this);o.a.isEmpty(e)&&(e="");var n=":input"+e+":first";return t.find("*").filter(n)},r.a.fn.outerHTML=function(){return r()(this)[0].outerHTML},r.a.fn.getAttrFragment=function(e){var t=r()(this),n=r.a.extend({attributeName:"name",fragmentNumber:0},e),a=t.attr(n.attributeName);return o.a.getSquareBracketedFragmentByNumber(a,n.fragmentNumber)},r.a.fn.getNameFragment=function(e){return r()(this).getAttrFragment({attributeName:"name",fragmentNumber:e})};n(2);r.a.fn.scrollToMe=function(e){var t=r()(this);(o.a.isEmpty(e)?r.a.browser.mozilla?r()("html"):r()("body"):"&get-scroll-parent&"===e?t.scrollParent():r()(e)).scrollMeTo(t)},r.a.fn.renewUniqueId=function(){var e=r()(this);return e.removeUniqueId().uniqueId(),e},r.a.fn.renewUniqueIdsForChildren=function(){var e=r()(this);return e.find("*").removeAttr("id").renewUniqueId(),e};var l=function(){};l._storageData={},l.checkAndAddIfNeed=function(e,t){o.a.isNullOrUndefined(l._storageData[t])&&(l._storageData[t]=[]);var n=!0;return o.a.inArray(e,l._storageData[t])||(l._storageData[t].push(e),n=!1),n};var c=l;r.a.fn.parentCloser=function(e){var t=r.a.extend({parentLevel:0,parentContainerLevel:1,containerCallback:function(e){}},e),n="";return r()(this).uniqueId(),this.each(function(){n=r()(this).attr("id"),c.checkAndAddIfNeed(n,"parentCloser")||r()("#"+n).__deleteParentByLevelForUnique(t)})},r.a.fn.__deleteParentByLevelForUnique=function(e){var t=r.a.extend({parentLevel:0,parentContainerLevel:1,containerCallback:function(e){}},e);r()(this);this.click(function(){var e=r()(this),n=e.nthParent(t.parentLevel),a=e.nthParent(t.parentContainerLevel);return n.removeSmoothly({afterRemoveFinishedCallback:t.containerCallback,afterRemoveFinishedParams:a}),!1})},r.a.fn.replaceInChildrenAttrsUsingTemplatesFromDataFileds=function(e){var t=r()(this),n=r.a.extend({searchRegexp:/%fileds_group_number_lavel2%/g,newValue:"888",attributeNames:["name","for"],templateDataFieldAdditionalPart:"-template",copyValuesInsteadOtherPlaceholders:!1,checkNameFragmentIsPlaceholderCallback:function(e){return!1}},e);return t.find("*").each(function(){r()(this).replaceInAttrsUsingTemplatesFromDataFileds(n)}),t},r.a.fn.replaceInAttrsUsingTemplatesFromDataFileds=function(e){var t=r()(this),n=r.a.extend({searchRegexp:/%fileds_group_number_lavel2%/g,newValue:"888",attributeNames:["name","for"],templateDataFieldAdditionalPart:"-template",copyValuesInsteadOtherPlaceholders:!1,checkNameFragmentIsPlaceholderCallback:function(e){return!1}},e),a="",i="";return n.attributeNames.forEach(function(e,r,l){if(a=t.attr("data-"+e+n.templateDataFieldAdditionalPart),!o.a.isEmpty(a)){if(i=a.replace(n.searchRegexp,n.newValue),"name"===e&&n.copyValuesInsteadOtherPlaceholders){var c=t.attr(e);o.a.getSquareBracketedFragments(i).forEach(function(e,t,a){if(n.checkNameFragmentIsPlaceholderCallback(e)&&!o.a.isEmpty(c)){var r=o.a.getSquareBracketedFragmentByNumber(c,t);o.a.isEmpty(r)||(i=i.replace(e,r))}})}t.attr(e,i)}}),t},r.a.fn.replaceInAttrs=function(e,t,n){var a=r()(this),i="";return n.forEach(function(n,r,o){i=a.attr(n),a.attr(n,i.replace(e,t))}),a},r.a.fn.fromFiledsGroupAdderFromHiddenTemplate=function(e){var t=r()(this),n=r.a.extend({addSelector:"#add-group",deleteSelector:".delete-group",templateContainerSelector:"#template-container",filedsGroupSelector:".template-selector",replaceGroupNumerRegexp:/%fileds_group_number%/g,parentLevelForDelete:0,filedGroupsCounterInitValue:0,afterAddCallback:function(e){}},e),a=n.addSelector,i=n.deleteSelector,o=t,l=r()(n.templateContainerSelector),c=n.filedsGroupSelector,u=n.replaceGroupNumerRegexp;this.initAddtionalAfterNewFiledsAdding=n.afterAddCallback;var s=n.filedGroupsCounterInitValue,d=this;s+=o.find(c).length,this.initAddProcess=function(){r()(a).off("click"),r()(a).on("click",function(e){return d.addNewFiledsGroup(),d.initDeleteProcess(),d.initAddtionalAfterNewFiledsAdding(),!1})},this.initDeleteProcess=function(){r()(i).on("click",function(){var e=r()(this).nthParent(n.parentLevelForDelete);return d.removeFiledsGroup(e),!1})},this.removeFiledsGroup=function(e){e.stop().animate({height:"0px",width:"0px",opacity:0},600,function(){r()(this).remove()})},this.addNewFiledsGroup=function(){var e=r()(l.html().replace(u,s));return e.find("*").removeAttr("id"),e.appendTo(o).show("slow"),s++,!1},d.initAddProcess(),d.initDeleteProcess()},r.a.fn.parentInParentContainerDublicator=function(e){r()(this);var t=r.a.extend({thisSelector:"",containerParentLevel:1,parentLevel:0,replaceRegexp:/%fields_group_number_2%/g,afterCloneCallback:function(e){},attributesToReplaceFromTemplate:["name","for","class"],templateDataFieldAdditionalPart:"-template",copyValuesInsteadOtherPlaceholders:!1,checkNameFragmentIsPlaceholderCallback:function(e){return o.a.checkForSubstring(e,"%")},containerCallback:function(e){}},e);r()(this).uniqueId();var n="";return this.each(function(){n=r()(this).attr("id"),c.checkAndAddIfNeed(n,"parentInParentContainerDublicator")||r()("#"+n).__relativeParentInParentContainerDublicatorForUnique(t)})},r.a.fn.__relativeParentInParentContainerDublicatorForUnique=function(e){r()(this);var t=r.a.extend({thisSelector:"",containerParentLevel:1,parentLevel:0,replaceRegexp:/%fields_group_number_2%/g,afterCloneCallback:function(e){},attributesToReplaceFromTemplate:["name","for","class"],templateDataFieldAdditionalPart:"-template",copyValuesInsteadOtherPlaceholders:!1,checkNameFragmentIsPlaceholderCallback:function(e){return!1},containerCallback:function(e){}},e),n=t.thisSelector,a=r()(this),i=a.nthParent(t.containerParentLevel),o=a.nthParent(t.parentLevel);i.incDataAttrCounter(t.thisSelector),this.click(function(){var e=o.cloneWithDataAttrs();return e.hide(),e.find("*").removeAttr("id"),e.replaceInChildrenAttrsUsingTemplatesFromDataFileds({searchRegexp:t.replaceRegexp,newValue:i.getDataAttrCounter(t.thisSelector),attributeNames:t.attributesToReplaceFromTemplate,templateDataFieldAdditionalPart:t.templateDataFieldAdditionalPart,copyValuesInsteadOtherPlaceholders:t.copyValuesInsteadOtherPlaceholders,checkNameFragmentIsPlaceholderCallback:t.checkNameFragmentIsPlaceholderCallback}),e.find("input").val(""),i.append(e),t.afterCloneCallback(e),t.containerCallback(i),e.show("slow"),e.find(n).parentInParentContainerDublicator(t),!1})},r.a.fn.getInputType=function(){return"INPUT"==this[0].tagName?this[0].type.toLowerCase():this[0].tagName.toLowerCase()},r.a.fn.isInputsEmpty=function(e){var t=r.a.extend({ignoreCustom:!0,ignoreCustomTypes:["radio"],ignoreTypesDefault:["submit"],emptyZero:!1,trim:!0},e),n=r()(this),a=!0;return n.find(":input").each(function(){var e=r()(this);if(!(t.ignoreCustom&&o.a.inArray(e.getInputType(),t.ignoreCustomTypes)||o.a.inArray(e.getInputType(),t.ignoreTypesDefault))){var n=e.val();if(t.trim&&(n=r.a.trim(n)),console.log(n,e.getInputType(),e),!o.a.isEmpty(n)||!t.emptyZero&&(0===n||"0"===n))return a=!1,!1}}),a}}]);
//# sourceMappingURL=juts-no-jswl-min.js.map