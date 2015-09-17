var casper = require('casper').create({
    verbose: true,
    logLevel: "info"
});
var content_ = casper.cli.args;

function submitMessage(selector) {
    document.querySelectorAll(selector)[2].click();
};

function sendMsg(content) {

    var url = "http://sms.priv.pl";
    casper.start(url, function() {
        this.sendKeys('input[name="number2"]', "370263");
        this.sendKeys('textarea[name="tresc"]', content.toString());
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
};
sendMsg(content_);