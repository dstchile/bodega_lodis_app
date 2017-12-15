//////////////////////////////////////////////////////////////////////////////////////
document.addEventListener("deviceready", descarga, false);
function descarga()
	{
	document.addEventListener("pause", onPause, false);
	}
function onPause() 
	{
		var db = window.openDatabase("lodis", "1.0", "lodis DB", 900000); //will create database Dummy_DB or open it
		db.transaction(queryDB,errorCB);
		function queryDB(tx)
			{
			tx.executeSql('SELECT * FROM checklist_imagen_cola where estado="PENDIENTE" ',[],querySuccess,errorCB);
			console.log( "Leyendo datos guardados." );
			}
		function errorCB(err) 
			{
			if(err.code!=0 && err.code!=undefined)
				{
				alert("Error processing Descarga N°: "+err.code);
				}
			}
		function querySuccess(tx,result)
			{
			console.log( "Insert ok" );
			$.each(result.rows,function(index)
				{
				var row = result.rows.item(index);
				var id_imagen=row['id'];
				var tipo_local=row['tipo'];
				var id_punto=row['id_punto'];
				var lugar=row['lugar'];
				var fecha_img=row['fecha_base'];
				var hora_img=row['hora_base'];
				var id_campana=row['id_campana'];
				var id_producto=row['id_producto'];
				var area=row['area'];
				
				var ruta=row['ruta'];
				//alert ("lectura de ruta:"+ruta+"-id:"+id_imagen+"---tipo:"+tipo_local);
				
				var image = new Image();
			 	image.src = ruta;
				image.onload = function () 
					{
					var canvas = document.createElement('canvas');
					canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
					canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size
					canvas.getContext('2d').drawImage(this, 0, 0);
					var dataURL = canvas.toDataURL("image/jpeg",0.95);
					var blobBin = atob(dataURL.split(',')[1]);
					var array = [];
					for(var i = 0; i < blobBin.length; i++) 
						{
						array.push(blobBin.charCodeAt(i));
						}
					var file=new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
					var formData = new FormData();
					formData.append("imagen", file);
					formData.append("tipo_local",tipo_local );
					formData.append("id_punto", id_punto);
					formData.append("lugar", lugar);
					formData.append("fecha_img", fecha_img);
					formData.append("hora_img", hora_img);
					formData.append("id_campana", id_campana);
					formData.append("id_producto", id_producto);
					formData.append("area", area);
					$.ajax({
						type: 'POST',
						url: servidor+'/bodega_lodis_movil/procesa_imagenes_app2.php',
						data: formData,
						processData: false,
						contentType: false,
						success: function (result) 
							{
							var obj = JSON.parse(result);
							if (obj.respuesta=='OK')
								{
								var db = window.openDatabase("lodis", "1.0", "lodis DB", 900000); //will create database Dummy_DB or open it
								db.transaction(queryDB2,errorCB2,successCB2);
								function queryDB2(tx)
									{
									tx.executeSql("UPDATE checklist_imagen_cola set estado='PROCESADO' where id='"+id_imagen+"'");
									console.log( "UPDATE IMAGEN OK" );
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
									console.log( "UPDATE ok" );
									}
								/////////////////////////////////////
								
								}
							}
						});



    				};
				});
			if (result.rows.length==0)
				{
				//var photo = document.getElementById('photo');
	          	//photo.src = "img/fondo.jpg";
				//document.getElementById('id_imagen').value='';
				}
			}
		////////////////////////////////////////////////////////////////////////
	}