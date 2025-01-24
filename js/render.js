(function () {

  let url = new URL(window.location.href);
  let searchParams = new URLSearchParams(url.search);
  if (searchParams.get('c')) { var path = "notes/" + searchParams.get('c') };
  var file = path || "notes/README.md";
  var reader = new stmd.DocParser();
  var writer = new stmd.HtmlRenderer();
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if(xhr.readyState === 4 && xhr.status === 200) {
      display(xhr);
    }
  };

  function display(xhr) {
    var clean = xhr.responseText.replace(/\[\[.*\]\]/g, '');
    var parsed = reader.parse(clean);
    var content = writer.renderBlock(parsed);
    
    document.getElementsByTagName('body')[0].innerHTML = content;
    
    /* try to extract h1 title and use as title for page
       if no h1, use name of file 
    */
    try {
      document.title = document.querySelector('h1').textContent
    } catch (e) {
      document.title = file;
    }
  }

  xhr.open('GET', file);
  xhr.send();
})();

