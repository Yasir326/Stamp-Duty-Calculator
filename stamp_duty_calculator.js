const rate = (level, tax) => ({ level, tax });

const brackets = {
  firstTime: [
    rate(300000, 0),
    rate(925000, 0.05),
    rate(1500000, 0.1),
    rate(Infinity, 0.12),
  ],

  returning: [
    rate(125000, 0),
    rate(250000, 0.02),
    rate(925000, 0.05),
    rate(1500000, 0.1),
    rate(Infinity, 0.12),
  ],

  second: [
    rate(125000, 0.03),
    rate(250000, 0.05),
    rate(925000, 0.08),
    rate(1500000, 0.13),
    rate(Infinity, 0.15),
  ],
};

const stampDutyCalc = (price) => ({
  ftb: calculateDuty(price, brackets.firstTime),
  rtb: calculateDuty(price, brackets.returning),
  shb: calculateDuty(price, brackets.second),
});

function calculateDuty(price, brackets) {
  let duty = 0;
  let previousLevel = 0;

  for (const rate of brackets) {
    if (rate.level <= price) {
      duty += (price - previousLevel) * rate.tax;
      previousLevel = rate.level;
    } else {
      return duty + (price - previousLevel) * rate.tax;
    }
  }
}

console.log(stampDutyCalc(1000000));
