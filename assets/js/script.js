const fetchCurrencies = () => {
  fetch("https://free.currencyconverterapi.com/api/v5/currencies")
  .then(res => res.json())
  .then(res => Object.values(res.results))
  .then(result => render(result))
  .catch(err => console.log(err));
};

window.onload = fetchCurrencies;

const render = (data) => {
  const currencyInputFrom = document.getElementById("is-currency1");
  const currencyInputTo = document.getElementById("is-currency2");
  data.map(currency => {
    const option = document.createElement('option');
    option.value = currency.id;
    option.text = currency.id;
    currencyInputFrom.options.add(option);
  });
  data.map(currency => {
    const option = document.createElement('option');
    option.value = currency.id;
    option.text = currency.id;
    currencyInputTo.options.add(option);
  });
}

const convertButton = document.getElementById('is-btn');
convertButton.addEventListener('click',
	() => {
	  const currencyInputFrom = document.getElementById("is-currency1");
	  const currencyInputTo = document.getElementById("is-currency2");
	  const inputValue = document.getElementById("is-amt");
	  const outputValue = document.getElementById("is-converted");
	  const button = document.getElementById("is-submit");
	  const convertFrom = currencyInputFrom.value;
	  const convertTo = currencyInputTo.value;

	  convertButton.innerText = "converting...";
	        fetch(
	        `https://free.currencyconverterapi.com/api/v5/convert?q=${convertFrom}_${convertTo}&compact=ultra`
	      )
	        .then(res => res.json())
	        .then(res => {
	          console.log(res);
	          return res;
	        })
	        .then(res => {
	          const result = res;
	          const key = `${convertFrom}_${convertTo}`;
	          const convert = result[key] * inputValue.value;
	          outputValue.innerText = convert.toFixed(0);
	          convertButton.innerText = "convert again";

	        })
	        .catch(err => {
	          convertButton.innerText = "convert again";
	          console.log(err);
	        });
	}
	, false
);

const selectedCurrency = document.getElementById("is-currency2");
selectedCurrency.addEventListener('change', 
	() => {
		const currencyCode = document.getElementById("is-currency-code");
		currencyCode.innerText = selectedCurrency.options[selectedCurrency.selectedIndex].text;
	}
, false)