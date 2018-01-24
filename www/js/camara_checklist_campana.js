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
           ///////////validasmos item///////////////////////
			var estado_tarea=document.getElementById('estado_tarea').value;
			var i=0;
			var id_items={};
			var items={};
			var cantidades={};
			var valor_item='';
			while (document.getElementById('id_item'+i)!=undefined)
				{
				id_items[i]=document.getElementById('id_item'+i).value;
				items[i]=document.getElementById('item'+i).value;
				console.log("id:"+i+"---");
				console.log("valor:"+id_items[i]+"---");
				cantidades[i]=document.getElementById('cantidad'+i).value;
				console.log("--cantidades:"+cantidades[i]+"--");
				var valor2=cantidades[i]*1;
				
				if((valor2=='')&&(estado_tarea!='NO APLICA'))
					{
					alert("Debe indicar una cantidad para  "+items[i]+" ");
					valor_item='STOP';
					break;	
					}
				i++;
				}
			if (estado_tarea=='')
				{
				alert("Debe indicar el estado final");
				}
			else if (valor_item=='STOP')
				{
				}
			else
				{
			      navigator.camera.getPicture(app.onPhotoDataSuccess, app.onFail, { quality: 80,targetWidth: 800,targetHeight: 800, 
                  allowEdit: false, destinationType: navigator.camera.DestinationType.FILE_URI,correctOrientation:true});
				}
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
				var id_campana=document.getElementById('campana').value;
				var id_producto=document.getElementById('producto').value;
				//alert ("probando lugar:"+lugar+"----");
				
				var id_imagen=document.getElementById('id_imagen').value;
				if(id_imagen!='')
					{
					//alert ("update");
					tx.executeSql("UPDATE checklist_imagen_cola set ruta='"+imageData+"' , hora_base='"+horabase+"' ,estado='PENDIENTE' where id='"+id_imagen+"'");
					}
				else
					{
					//alert ("insert");
					console.log("datos:"+tipo_local+"-----"+id_punto+"----"+id_campana+"---");
					tx.executeSql("INSERT INTO checklist_imagen_cola(tipo,id_punto,punto,lugar,fecha_base,hora_base,ruta,id_campana,id_producto,estado,area) VALUES ('"+tipo_local+"','"+id_punto+"','','','"+fechabase+"','"+horabase+"','"+imageData+"','"+id_campana+"','"+id_producto+"','PENDIENTE','CAMPAÑA')");
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
				guarda_tarea();
				}
			/////////////////////////////////////
			
			},
		  onFail: function(message) 
		  	{
            alert('Failed because: ' + message);
          	console.log("probando aqui");
			var imageData='';
			
			}
		 
		};