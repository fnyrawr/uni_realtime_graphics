/*
 * This is app.js which is referenced directly from within
 * a <script> tag in index.html
 */

// When the window is completely loaded, the browser will execute all registered listeners.
window.addEventListener('load', function (){

    console.log('window is loaded');
    console.log('execute the main function');

    main();
});


// this shall be the function that generates a new path object
var makePath = function(s) {
    // if spacer is given use spacer, otherwise use whitespace as spacer between given values
    let spacer = s ? s : "";
    let path = "";
    function appendToPath(optional) {
        if(optional) {
            path += optional + spacer;
        }
        return path.slice(0, path.length - spacer.length);
    }
    return appendToPath
};


// the main() function is called when the HTML document is loaded
var main = function() {

    console.log('%c Hi, i\'m good!', 'color: green');

    /*--- first example ---*/

    var path1 = makePath();

    path1('A'); 
    path1('B'); 
    path1('C');

    console.log('path 1 is ' + path1());

    var path2 = makePath(' --> ');
    path2('Berlin');
    path2('München');
    path2('Frankfurt');

    console.log('path 2 is ' + path2());

    /*--- second example ---*/

    console.log('Hi.');
    
    // sets a timeout and calls the callback function
    // after the timeout. the callback delay is 0(!) milliseconds
    setTimeout(function callback() {
        console.log('Hmm?');
    }, 0);

    console.log('Bye.');

};
