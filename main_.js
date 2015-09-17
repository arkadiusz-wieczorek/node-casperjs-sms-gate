var casper = require('casper').create({
    verbose: true,
    logLevel: "debug"
});

function submitMessage(selector) {
    document.querySelectorAll(selector)[2].click();
};

var url = "http://sms.priv.pl";

casper.start(url, function() {
    this.emit('page.loaded');
});

casper.on('page.loaded', function() {
    this.echo(this.getTitle());
    this.sendKeys('input[name="number2"]', "370263");
    this.sendKeys('textarea[name="tresc"]', "ytest");
    this.sendKeys('input[name="od"]', "ytest");
    this.emit('send.keys');
});

casper.on('send.keys', function() {
    var index = 75

    this.evaluate(function(index) {
        var sel = document.querySelector('select');
        sel.selectedIndex = index;
        sel.onchange();
    }, index);

    this.emit('submit');
});

casper.on('submit', function() {
    this.evaluate(this.submitMessage, "input[type='submit']");
    console.log('sms sent');

})

casper.run();

//The same DOM solution
//  var val = 726;    
//  document.querySelector('select [value="' + val + '"]').selected = true;
//  document.querySelector('input[name="number2"]').value = 370263
//  document.querySelector('textarea[name="tresc"]').value = "Damn, It works!"
//  document.querySelector('input[name="od"]').value = "Arkadiusz"
//  document.querySelectorAll("input[type='submit']")[2].click();
