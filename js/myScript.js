var titulosPeliculas = ['aaazzz','bbbzzz','ccczzz','ddzzzz','eeezzz','fffzzz','gggzzz','hhhzzz','iiizzz','jjjzzz'];
var peliculas =[
	{titulo:'titulo_1',genero:'porno',anio:1951,img:'1.png'},{titulo:'titulo_4',genero:'internacional',anio:1955,img:'4.png'},{titulo:'titulo_7',genero:'toros',anio:1957,img:'9.png'},
	{titulo:'titulo_2',genero:'arte',anio:1952,img:'2.png'},{titulo:'titulo_5',genero:'toros',anio:1956,img:'5.png'},{titulo:'titulo_8',genero:'internacional',anio:1959,img:'8.png'},
	{titulo:'titulo_3',genero:'nacional',anio:1953,img:'3.png'},{titulo:'titulo_6',genero:'nacional',anio:1954,img:'6.png'},{titulo:'titulo_9',genero:'porno',anio:1958,img:'7.png'}
];
var generos = ['porno','arte','nacional','internacional','toros'];

$(document).ready(function(){

	limpiarTablaResultados();
	rellenaComboGeneros($('#genero'),generos);
	$('#loading').hide();

	
	$('[id^="buscar"]').click(function(ev){
		ev.preventDefault();
		$('#loading').show();
		buscar();
	});

});	


function buscar(){
	var searchObj={
		_titulo: stringToBlank($('#titulo').val()),
		_genero: stringToBlank($('#genero :selected').val()),
		_anio: 	stringToBlank($('#anio').val())
	};	

	// realiza la busqueda de inmediato
	//pintarTodasPeliculas(peliculas,searchObj);
	
	// ralentiza la busqueda
	setTimeout(function(){
		pintarTodasPeliculas(peliculas,searchObj);
	},3000);
;	//pintarTodasPeliculas(peliculas,searchObj);
}


function getPeliculasPorFiltro(searchObj){
	var result=null;
	if(searchObj){
		result = peliculas.filter(function(peli){


			return (( searchObj._titulo != '' ) ? (searchObj._titulo==peli.titulo):true ) &&(( searchObj._genero != '' ) ? (searchObj._genero==peli.genero):true) &&(( searchObj._anio != '' ) ? (searchObj._anio==peli.anio):true ) ;
		});
	}
	return result;
}
function stringToBlank(str){
	if(str === null || str === undefined || str ==='')
		return '';
	else
		return str;
}
function pintarTodasPeliculas( no__peliculas,_searchObj){
	limpiarTablaResultados();
	var _peliculas = getPeliculasPorFiltro(_searchObj);
	if(_peliculas){
		var resultados = $('#rowResults');
		for(i in _peliculas){
			resultados.append(	'<div class="col-md-2 col-xs-6 col-sm-3" style="padding-left: 15px;padding-right: 15px;padding-top: 15px;padding-botton: 15px;" >'+
							   	'<img src="./img/'+_peliculas[i].img+'" class="img-rounded miniaturas"><br>'+
							   	_peliculas[i].titulo+'</br>'+
							   	_peliculas[i].genero+'</br>'+
							   	_peliculas[i].anio+'</br>'+
   								'</div>');		
		}
	}
	$('#loading').hide();
}
function limpiarTablaResultados(){
	$('#rowResults').empty();	
}
function rellenaComboGeneros(select,lista){
	if(select && lista){
		select.append( '<option value=""></option>' );
		lista.forEach(function(valor,indice){
			select.append( '<option value="'+valor+'"">' +valor+ '</option>' );
		});
	}
}

