import axios from "axios";
import { useEffect, useState } from "react";
import { bigCurrencyFormat, currencyFormat, ipAddress, med_player_multiplier } from "../../AppSettings";

function GamesLikeThis(props) {
    const [gameList, setGameList] = useState(null);
    const percentile = props.percentile;
    useEffect(() => {
        async function fetchData() {
            const results = await axios.get(`http://${ipAddress}/games/quality?percentile=${percentile}`);
            setGameList(results.data);
        }
        fetchData();
    }, [percentile])
    return (
        gameList &&
        <div id="similar-games">
            <h1>Similar Games based on Revenue Percentile</h1>
            <ul id="similar-games-results">
                {gameList.map((game) => (
                    <li className="similar-games-item" key={game.appid}>
                        <a href={`/games/${game.appid}`}>
                            <img src={game.header_image} alt="" />
                            <div>{game.name}</div>
                        </a>
                        <div className="game-price-details">
                            <span className="game-price-discount">{game.discount_percent !== 0 ? '-' + game.discount_percent + '%' : ''}</span>
                            <span className="game-price-initial">{game.discount_percent !== 0 ? currencyFormat(game.initial_price) : ''}</span>
                            <span className="game-price-final">{currencyFormat(game.final_price)}</span>
                        </div>
                        <div>Owners: <span className="secondary-data">{game.total_reviews * med_player_multiplier}</span></div>
                        <div>Revenue: <span className="secondary-data">{bigCurrencyFormat(game.total_reviews * game.initial_price * med_player_multiplier)}</span></div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GamesLikeThis;