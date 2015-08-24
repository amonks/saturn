this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};
this["Handlebars"]["templates"]["analysis"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<h3>\n  <span class='badge'>"
    + alias3(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"count","hash":{},"data":data}) : helper)))
    + "</span> "
    + alias3(((helper = (helper = helpers.tag || (depth0 != null ? depth0.tag : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"tag","hash":{},"data":data}) : helper)))
    + "\n</h3>\n<div class=\"progress\">\n  <div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\""
    + alias3(((helper = (helper = helpers.percentage || (depth0 != null ? depth0.percentage : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"percentage","hash":{},"data":data}) : helper)))
    + "\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: "
    + alias3(((helper = (helper = helpers.percentage || (depth0 != null ? depth0.percentage : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"percentage","hash":{},"data":data}) : helper)))
    + "%;\">\n    "
    + alias3(((helper = (helper = helpers.percentage || (depth0 != null ? depth0.percentage : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"percentage","hash":{},"data":data}) : helper)))
    + "%\n  </div>\n</div>\n";
},"useData":true});
this["Handlebars"]["templates"]["form"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<form id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"tag-form form-inline\">\n  <div class=\"form-group\">\n    <label for=\"tag\">What r u doing?</label>\n    <input type=\"text\" name=\"tag\" class=\"form-control tag\" placeholder=\"hangin\">\n  </div>\n  <input type=\"hidden\" class=\"form-control timestamp\" name=\"timestamp\" value=\""
    + alias3(((helper = (helper = helpers.timestamp || (depth0 != null ? depth0.timestamp : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"timestamp","hash":{},"data":data}) : helper)))
    + "\">\n  <input type=\"submit\" class=\"btn btn-default\" name=\"submit\" value=\"Submit\">\n</form>\n";
},"useData":true});
this["Handlebars"]["templates"]["row"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<tr>\n  <th scope='row'>"
    + alias3(((helper = (helper = helpers.tag || (depth0 != null ? depth0.tag : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"tag","hash":{},"data":data}) : helper)))
    + "</th>\n  <td>"
    + alias3(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"count","hash":{},"data":data}) : helper)))
    + "</td>\n  <td>\n    <div class=\"progress\">\n      <div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\""
    + alias3(((helper = (helper = helpers.percentage || (depth0 != null ? depth0.percentage : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"percentage","hash":{},"data":data}) : helper)))
    + "\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"background-image: none; background-color: "
    + alias3(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"color","hash":{},"data":data}) : helper)))
    + "; width: "
    + alias3(((helper = (helper = helpers.percentage || (depth0 != null ? depth0.percentage : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"percentage","hash":{},"data":data}) : helper)))
    + "%;\">\n        "
    + alias3(((helper = (helper = helpers.percentage || (depth0 != null ? depth0.percentage : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"percentage","hash":{},"data":data}) : helper)))
    + "%\n      </div>\n    </div>\n  </td>\n</tr>\n";
},"useData":true});