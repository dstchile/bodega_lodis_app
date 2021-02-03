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
               var options = {
					quality: 80,
					targetWidth: 1280,
					targetHeight: 720,
					//allowEdit: false,
					destinationType: navigator.camera.DestinationType.FILE_URI
					//destinationType: Camera.DestinationType.FILE_URI,
					//correctOrientation:true
					//sourceType: Camera.PictureSourceType.CAMERA,
					//mediaType: Camera.MediaType.CAMERA,
					//encodingType: Camera.EncodingType.JPEG,
					//saveToPhotoAlbum: true
				};
			  navigator.camera.getPicture(app.onPhotoDataSuccess, app.onFail,options);
          },
		  onPhotoDataSuccess: function(imageData) 
		  	{
			var photo = document.getElementById('photo');
			//photo.style.display = 'block';
			//photo.src = "data:image/jpeg;base64," + imageData;
          	photo.src = imageData;

			//alert(imageData);
			/////////////////////////////////////
			var db = window.openDatabase("lodis", "1.0", "lodis DB", 900000); //will create database Dummy_DB or open it
			db.transaction(populateDB2, errorCB2, successCB2);
			function populateDB2(tx) 
				{
				var f = new Date();
				var fechabase= f.getFullYear()+"-"+('0'+ (f.getMonth()+1)).slice(-2)+"-"+('0'+ f.getDate()).slice(-2);
				var h = new Date();
				var horabase= ('0'+ f.getHours()).slice(-2)+"-"+('0'+ f.getMinutes()).slice(-2)+"-"+('0'+ f.getSeconds()).slice(-2);
						
				
				var tipo_local=document.getElementById('tipo_local').value;
				var id_punto=document.getElementById('punto').value;
				var lugar=document.getElementById('lugar').value;
				//alert ("probando lugar:"+lugar+"----");
				
				var id_imagen=document.getElementById('id_imagen').value;
				if(id_imagen!='')
					{
					//alert ("update");
					tx.executeSql("UPDATE checklist_imagen_cola set ruta='"+imageData+"' , hora_base='"+horabase+"',estado='PENDIENTE' where id='"+id_imagen+"'");
					}
				else
					{
					//alert ("insert");
					console.log("datos:"+tipo_local+"-----"+id_punto+"----"+lugar+"---");
					tx.executeSql("INSERT INTO checklist_imagen_cola(tipo,id_punto,punto,lugar,fecha_base,hora_base,ruta,id_campana,id_producto,estado,area) VALUES ('"+tipo_local+"','"+id_punto+"','','"+lugar+"','"+fechabase+"','"+horabase+"','"+imageData+"','','','PENDIENTE','CHECKLIST')");
					}
				console.log( "Leyendo datos guardados." );
				}
			function errorCB2(err) 
				{
				if(err.code!=0 && err.code!=undefined)
					{
						alert("Error processing SQL 2: "+err.code);
					}
				}
			function successCB2() 
				{
				console.log( "Insert ok" );
				siguiente();
				}
			/////////////////////////////////////
			
			
			
			
			},
		  onFail: function(message) 
		  	{
            alert('Failed because: ' + message);
          	
			}
		 
		};