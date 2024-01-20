let counter = 0;
setInterval(function(){
    counter++;
    console.log(counter)
}, 1000);


function counterJs(n) {
    let counter = 0;
  
    function logAfterTimeout(i) {
      setTimeout(function timeout() {
        console.log(i);
        counter =  i;
      }, i * 1000);
    }
  
    for (let i = 0; i < n; i++) {
      logAfterTimeout(i);
    }
  
    // Call setTimeout after the loop
  }
  
  console.log(counterJs(10));
  