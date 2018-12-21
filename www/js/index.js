function populateDB(tx) {

    tx.executeSql('CREATE TABLE IF NOT EXISTS tache (id, nom, debut, duree)');
}

function errorCB(err) {
    console.log(err);
}

function successCB() {
    console.log("success!");
}

var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
db.transaction(populateDB, errorCB, successCB);

var id = 1;
var nom;
var date;
var duree;

function searchAll(tx)
{
   	tx.executeSql('SELECT * FROM tache;', [], function(tx, result){
       	tache = result.rows;
       	for (i=1; i<tache.length; i++){
       		id = i;
       	}

		db.transaction(insert, errorCB, successCB);
       	console.log(tache);
       	console.log(id);
       	
   	});

}

function insert(tx)
{
   		
    var sql = 'INSERT INTO tache (id, nom, debut, duree) VALUES (' + id + ', "' + nom + '", "' + date + '", "' + duree + '")';
    console.log(sql);
    tx.executeSql(sql);
}

$("#send").click(function(){
	nom = $("#nom").val();
	date = $("#date").val();
	duree = $("#duree").val();

db.transaction(searchAll, errorCB, successCB);
	
	console.log(nom);
	console.log(date);
	console.log(duree);
})

$("#disphtml").click(function(){
	document.location.href="http://localhost:8000/disp.html";
})

$("#refresh").click(function dletedb(tx){
	tx.executeSql('DROP TABLE IF EXIST tache');
})

function dispAll(tx)
{
   	tx.executeSql('SELECT * FROM tache;', [], function(tx, result){
       	tache = result.rows;
       	console.log(tache);
       	for (i=0; i<tache.length; i++) {
       		
	       	$("#table").append("<tr>"+
	       		"<th scope='col'>" + tache[i].id + "</th>"+
	       		"<td scope='col'>" + tache[i].nom + "</td>"+
	       		"<td scope='col'>" + tache[i].debut + "</td>"+
	       		"<td scope='col'>" + tache[i].duree + "</td>"+
	       		"<td><button class='delete' id='delete"+tache[i].id+"'>delete</button>"+
	       		"<button class='modify' id='modify' >" + 'modify' + "</button>"+
	       		"</td></tr>")
	       	
       	}
   	})

};

function deleteTache(tx)
{
   var sqlDelete = 'DELETE FROM tache WHERE id =' + idToDelete;
   tx.executeSql(sqlDelete);
   db.transaction(dispAll, errorCB, successCB);
}

$("#table").delegate('.delete', 'click', function()
{
   idToDelete = $(this).attr("id");
   idToDelete = parseInt(idToDelete.replace("delete", ""));

   // $(".table").empty();
   db.transaction(deleteTache, errorCB, successCB);
});

db.transaction(dispAll, errorCB, successCB);

