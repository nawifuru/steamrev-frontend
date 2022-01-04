import moment from "moment";
import websiteIcon from "../images/websiteIcon.png";
import steamIcon from "../images/steamIcon.png";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { bigCurrencyFormat, currencyFormat, high_player_multiplier, ipAddress, low_player_multiplier, numberFormat } from "../AppSettings";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import GamesLikeThis from "./sub/GamesLikeThis";
import PercentileChart from "./sub/PercentileChart";
function GameView() {
    const { appid } = useParams();
    const [game, setGame] = useState(null);
    useEffect(() => {
        async function fetchData() {
            const results = await axios.get(`http://${ipAddress}/games/${appid}`);
            setGame(results.data);
        }
        fetchData();
    }, [appid])

    return (
        game &&
        <Container id="GameView">
            <Row>
                <h2>{game.name}</h2>
            </Row>
            <Row className="mb-5">
                <Col sm={6} id="game-details-primary">
                    <img id="game-details-header-image" src={game.header_image} alt=""></img>
                    <div>{game.short_description}</div>
                    <div className="my-3">
                        <Button className="game-redirect-buttons" href={`https://store.steampowered.com/app/${game.steam_appid}`}>
                            <img className="game-redirect-icons" src={steamIcon} alt="" />Store
                        </Button>
                        {
                            game.website &&
                            <Button className="game-redirect-buttons" href={game.website}>
                                <img className="game-redirect-icons" src={websiteIcon} alt="" />
                            </Button>
                        }
                    </div>
                    <Table bordered id="game-details-table">
                        <tbody>
                            <tr>
                                <td>Developers</td>
                                <td>{game.developers}</td>
                            </tr>
                            <tr>
                                <td>Publishers</td>
                                <td>{game.publishers}</td>
                            </tr>
                            <tr>
                                <td>Genres</td>
                                <td>
                                    {game.genres.map(function (item, index) {
                                        return <span key={item}>{(index ? ', ' : '') + item}</span>
                                    })}
                                </td>
                            </tr>
                            <tr>
                                <td>Categories</td>
                                <td>
                                    {game.categories.map(function (item, index) {
                                        return <span key={item}>{(index ? ', ' : '') + item}</span>
                                    })}
                                </td>
                            </tr>
                            <tr>
                                <td>Supported Systems</td>
                                <td>
                                    {game.platforms_windows ? " Windows " : ""}
                                    {game.platforms_mac ? " Mac " : ""}
                                    {game.platforms_linux ? " Linux " : ""}
                                </td>
                            </tr>
                            <tr>
                                <td>Release Date</td>
                                <td>{moment(game.release_date).format('MMMM Do YYYY')}</td>
                            </tr>
                            <tr>
                                <td>Price</td>
                                <td>
                                    <div className="game-price-details">
                                        <span className="game-price-discount">{game.discount_percent !== 0 ? '-' + game.discount_percent + '%' : ''}</span>
                                        <span className="game-price-initial">{game.discount_percent !== 0 ? currencyFormat(game.initial_price) : ''}</span>
                                        <span className="game-price-final">{currencyFormat(game.final_price)}</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col sm={6} id="game-metrics" className="text-center">
                    <h3 className="mb-2"><u id="game-metrics-header">METRICS</u></h3>
                    <Row>
                        <h2 className="data">
                            {numberFormat(game.total_reviews * low_player_multiplier)}
                            {'   ..   '}
                            {numberFormat(game.total_reviews * high_player_multiplier)}
                        </h2>
                        <p><small>Estimated Owners</small></p>
                    </Row>
                    <Row>
                        <h2 className="data">
                            {bigCurrencyFormat(game.total_reviews * game.initial_price * low_player_multiplier)}
                            {'   ..   '}
                            {bigCurrencyFormat(game.total_reviews * game.initial_price * high_player_multiplier)}
                        </h2>
                        <p><small>Estimated Revenue</small></p>
                    </Row>
                    <Row>
                        <div className="px-2">
                            <PercentileChart percentile={game.tier_percentile} />
                            <h2 className="data">{game.tier_percentile?.toFixed(2)}</h2>
                            <p><small><span className="text-uppercase secondary-data">{game.tier}</span> revenue percentile</small></p>
                        </div>
                    </Row>
                    <Row>
                        <div className="px-2">
                            <PercentileChart percentile={game.total_percentile} />
                            <h2 className="data">{game.total_percentile?.toFixed(2)}</h2>
                            <p><small><span className="secondary-data">TOTAL</span> revenue percentile</small></p>
                        </div>
                    </Row>
                </Col>
            </Row >
            <Row>
                <GamesLikeThis percentile={game.total_percentile?.toFixed(2)} />
            </Row>
        </Container >
    );
}

export default GameView;