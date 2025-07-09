export default class Player {
  constructor(name, times) {
    this.name = name;
    this.times = [];
  }

  recordTime(start, end) {
    const duration = (end - start) / 1000;
    this.times.push(duration);
  }
  
  showStats() {
    let sumTimse = 0;
    this.times.forEach(time => {
      sumTimse += time;
    });
    console.log("sumTimse: ", sumTimse.toFixed(2));

    const average = sumTimse / this.times.length
    console.log("average: ", average.toFixed(2));
  }


}