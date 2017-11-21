// JavaScript Document

      var app = {

          initialize: function() {
              this.bindEvents();
          },
         
          bindEvents: function() {
              var takePhoto = document.getElementById('takePhoto');
              takePhoto.addEventListener('click', app.takePhoto, false);
              var takePhoto2 = document.getElementById('takePhoto2');
              takePhoto2.addEventListener('click', app.takePhoto2, false);
          },

          takePhoto: function(){
              navigator.camera.getPicture(app.onPhotoDataSuccess, app.onFail, { quality: 80,targetWidth: 800,targetHeight: 800, 
                  allowEdit: false, destinationType: navigator.camera.DestinationType.DATA_URL,correctOrientation:true});
          },
		  takePhoto2: function(){
              navigator.camera.getPicture(app.onPhotoDataSuccess2, app.onFail2, { quality: 80,targetWidth: 800,targetHeight: 800, 
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
					
					img.height = 800;
					var ancho=(tamanow*800)/tamanoh;
					img.width = ancho;	
					document.images.photo.width=img.width;
					document.images.photo.height=img.height;
						
					}
				else
					{
					canvas.width = 150;
					var alto=(tamanoh*150)/tamanow;
					canvas.height = alto;	
					
					img.width = 800;
					var alto=(tamanoh*800)/tamanow;
					img.height = alto;	
					document.images.photo.width=img.width;
					document.images.photo.height=img.height;
					}
				ctx.drawImage(img, 0, 0,canvas.width,canvas.height);
				}
		
			
			
			},
		  onFail: function(message) 
		  	{
            alert('Failed because: ' + message);
          	},
		  onPhotoDataSuccess2: function(imageData) 
		  	{
         	var photo = document.getElementById('photo2');
			//photo.style.display = 'block';
			photo.src = "data:image/jpeg;base64," + imageData;
          	
			
			var canvas = document.getElementById("foto2");
			var ctx = canvas.getContext("2d");
			setTimeout(espera,500)
			function espera(){
				var img = document.getElementById('photo2');
				var tamanoh = img.height;
				var tamanow = img.width;
				
				if (tamanoh<tamanow)
					{
					canvas.height = 150;
					var ancho=(tamanow*150)/tamanoh;
					canvas.width = ancho;	
					
					img.height = 800;
					var ancho=(tamanow*800)/tamanoh;
					img.width = ancho;	
					document.images.photo.width=img.width;
					document.images.photo.height=img.height;
						
					}
				else
					{
					canvas.width = 150;
					var alto=(tamanoh*150)/tamanow;
					canvas.height = alto;	
					
					img.width = 800;
					var alto=(tamanoh*800)/tamanow;
					img.height = alto;	
					document.images.photo.width=img.width;
					document.images.photo.height=img.height;
					}
				ctx.drawImage(img, 0, 0,canvas.width,canvas.height);
				}
		
			
			
			},
		  onFail2: function(message) 
		  	{
            alert('Failed because: ' + message);
          	}
		
		};