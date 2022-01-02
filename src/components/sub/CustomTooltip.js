import { currencyFormat, med_player_multiplier } from "../../AppSettings";

function CustomToolTip(props) {
    if (props.active) {
        return (
            <div>
                <p>{`${props.toolTipLabel}: ${props.toolTipType === "currency" ? currencyFormat(props.label) : props.label}`}</p>
                <p>{`Median Amount of Reviews: ${props.payload[0].value}`}</p>
                <p>{`Estimated Median Amount of Players: ${props.payload[0].value * med_player_multiplier}`}</p>
            </div>
        );
    }
    return null;
}

export default CustomToolTip;