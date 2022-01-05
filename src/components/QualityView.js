import { Container, Row } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { bigCurrencyFormat, currencyFormat, ipAddress, med_player_multiplier, numberFormat } from "../AppSettings";
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
            const results = await axios.get(`${ipAddress}/games/quality?percentile=${percentile}`);
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
                    <div>
                        <h1>Retrieve games from</h1>
                        <div className="secondary-data">
                            <PercentileChart percentile={percentileLabel} />
                            <h1>{percentileLabel}<small>th</small></h1>
                            <span>percentile</span>
                        </div>
                    </div>
                    <div className="slider-container">
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.01}
                            defaultValue={0.5}
                            className="slider"
                            onChange={(e) => setPercentileLabel(e.target.value)}
                            onMouseUp={(e) => handleChangePercentile(e)}
                        />
                    </div>
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
                                        <motion.img whileHover={{ scale: 1.05 }} src={game.header_image} alt="" />
                                        <div>{game.name}</div>
                                    </a>
                                    <div className="game-price-details">
                                        <span className="game-price-discount">{game.discount_percent !== 0 ? '-' + game.discount_percent + '%' : ''}</span>
                                        <span className="game-price-initial">{game.discount_percent !== 0 ? currencyFormat(game.initial_price) : ''}</span>
                                        <span className="game-price-final">{currencyFormat(game.final_price)}</span>
                                    </div>
                                    <div className="game-price-secondary-details">
                                        <div>Owners: <span className="secondary-data">{numberFormat(game.total_reviews * med_player_multiplier)}</span></div>
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