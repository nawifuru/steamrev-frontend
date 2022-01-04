import { Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { bigCurrencyFormat, currencyFormat, ipAddress, med_player_multiplier } from "../AppSettings";
import { motion, useAnimation } from "framer-motion";
import PercentileChart from "./sub/PercentileChart";

function QualityView() {
    const [percentile, setPercentile] = useState(0.5);
    const [percentileLabel, setPercentileLabel] = useState('0.5');
    const [gameList, setGameList] = useState(null);
    const controls = useAnimation();

    useEffect(() => {
        async function fetchData() {
            await controls.start({
                opacity: 0
            })
            const results = await axios.get(`http://${ipAddress}/games/quality?percentile=${percentile}`);
            setGameList(results.data);
            await controls.start({
                opacity: 1
            })
        }
        fetchData();
    }, [percentile, controls]);

    const handleChangePercentile = (e) => {
        setPercentile(e.target.value);
    }
    return (
        <Container id="QualityView">
            <Row>
                <div id="quality-viewer-control-container">
                    <div className="data">
                        <h1>
                            Retrieve games that around the
                        </h1>
                        <div className="secondary-data">
                            <PercentileChart percentile={percentileLabel} />
                            <h1>{percentileLabel}</h1>
                            <small>percentile</small>
                        </div>
                    </div>
                    <Form.Range
                        id="quality-viewer-control"
                        type="number"
                        min={0}
                        max={1}
                        step={0.01}
                        defaultValue={0.5}
                        onChange={(e) => setPercentileLabel(e.target.value)}
                        onMouseUp={(e) => handleChangePercentile(e)}
                    />
                </div>
                {
                    gameList &&
                    <motion.div
                        id="similar-games"
                        animate={controls}
                    >
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
                                    <div className="game-price-secondary-details">
                                        <div>Owners: <span className="secondary-data">{game.total_reviews * med_player_multiplier}</span></div>
                                        <div>Revenue: <span className="secondary-data">{bigCurrencyFormat(game.total_reviews * game.initial_price * med_player_multiplier)}</span></div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                }
            </Row>
        </Container>
    );
}

export default QualityView;