$(document).ready(function () {
    
    var input = $('input');
    var searchUrl = 'https://en.wikipedia.org/w/api.php';
	var identify;
	
	
    var ajaxArticleData = function (title, description) {
        $.ajax({
            url: searchUrl,
            dataType: 'jsonp',
			data: {
	
					'action': "query",
					'titles': title,
					'prop': "pageimages",
					'format': "json",
					'pithumbsize': "500"
	
				},
				success: function (data) {
				var str=JSON.stringify(data["query"]["pages"]);
				var Stri=str.substring(str.lastIndexOf("source")+1,str.lastIndexOf("width"));
				Stri = Stri.slice(7);
				Stri = Stri.slice(0, -2);
				var selector="#"+description;
				$(selector).append("<img src="+Stri+"  height='125' width='125' alt='No Page image' >");
				
				
				
				$("#well0, #well1, #well2, #well3, #well4, #well5, #well6,#well7, #well8, #well9, #well10").mouseenter(function() {
	
					$(this).css('background-color', 'grey');

				}).mouseleave(function() {
		
					$(this).css('background-color', 'white');

				}); 
				
				$("#well0, #well1, #well2, #well3, #well4, #well5, #well6,#well7, #well8, #well9, #well10").click(function() {
	
					var inputValue = $(this).html();
					inputValue = inputValue.substring(inputValue.indexOf("<h3>")+4,inputValue.lastIndexOf("</h3>"));
					$('#text').val(inputValue);
					$("form").submit();
	
	
		
				});
				
				
				
				
				
				
				
				}
			});
			};
      
   

    input.autocomplete({
        source: function (request, response) {
            $.ajax({
                url: searchUrl,
                dataType: 'jsonp',
                data: {
                    'action': "opensearch",
                    'format': "json",
                    'search': request.term
                },
                success: function (data) {
				
				$("#results").empty();
				var i;
				
				var k = [];
				for (i = 0; i < 10; i++) {
				
				identify ="well"+i;
			
				if(typeof data[1][i] !== "undefined")
				{
					$("#results").append("<div id='"+identify+"'><h3>"+data[1][i]+"</h3><p>" + data[2][i] + "</p></div>");
					
					ajaxArticleData(data[1][i], identify);

				};			
				};
        
                }
            });
        }
    });

  

	$("form").submit(function(){
   
		localStorage.title = $("#text").val();
	});

	
	
});