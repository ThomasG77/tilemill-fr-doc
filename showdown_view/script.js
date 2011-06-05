//Accents
// Remplace toutes les occurences d'une chaine
function replaceAll(str, search, repl) {
 while (str.indexOf(search) != -1)
  str = str.replace(search, repl);
 return str;
}

// Remplace les caractères accentués
function AccentToNoAccent(str) {
 var norm = new Array('À','Á','Â','Ã','Ä','Å','Æ','Ç','È','É','Ê','Ë',
'Ì','Í','Î','Ï', 'Ð','Ñ','Ò','Ó','Ô','Õ','Ö','Ø','Ù','Ú','Û','Ü','Ý',
'Þ','ß', 'à','á','â','ã','ä','å','æ','ç','è','é','ê','ë','ì','í','î',
'ï','ð','ñ', 'ò','ó','ô','õ','ö','ø','ù','ú','û','ü','ý','ý','þ','ÿ');
var spec = new Array('A','A','A','A','A','A','A','C','E','E','E','E',
'I','I','I','I', 'D','N','O','O','O','0','O','O','U','U','U','U','Y',
'b','s', 'a','a','a','a','a','a','a','c','e','e','e','e','i','i','i',
'i','d','n', 'o','o','o','o','o','o','u','u','u','u','y','y','b','y');
 for (var i = 0; i < spec.length; i++) {
  str = replaceAll(str, norm[i], spec[i]);
 }
 return str;
 }


// Application bootstrap.
$(function() {
    // Convert any markdown sections to HTML.
    $('.md').each(function() {
        var html = $('<div></div>')
            .html((new Showdown.converter()).makeHtml($(this).html()))
            .attr('class', $(this).attr('class'))
            .attr('id', $(this).attr('id'));
        $(this).hide().after(html);
        $('h1, h2, h3, h4, h5, h6', html).each(function() {
            var cleaned = AccentToNoAccent($(this).text()).replace(/[\s\W]+/g, '-').toLowerCase();

            $(this).attr('id', cleaned);
        });
    });

});

