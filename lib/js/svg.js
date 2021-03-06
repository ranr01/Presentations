if (!NodeList.prototype.forEach &&  Array.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

Reveal.getSlides().forEach(function(s){
  s.querySelectorAll("object").forEach(function(e) {
    //console.log(e);
    var params;
    params = e.querySelectorAll("param");
    if (e.contentDocument){
      var svg;
      svg = e.contentDocument.documentElement.cloneNode(true)
      //Setting "preserveAspectRatio" for each SVG to scale correctly
      svg.setAttribute("preserveAspectRatio","xMinYMin meet");
      //applying formating according to params
      params.forEach(function(p){
        var svg_e;
        //get svg element with the same id
        svg_e = svg.querySelector("#".concat(p.getAttribute("id")));
        //apply the attributes of the param element to the svg element
        if (svg_e != null){
          var attrs = p.attributes;
          for(var i = attrs.length - 1; i >= 0; i--) {
            if (attrs[i].name!="id")
              svg_e.setAttribute(attrs[i].name, attrs[i].value);
          }
        }
      });
      //replacing object with inline svg
      e.parentElement.replaceChild(svg, e);
    } else {
      console.log("No contentDocument for element:");
      console.log(e);
    }
  });
});
