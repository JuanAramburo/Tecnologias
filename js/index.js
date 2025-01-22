fetch('/html/partials/head.html')
.then(Response=>Response.text ())
.then(data=>document.getElementById('head_contenido').innerHTML=data);

fetch('/html/partials/header.html')
.then(Response=>Response.text ())
.then(data=>document.getElementById('header_contenido').innerHTML=data);

fetch('/html/partials/footer.html')
.then(Response=>Response.text ())
.then(data=>document.getElementById('footer_contenido').innerHTML=data);