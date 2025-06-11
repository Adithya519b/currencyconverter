let from = document.getElementById("from");
let to = document.getElementById("to");
let get = document.getElementById("get");
let result = document.getElementById("result");
let amountInput = document.getElementById("amount");

let exrates = {};

fetch("https://v6.exchangerate-api.com/v6/61861e52bb9fa5f13be1af81/latest/USD")
  .then(response => response.json())
  .then(data => {
    exrates = data.conversion_rates;

    for (let currency in exrates) {
      const option1 = document.createElement('option');
      const option2 = document.createElement('option');
      option1.text = option2.text = currency;
      option1.value = option2.value = currency;
      from.appendChild(option1);
      to.appendChild(option2);
    }

    from.value = "USD";
    to.value = "INR";
  });

function convert() {
  const amount = parseFloat(amountInput.value);
  if (isNaN(amount)) {
    result.innerText = "Please enter a valid amount.";
    return;
  }

  const fromCurrency = from.value;
  const toCurrency = to.value;

  fetch(`https://v6.exchangerate-api.com/v6/61861e52bb9fa5f13be1af81/latest/${fromCurrency}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.conversion_rates[toCurrency];
      const convertedAmount = amount * rate;
      result.innerText = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    })
    .catch(err => {
      result.innerText = "Error fetching conversion rate.";
      console.error(err);
    });
    console.log(fromCurrency, toCurrency, amount);

}

get.addEventListener("click", convert);
