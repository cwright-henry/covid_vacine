const number0 = new Intl.NumberFormat(navigator.language, { maximumFractionDigits: 0, minimumFractionDigits: 0 });
const number2 = new Intl.NumberFormat(navigator.language, { maximumFractionDigits: 2, minimumFractionDigits: 2 });

export const numberFormat = (value, precision) => {
	if (window) {
		if (window != null && window.Intl && value !== null && !isNaN(value)) {
			precision = precision !== undefined ? precision : 0;
			switch (precision) {
				case 0:
					return number0.format(value);
				case 2:
					return number2.format(value);
				default:
					return new Intl.NumberFormat(navigator.language, { maximumFractionDigits: precision, minimumFractionDigits: precision }).format(value);

			}
		}
	}
	return value;
}