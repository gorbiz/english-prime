/**
 * Functions that aim to help you write in English Prime.
 * For information on English Prime see:
 * http://en.wikipedia.org/wiki/E-Prime
 *
 * To use it include this in yor html file:
 * <script type="text/javascript" src="english_prime.js"></script>
 * <script type="text/javascript">create_english_prime_helper();</script>
 * To use this as a bookmarklet, add 'javascript:' to the begining of the file
 * and 'create_english_prime_helper();' to the end of the file,
 * then compress the whole thing to one single line and add it as a bookmark.
 *
 * Karl Svartholm of PassionIsMandatory.com 2011-01-14
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

	var text = document.body.textContent || document.body.innerText;
	var forbidden_words_found = find_forbidden_words(text);
	var all_words = get_text_as_list_of_words(text);
	var score = all_words.length / forbidden_words_found.length;

	/* The style is sort of a hack added for the bookmarklet */
	var html = '<p style="display: block; position: fixed;top: 0;left: 0;color: #999;background: #eee;padding: 0.5em;z-index:10000;"><strong>Score:</strong> ' + score + '<br />'
			+ '<strong>Found ' + forbidden_words_found.length + ' forbidden words out of ' + all_words.length + ' words:</strong> ' + forbidden_words_found + '</p>';

	if (! document.getElementById('english_prime_status')) {
		var english_prime_status = document.createElement('div');
		english_prime_status.setAttribute('id', 'english_prime_status');
		english_prime_status.innerHTML = html;
		document.body.insertBefore(english_prime_status, document.body.firstChild);
	}
	document.getElementById('english_prime_status').innerHTML = html;
}

function find_forbidden_words(text) {

    // The words was taken from http://en.wikipedia.org/wiki/E-Prime
    var forbidden_words = ["be", "being", "been", "am", "is", "isn't", "are", "aren't", "was", "wasn't", "were", "weren't",
	"I'm", "you're", "we're", "they're", "he's", "she's", "it's", "there's", "here's", "where's", "how's", "what's", "who's", "that's",
	"ain't", "whatcha"];
    // Nonestandard dialect "hain't" and "yer", not included since they have multiple meanings

    var all_words = get_text_as_list_of_words(text);

    var forbidden_words_found = [];
    for (var i in all_words) {
	if (forbidden_words.indexOf(all_words[i]) > -1) {
	    forbidden_words_found.push(all_words[i]);
	}
    }
    return forbidden_words_found;
}

function get_text_as_list_of_words(text) {
    return text.toLowerCase().replace(/[\.\,\"\:\;\?\-\!\n]/ig, ' ').split(' ');
}
