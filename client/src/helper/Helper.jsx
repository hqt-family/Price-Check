export function moneyVND(money) {
  let result = money
    .toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    })
    .replace(/\sVND/g, "₫");
  return result;
}

export function moneyUSD(money) {
  let result = money.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  return result;
}

export function comparePrice(money1, money2) {
  let result = "";
  if (money1 > money2) {
    result += "Cao hơn ";
  } else {
    result += "Rẻ hơn ";
  }
  result += moneyVND(money1 - money2).replace("-", "");
  return result;
}
