'use strict';

angular.module('yoAngularProjectApp')
  .directive('myDirective', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the myDirective directive');
      }
    };
  })

  .directive('draggable', function() {
    return function(scope, element) {
        // this gives us the native JS object
        var el = element[0];


      /*  console.log("element 0 is:");
        console.log(element.index());
        console.log(el);*/

        el.draggable = true;

        el.addEventListener(
            'dragstart',
            function(e) {


                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('Text', this.id);

                this.classList.add('drag');
                return false;
            },
            false
        );

        el.addEventListener(
            'dragend',
            function(e) {

            	console.log("Inside DRAG- dragend----");

                this.classList.remove('drag');
                return false;
            },
            false
        );
    }
})

  .directive('droppable', function() {
    return {
        scope: {
            drop: '&' // parent
        },
        link: function(scope, element) {
            // again we need the native object
            var el = element[0];

            el.addEventListener(
			    'dragover',
			    function(e) {
			        e.dataTransfer.dropEffect = 'move';
			        // allows us to drop


			        if (e.preventDefault) e.preventDefault();
			        this.classList.add('over');

			        console.log("Inside DROP-dragover----");

			        return false;
			    },
			    false
			);




			el.addEventListener(
			    'dragenter',
			    function(e) {
			        this.classList.add('over');

			        console.log("Inside DROP-dragenter----");

			        return false;
			    },
			    false
			);

			el.addEventListener(
			    'dragleave',
			    function(e) {


			    	console.log("Inside DROP-drag leave event--");

			        this.classList.remove('over');
			        return false;
			    },
			    false
			);

			el.addEventListener(
				'drop',
				function(e) {

					console.log("Inside DROP-drop event--");
					// Stops some browsers from redirecting.
					if (e.stopPropagation) e.stopPropagation();

					this.classList.remove('over');

					var item = document.getElementById(e.dataTransfer.getData('Text'));




					console.log("Item before dropping is:");
					console.log(item);
                    console.log("Id of item is:");
                    console.log(item.id);
                    var itemid=item.id;

					console.log("After item--------");
                  /*  console.log("item dropped is:");
                    console.log($('.item'));
                    console.log("Length is:");
                    console.log($('#item0').closest('.inProcess').length);
                    if($('#item0').closest('.inProcess').length==1)
                    {
                        alert("Choose accepted or rejected------");
                    }  */

					//console.log($('#item0').parent().parent().id);
					//console.log("Class added is:");
					//console.log($(li).class);

					 // console.log("index is:");
					 // console.log(e.dataTransfer.index());

					this.appendChild(item);

                    
                    console.log("item id before checking is:")
                    console.log(item.id);
                    console.log($("#" + item.id));
                    console.log("Length is:");
                    console.log($("#" + item.id).closest('.poAcceptedrejected').length);
                    if($("#" + item.id).closest('.poAcceptedrejected').length==1)
                    {
                         $( "#dialog-confirm" ).dialog({
                              resizable: false,
                              height:140,
                              modal: true,
                              buttons: {
                                Accept: function() {
                                  $( this ).dialog( "close" );
                                  $("#" + item.id).css('background','rgb(73, 224, 21)');
                                },
                                Reject: function() {
                                  $( this ).dialog( "close" );
                                  $("#" + item.id).css('background','rgb(217, 35, 35)');
                                }
                              }
                            });


                      // alert("Choose accepted or rejected for po------");
                    }
                    if($("#" + item.id).closest('.clientAcceptedrejected').length==1)
                    {

                         $( "#dialog-confirm" ).dialog({
                              resizable: false,
                              height:140,
                              modal: true,
                              buttons: {
                                Accept: function() {
                                  $( this ).dialog( "close" );
                                  $("#" + item.id).css('background','rgb(255, 200, 100)');
                                },
                                Reject: function() {
                                  $( this ).dialog( "close" );
                                  $("#" + item.id).css('background','rgb(217, 35, 35)');
                                }
                              }
                            });

                         
                       // alert("Choose accepted or rejected for client------");
                    }

					// call the drop passed drop function
					scope.$apply('drop()');

					return false;
					},

		false
	);





        }
    }
})


 .directive("ddDraggable", function(){
  console.log("inside drag");
    return {
        restrict: "A",
        link: function(scope, element, attributes, ctlr) {
            element.attr("draggable", true);
 
            element.bind("dragstart", function(eventObject) {
                eventObject.originalEvent.dataTransfer.setData("text", attributes.itemid);
            });
        }
    }
	
  })
    .directive("ddDropTarget", function(){
	
	console.log("inside drop");
	 return {
        restrict: "A",
        link: function (scope, element, attributes, ctlr) {
 
            element.bind("dragover", function(eventObject){
                eventObject.preventDefault();
            });
 
            element.bind("drop", function(eventObject) {
                 
                // invoke controller/scope move method
                scope.moveToBox(parseInt(eventObject.originalEvent.dataTransfer.getData("text")));
 
                // cancel actual UI element from dropping, since the angular will recreate a the UI element
                eventObject.preventDefault();
            });
        }
    };
	
	
	
	
	
	});



