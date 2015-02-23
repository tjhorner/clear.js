var http = require("http");
var https = require("https");

function Clear(){
  // This code is inconsistent with the s5 module's.
  // I made this before I made the s5 module. Sorry about that.
  // If you want to make a PR that fixes that, go right ahead.
  this.API_BASE = "clear.codeday.org";

  var getRegionByWebName = function(region, callback){
    https.request({
      method: "GET",
      host: this.API_BASE,
      path: "/api/region/" + region,
      port: 443
    }, function(response) {
      var body = '';
      response.on('data', function(d) {
        body += d;
      });
      response.on('end', function() {
        try{
          callback(JSON.parse(body));
        }catch(e){
          return false;
        }
      });
    }).end();
  }

  var getEventById = function(id, callback){
    https.request({
      method: "GET",
      host: this.API_BASE,
      path: "/api/event/" + id,
      port: 443
    }, function(response) {
      var body = '';
      response.on('data', function(d) {
        body += d;
      });
      response.on('end', function() {
        try{
          callback(JSON.parse(body));
        }catch(e){
          return false;
        }
      });
    }).end();
  }

  var getRegionWebNames = function(callback){
    https.request({
      method: "GET",
      host: this.API_BASE,
      path: "/api/regions",
      port: 443
    }, function(response) {
      var body = '';
      response.on('data', function(d) {
        body += d;
      });
      response.on('end', function() {
        try{
          var parsedJson = JSON.parse(body);
          var regions = [];
          for(var i in parsedJson){
            var region = parsedJson[i];
            if(region){
              regions.push(region.webname);
            }
          }
          callback(regions);
        }catch(e){
          console.error(e);
          return false;
        }
      });
    }).end();
  }

  this.getRegionByWebName = getRegionByWebName;
  this.getEventById = getEventById;
  this.getRegionWebNames = getRegionWebNames;

  return this;
};

module.exports = Clear;