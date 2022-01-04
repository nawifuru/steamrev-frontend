module.exports = {
    low_player_multiplier: 40,
    med_player_multiplier: 50,
    high_player_multiplier: 60,
    currencyFormat: function (value) {
        const formatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        });
        value = formatter.format(value / 100)
        return value;
    },
    bigCurrencyFormat: function (value) {
        const formatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0
        });
        value = formatter.format((value / 100).toFixed(0));
        return value;
    },
    numberFormat: function (value) {
        const formatter = new Intl.NumberFormat("en-US", {
        });
        value = formatter.format(value);
        return value;
    },
    ipAddress: '192.168.50.87:5000'
}