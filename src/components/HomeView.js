import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { currencyFormat, ipAddress, med_player_multiplier } from "../AppSettings";
function HomeView() {
    const [gameList, setGameList] = useState(null);
    useEffect(() => {
        async function fetchData() {
            const results = await axios.get(`http://${ipAddress}/games/popular`);
            setGameList(results.data);
        }
        fetchData();
    }, []);
    return (
        gameList &&
        <Container id="HomeView">
            <Row>
                <Col>
                    <Table size="sm" className="popular-game-table" >
                        <tbody>
                            <tr>
                                <td colSpan={2} className="text-med font-weight-bold">Best Selling Games of All-Time</td>
                                <td className="text-center">Estimated Revenue</td>
                                <td className="text-center">Estimated Owners</td>
                            </tr>
                            {gameList.total.map((item) => (
                                <tr className="game-details" key={item.appid}>
                                    <td>
                                        <a href={`/games/${item.appid}`}>
                                            <img className="game-image" src={item.header_image} alt="" />
                                        </a>
                                    </td>
                                    <td>
                                        <a href={`/games/${item.appid}`}>
                                            <div >{item.name}</div>
                                        </a>
                                        <div className="game-price-details">
                                            <span className="game-price-discount">{item.discount_percent !== 0 ? '-' + item.discount_percent + '%' : ''}</span>
                                            <span className="game-price-initial">{item.discount_percent !== 0 ? currencyFormat(item.initial_price) : ''}</span>
                                            <span className="game-price-final">{currencyFormat(item.final_price)}</span>
                                        </div>
                                    </td>
                                    <td className="secondary-data text-center text-med">{currencyFormat(item.total_reviews * item.initial_price * med_player_multiplier)}</td>
                                    <td className="secondary-data text-center text-med">{item.total_reviews * med_player_multiplier}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
                <Col>
                    <Table size="sm" className="popular-game-table">
                        <tbody>
                            <tr>
                                <td colSpan={2} className="text-med font-weight-bold">Recent Best Selling Games</td>
                                <td className="text-center">Estimated Revenue</td>
                                <td className="text-center">Estimated Owners</td>
                            </tr>
                            {gameList.recent.map((item) => (
                                <tr className="game-details" key={item.appid}>
                                    <td>
                                        <a href={`/games/${item.appid}`}>
                                            <img className="game-image" src={item.header_image} alt="" />
                                        </a>
                                    </td>
                                    <td>
                                        <a href={`/games/${item.appid}`}>
                                            <div >{item.name}</div>
                                        </a>
                                        <div className="game-price-details">
                                            <span className="game-price-discount">{item.discount_percent !== 0 ? '-' + item.discount_percent + '%' : ''}</span>
                                            <span className="game-price-initial">{item.discount_percent !== 0 ? currencyFormat(item.initial_price) : ''}</span>
                                            <span className="game-price-final">{currencyFormat(item.final_price)}</span>
                                        </div>
                                    </td>
                                    <td className="secondary-data text-center text-med">{currencyFormat(item.total_reviews * item.initial_price * med_player_multiplier)}</td>
                                    <td className="secondary-data text-center text-med">{item.total_reviews * med_player_multiplier}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row >
        </Container>
    );
}

export default HomeView;