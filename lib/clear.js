var unirest = require("unirest");

function Clear(token, secret){
  API_BASE = "https://clear.codeday.org/api/";

  token = token || "";
  secret = secret || "";

  var get = function(endpoint, params, callback){
    // ensure the token and secret are always sent
    params["token"] = token;
    params["secret"] = secret;

    unirest.get(API_BASE + endpoint)
    .query(params)
    .end(function(res) {
      if (res.error) {
        // console.log(res.error);
        callback({});
      } else {
        var response = res.body;
        if(typeof(res.body) !== "object") response = JSON.parse(res.body);
        callback(response);
      }
    });
  };

  var getRegionByWebName = function(region, callback){
    get("region/" + region, {}, callback);
  }

  var getEventById = function(id, callback){
    get("event/" + id, {}, callback);
  }

  var getRegions = function(callback){
    get("regions", {}, callback);
  }

  this.getRegionByWebName = getRegionByWebName;
  this.getEventById = getEventById;
  this.getRegions = getRegions;

  this.getRegionWebNames = function(){console.error("This function is deprecated, please use getRegions instead.");return [];};

  return this;
};

module.exports = Clear;
