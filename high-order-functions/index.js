let x = {
  userId: 1,
  amount: 1000,
};

function makePayment(fromAccount, toAccount, sum) {
  if (sum <= 0) {
    throw new Error('Payment sum should not be negative');
  }
  if (fromAccount.amount < sum) {
    throw new Error('not enought money');
  }

  return {
    creditor: {
      userId: fromAccount.userId,
      amount: fromAccount.sum - sum,
    },
    debitor: {
      userId: toAccount.userId,
      amount: toAccount.sum + sum,
    },
  };

  fromAccount;
}

function log(...args) {
  console.log(...args);
}

// function makePaymentWithLog(fromAccount, toAccount, sum) {
//   log('Before:', fromAccount, toAccount, sum);
//   const result = makePayment(fromAccount, toAccount, sum);
//   log('After:', result);
// }

function withLog(fn, ...args) {
  return function(...args) {
    log('before:', ...args);
    const result = fn(...args);
    log('after:', result);
  };
}

const makeRealPayment = withLog(makePayment);

makeRealPayment(
  {
    userId: 1,
    sum: 10000,
  },
  {
    userId: 2,
    sum: 10,
  },
  500,
);
