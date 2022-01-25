export const convertMoney = (amount) => {
  if (!amount) {
    return '$' + 0;
  }

  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}
