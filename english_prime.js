/**
 * Functions that aim to help you write in English Prime.
 * For information on English Prime see: http://en.wikipedia.org/wiki/E-Prime
 *
 * Karl Svartholm 2011-01-12
 */


function create_english_prime_helper() {
	
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = english_prime_helper;
	} else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			english_prime_helper();
		}
	}
}

function english_prime_helper() {

	var forbidden_words = ["be", "being", "been", "am", "is", "isn't", "are", "aren't", "was", "wasn't", "were", "weren't",
            "I'm", "you're", "we're", "they're", "he's", "she's", "it's", "there's", "here's", "where's", "how's", "what's", "who's", "that's",
            "ain't", "whatcha"];
            // Nonestandard dialect "hain't" and "yer", not included since they have multiple meanings

	var text = document.body.textContent || document.body.innerText;
	var cleaned_text = text.toLowerCase().replace(/[\.\,\"\:\;\?\-\!\n]/ig, ' ').split(' ');

        var forbidden_words_found = [];
	for (var i in cleaned_text) {
            if (forbidden_words.indexOf(cleaned_text[i]) > -1) {
                forbidden_words_found.push(cleaned_text[i]);
            }
	}

	var score = cleaned_text.length / forbidden_words_found.length;

	/* The style is sort of a hack added for the bookmarklet */
	var html = '<p style="display: block; position: fixed;top: 0;left: 0;color: #999;background: #eee;padding: 0.5em;z-index:10000;"><strong>Score:</strong> ' + score + '<br />'
			+ '<strong>Found ' + forbidden_words_found.length + ' forbidden words out of ' + cleaned_text.length + ' words:</strong> ' + forbidden_words_found + '</p>';

	if (! document.getElementById('english_prime_status')) {
		var english_prime_status = document.createElement('div');
		english_prime_status.setAttribute('id', 'english_prime_status');
		english_prime_status.innerHTML = html;
		document.body.insertBefore(english_prime_status, document.body.firstChild);
	}
	document.getElementById('english_prime_status').innerHTML = html;
}

//english_prime_helper();

// Bookmarklet, tested in Chrome
// javascript:function create_english_prime_helper(){var oldonload=window.onload;if(typeof window.onload!='function'){window.onload=english_prime_helper;}else{window.onload=function(){if(oldonload){oldonload();}english_prime_helper();}}}function english_prime_helper(){var tolerance=3;var forbidden_words=["be","is","am","are","was","were","been","being"];var forbidden_strings=["'s","'m","'re"];var cleaned_text=document.body.innerText.toLowerCase().replace(/[\.\,\"\:\;\?\-\!]/ig,' ').split(' ');var forbidden_words_found=[];for(var i in cleaned_text){if(forbidden_words.indexOf(cleaned_text[i])>-1){forbidden_words_found.push(cleaned_text[i]);}for(var j in forbidden_strings){if(cleaned_text[i].indexOf(forbidden_strings[j])>-1){forbidden_words_found.push(cleaned_text[i]);}}}var score=cleaned_text.length/forbidden_words_found.length;var cssclass="ok";if(forbidden_words_found.length>tolerance){cssclass="error";}/*The style is sort of a hack added for the bookmarklet*/var html='<p style="display:block;position:fixed;top:0;left:0;color:#999;background:#eee;padding:0.5em;z-index:10000;"class="'+cssclass+'"><strong>Score: </strong>'+score+'<br/>'+'<strong>Found  '+forbidden_words_found.length+' forbidden words out of '+cleaned_text.length+' words: </strong>'+forbidden_words_found+'</p>';if(!document.getElementById('english_prime_status')){var english_prime_status=document.createElement('div');english_prime_status.setAttribute('id','english_prime_status');english_prime_status.innerHTML=html;document.body.insertBefore(english_prime_status,document.body.firstChild);}document.getElementById('english_prime_status').innerHTML=html;}english_prime_helper();
