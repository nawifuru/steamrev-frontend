import { Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { currencyFormat, ipAddress, med_player_multiplier } from "../AppSettings";

function QualityView() {
    const [percentile, setPercentile] = useState(0.5);
    const [percentileLabel, setPercentileLabel] = useState('0.5');
    const [gameList, setGameList] = useState(null);
    useEffect(() => {
        async function fetchData() {
            const results = await axios.get(`http://${ipAddress}/games/quality?percentile=${percentile}`);
            setGameList(results.data);
        }
        fetchData();
    }, [percentile])
    return (
        <Container id="QualityView">
            <Row>
                <div id="quality-viewer-control-container">
                    <h1 className="data">
                        Retrieve games that around the <span className="secondary-data">{percentileLabel}</span>th percentile.
                    </h1>
                    <Form.Range
                        id="quality-viewer-control"
                        type="number"
                        min={0}
                        max={1}
                        step={0.01}
                        defaultValue={0.5}
                        onChange={(e) => setPercentileLabel(e.target.value)}
                        onMouseUp={(e) => setPercentile(e.target.value)}
                    />
                </div>
                {
                    gameList &&
                    <div id="similar-games">
                        <ul id="similar-games-results">
                            {gameList.map((game) => (
                                <li className="similar-games-item" key={game.appid}>
                                    <a href={`/games/${game.appid}`}>
                                        <img src={game.header_image} alt="" />
                                        <p>{game.name}</p>
                                    </a>
                                    <div className="game-price-details">
                                        <span className="game-price-discount">{game.discount_percent !== 0 ? '-' + game.discount_percent + '%' : ''}</span>
                                        <span className="game-price-initial">{game.discount_percent !== 0 ? currencyFormat(game.initial_price) : ''}</span>
                                        <span className="game-price-final">{currencyFormat(game.final_price)}</span>
                                    </div>
                                    <div>Owners: <span className="secondary-data">{game.total_reviews * med_player_multiplier}</span></div>
                                    <div>Revenue: <span className="secondary-data">{currencyFormat(game.total_reviews * game.initial_price * med_player_multiplier)}</span></div>
                                </li>
                            ))}
                        </ul>
                    </div>
                }
            </Row>
        </Container>
    );
}

export default QualityView;