
export default function() {
	function formatted(amount: number) {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD'
		}).format(amount);
	}

	return {
        formatted,
    };
}