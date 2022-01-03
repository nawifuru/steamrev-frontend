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
    ipAddress: '192.168.50.87:5000'
}