function sleep(milliseconds) {
    const start = Date.now();
    while (Date.now() - start < milliseconds);
  }

window.onload = function (){
    $('.lds-roller').show();

    sleep(1750);
    $('.lds-roller').hide();
    $('.divs').show();
};