// JavaScript Document

      var app = {

          initialize: function() {
              this.bindEvents();
          },
         
          bindEvents: function() {
              var takePhoto = document.getElementById('takePhoto');
              takePhoto.addEventListener('click', app.takePhoto, false);
          },

          takePhoto: function(){
              navigator.camera.getPicture(app.onPhotoDataSuccess, app.onFail, { quality: 20, 
                  allowEdit: false, destinationType: navigator.camera.DestinationType.DATA_URL,correctOrientation:true});
          },

          onPhotoDataSuccess: function(imageData) 
		  	{
         	var photo = document.getElementById('photo');
			//photo.style.display = 'block';
			photo.src = "data:image/jpeg;base64," + imageData;
          	
			
			var canvas = document.getElementById("foto1");
			var ctx = canvas.getContext("2d");
			setTimeout(espera,500)
			function espera(){
				var img = document.getElementById('photo');
				var tamanoh = img.height;
				var tamanow = img.width;
				
				if (tamanoh<tamanow)
					{
					canvas.height = 150;
					var ancho=(tamanow*150)/tamanoh;
					canvas.width = ancho;	
					}
				else
					{
					canvas.width = 150;
					var alto=(tamanoh*150)/tamanow;
					canvas.height = alto;	
					}
				//document.images.blah.width=100;
				//document.images.blah.height=100;
				//document.getElementById("tamanoheight").value=tamanoh;
				//document.getElementById("tamanowidth").value=tamanow;
				alert ("tamaño alto:"+ tamanoh +" ancho:"+ tamanow +" ---");
				ctx.drawImage(img, 0, 0,canvas.width,canvas.height);
				}
		
			
			
			},
		  onFail: function(message) 
		  	{
            alert('Failed because: ' + message);
          	}
		};