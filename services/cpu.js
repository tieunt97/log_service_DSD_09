const os = require('os');

function delta() {
  const cpus = os.cpus();

  return cpus.map(cpu => {
    const { times } = cpu;
    return {
      tick: Object.keys(times)
        .filter(time => time !== 'idle')
        .reduce((tick, time) => {
          tick += times[time];
          return tick;
        }, 0),
      idle: times.idle,
    };
  });
}

let startMeasures = delta();
setInterval(() => {
  const endMeasures = delta();
  let avgPercentageCPU = 0;
  endMeasures.map((end, i) => {
    const percen =
      ((end.tick - startMeasures[i].tick) /
        (end.idle - startMeasures[i].idle)) *
      100;
    avgPercentageCPU += percen;
  });
  global.GLOBAL_CPUS = parseFloat(
    (avgPercentageCPU / endMeasures.length).toFixed(2),
  );

  // logger.info({ avg_cpu: global.GLOBAL_CPUS });

  // reset
  startMeasures = delta();
}, 2000);
