function markStressBg() {
  stress = stress.replace("ъ&#768;", "ѣ");
  stress = stress.replace("Ъ&#768;", "Ѣ");
  alert("in markstressBg(), the current stress is: " + stress);
}

function bulgarianStress(word) {
  word = encodeURIComponent(word); // encode into URL form
  var url = "https://api.allorigins.ml/get?method=raw&url=" + encodeURIComponent("https://rechnik.chitanka.info/w/" + word) + "&callback=?";
  $.get(url, function (data) {
    //document.getElementById("target").value = data;
    var regex = /(?:<span id="name-stressed_[0-9]*">\s*)(.*)(?:\s*<\/span>)/;
    stress = data.match(regex)[1];
    markStressBg();
  });
}

// Bulgarian Cyrillic → Latin
function romanizeBG(input) {
  //alert("bulgarianToLatin() starts");
  var alphabet =  ["а", "б", "в", "г", "д", "е", "ж", "з", "и", "й", "к", "л", "м", "н", "о", "п", "р", "с", "т", "у", "ф", "х", "ц", "ч", "ш", "щ", "ъ", "ь", "ю", "я",
                   "А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "Й", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш", "Щ", "Ъ", "Ь", "Ю", "Я"];
  var latin =     ["a", "b", "v", "g", "d", "e", "ž", "z", "i", "j", "k", "l", "m", "n", "o", "p", "r", "s", "t", "u", "f", "h", "c", "č", "š", "št", "ă", "j", "ju", "ja",
                   "A", "B", "V", "G", "D", "E", "Ž", "Z", "I", "J", "K", "L", "M", "N", "O", "P", "R", "S", "T", "U", "F", "H", "C", "Č", "Š", "Št", "Ă", "J", "Ju", "Ja"];
  var symbols = /[.,\/#!$%\^&\*;:{}=\-_`~() ]/;
  var output = "";

  var words = input.split();


  for (i = 0; i < input.length; i++) {
    var assigned = false;
    for (j = 0; j < alphabet.length; j++) {
      if (!assigned) {
        /*
        if (input[i].toLowerCase() == "ъ") {
          alert("if (input[i].toLowerCase() == 'ъ') starts");
          var wordbegin = i;
          var wordend = i;

          for (j = i; j >= 0; j--) {
            if (input[j-1] == " " || j == 0) {
              alert("if (input[j-1] == ' ' || j == 0) starts");
              wordbegin = j;
              break;
            }
          }
          for (k = i; k < input.length; k++) {
            if (symbols.test(input[k+1])) {
              alert("if (symbols.test(input[k+1])) starts");
              wordend = k;
              break;
            }
          }
          alert("wordbegin = " + wordbegin + ", wordend = " + wordend);
          bulgarianStress(input.substring(wordbegin, wordend+1));
          alert("stress: " + stress);
          alert("output: " + output);
          input.substring(wordbegin, wordend+1) = stress;
          output += latin[j];

        }
        */
        if (input[i] == "Щ" && input[i+1] == input[i+1].toUpperCase()) {
          output += "ŠT";
          assigned = true;
        } else if (input[i] == "Ю" && input[i+1] == input[i+1].toUpperCase()) {
          output += "JU";
          assigned = true;
        } else if (input[i] == "Я" && input[i+1] == input[i+1].toUpperCase()) {
          output += "JA";
          assigned = true;
        } else if (input[i] == alphabet[j]) {
          output += latin[j];
          assigned = true;
        }
      }
    }
    if (!assigned)
      output += input[i];
  }
  return output;
}