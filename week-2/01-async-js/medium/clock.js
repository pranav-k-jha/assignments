// let counter = 0;
// function counterClock(){
//     setInterval(function(){
//         counter++;
//         console.log(counter)
//     }, 1000);
// }

// counterClock();

function counterClk(n) {
    function printTime(i) {
      setTimeout(function () {
        const currentTime = new Date();
        const hours12 = (currentTime.getHours() % 12 || 12)
          .toString()
          .padStart(2, "0");
        const minutes12 = currentTime.getMinutes().toString().padStart(2, "0");
        const seconds12 = currentTime.getSeconds().toString().padStart(2, "0");
        const ampm = currentTime.getHours() >= 12 ? "PM" : "AM";
        const formattedTime12 = `${hours12}:${minutes12}:${seconds12} ${ampm}`;
        console.log(formattedTime12);
  
      }, 1000 * i);
    }
  
    for (let i = 1; i < n; i++) {
      printTime(i);
    }
  }
  
  counterClk(1000);
  