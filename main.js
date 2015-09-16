var casper = require('casper').create({
    verbose: true,
    logLevel: "info"
});

function submitMessage(selector) {
    document.querySelectorAll(selector)[2].click();
};

var url = "http://sms.priv.pl";
casper.start(url, function() {
    this.sendKeys('input[name="number2"]', "370263");
    this.sendKeys('textarea[name="tresc"]', "Damn, It works!");
    this.sendKeys('input[name="od"]', "Arkadiusz");
});

casper.then(function() {
    var index = 75

    this.evaluate(function(index) {
        var sel = document.querySelector('select');
        sel.selectedIndex = index;
        sel.onchange();
    }, index);

    this.evaluate(submitMessage, "input[type='submit']");
    console.log('sms sent');
})

casper.run();

//The same DOM solution
//  var val = 726;    
//  document.querySelector('select [value="' + val + '"]').selected = true;
//  document.querySelector('input[name="number2"]').value = 370263
//  document.querySelector('textarea[name="tresc"]').value = "Damn, It works!"
//  document.querySelector('input[name="od"]').value = "Arkadiusz"
//  document.querySelectorAll("input[type='submit']")[1].click();