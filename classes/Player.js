export default class Player {
  constructor(name) {
    this.name = name;
    this.times = [];
  }

  recordTime(start, end) {
    const duration = (end - start) / 1000;
    this.times.push(duration);
  }

  getStats() {
    const sumTime = this.times.reduce((a, b) => a + b, 0);
    const average = sumTime / this.times.length;
    return {
      totalTime: sumTime.toFixed(2),
      averageTime: average.toFixed(2)
    };
  }
}
