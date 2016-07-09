ar formidable = require('formidable');
var http = require('http');
var util = require('util');
var fs = require('fs');
var os = require('os');
var multer = require('multer');
//var encoding = require('encoding');
var app = http.createServer(
 function(req, res){
  switch(req.method){
   case 'GET':
    showPage(req, res);
    break;
   case 'POST':
    upload(req, res);
    break;
  }
 }
);
app.listen(1919);

//Display my IP
var networkInterfaces=os.networkInterfaces();

for (var interface in networkInterfaces) {

    networkInterfaces[interface].forEach(
        function(details){

            if (details.family=='IPv4'&& details.internal==false) {
                    console.log(interface, details.address);
           }
    });
}

function showPage(req, res){
 fs.readFile(__dirname + '/index.html',
  function (err, data) {
   if (err) {
    res.writeHead(500);
    return res.end('Error loading index.html');
   }

   res.writeHead(200);
   res.end(data);
  });
}


function upload(req, res){

 var form = new formidable.IncomingForm();

 var temp;
  form.parse(req, function(err, fields, files) {
  res.writeHead(200, {'content-type': 'text/plain'});
  res.end('File uploaded!');
  console.log("A"+"Upload completed");
  var x = util.inspect(files);
  console.log("B"+x);
  //var obj = eval("(" + x + ')');
  var s = x.indexOf("path");
  var e = x.indexOf("name");
  console.log("S"+s);
  console.log("E"+e);
  var o = x.substring(s,e);
  console.log("OO"+o);
  var p = o.substring(7,(o.length-6));
  console.log("P"+p);
  var y = p.indexOf(",");
  console.log(y);
  var result = p.substring(0,y-1);
  console.log("PA"+result);
  var path =  result;

var WebHDFS = require('webhdfs');

var hdfs = WebHDFS.createClient({
  user: 'hdfs', // Hadoop user
  host: 'sandbox.hortonworks.com', // Namenode host
  port: 50070, // Namenode port
  path: '/webhdfs/v1'
});

var syncExec = require('sync-exec');
var pointPath = path.substring(path.indexOf("tmp"),path.length);
console.log("PoitnPath"+pointPath);
console.log(syncExec('hadoop fs -put /'+pointPath+' /user/tem/server/'+pointPath));


console.log(syncExec('spark-submit splitthai.py -o hdfs:///user/big/output/'+pointPath));
console.log("4");

var data = [];
var FileStream = hdfs.createReadStream('/user/big/output/'+pointPath+'/part-00000');
console.log("FileStream"+FileStream);

FileStream.on('error', function onError (err) {
  console.log("Err+TME"+err);
});

FileStream.on('data', function onChunk (chunk) {
  console.log("data"+chunk);
  data.push(chunk);
  console.log("ISUS"+data);
  //console.log("HTTP");
 // var http = require('http');

 // http.createServer(function(req, res){
  //	  res.writeHead(200, {'content-type':'text/plain'});
    //     console.log("TEM"+data);
      //   res.end(chunk);
 // }).listen(1920);

});

//console.log("TT"+data);

FileStream.on('finish', function onFinish () {
  console.log("Finish-Iwant");
  console.log("Data"+data);
  //var http = require('http');
  var encoding = require("encoding");
  http.createServer(function(req,res){
        res.writeHead(200, {'content-type':'text/plain'});
        var se = String(data).split(")\n");
        var V = [];
        var F = [];
        var ty = [];
        for(var i=0 ; i<se.length ; i++){
                var g = (se[i].split(","))[0];
                var h = g.substring(3,g.length-1);
                var f = "\'"+h+"\'";
                V[i] = String(f);
                var ff = V[i];
                console.log("p"+ff);
                var buffer = encoding.convert(ff,'utf-8','ASCII');
                console.log("s"+buffer);
                F[i] = (se[i].split(","))[1];
                ty[i]= "V"+buffer+"---"+"F"+F[i]+"\n";
        }
	var u = '\u0e19\u0e34\u0e15\u0e34\u0e28\u0e32\u0e2a\u0e15\u0e23\u0e4c6\u0e19\u0e32\u0e22';
        var yy = "";
         for(var j=0 ; j<se.length ; j++){
                var temp = ty[j];
                console.log("temp1"+temp);
                encoding.convert(temp,'utf-8','ASCII');
                console.log("temp2"+temp);
                yy+=temp;
        }
	encoding.convert(u,'utf-8','ASCII');
        console.log("end"+u);
        res.end(yy);
  }).listen(1920);
});

console.log("THONGLEK"+data);


 });

 console.log("completed!!");
 console.log("T"+temp);
}
