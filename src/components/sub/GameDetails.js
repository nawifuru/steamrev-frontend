import moment from "moment";
import websiteIcon from "../../images/websiteIcon.png";
import steamIcon from "../../images/steamIcon.png";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { currencyFormat, high_player_multiplier, low_player_multiplier } from "../../AppSettings";
function GameDetails(props) {
    const game = props.selectedGame;
    return (
        game &&
        <Container id="game-container">
            <Row>
                <h2>{game.name}</h2>
            </Row>
            <Row id="game-details">
                <Col id="game-details-primary">
                    <img id="game-details-header-image" src={game.header_image} alt=""></img>
                    <p>{game.short_description}</p>
                    <div>
                        <Button className="game-redirect-buttons" href={`https://store.steampowered.com/app/${game.steam_appid}`}>
                            <img className="game-redirect-icons" src={steamIcon} alt="" />Store
                        </Button>
                        <Button className="game-redirect-buttons" href={game.website}>
                            <img className="game-redirect-icons" src={websiteIcon} alt="" />
                        </Button>
                    </div>
                </Col>
                <Col id="game-details-secondary">

                    <Table bordered id="game-details-secondary-table">
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
                                        return <span>{(index ? ', ' : '') + item}</span>
                                    })}
                                </td>
                            </tr>
                            <tr>
                                <td>Categories</td>
                                <td>
                                    {game.categories.map(function (item, index) {
                                        return <span>{(index ? ', ' : '') + item}</span>
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
            </Row>
            <Row id="game-metrics">
                <Col>
                    <h2 className="data">
                        {game.total_reviews * low_player_multiplier}
                        ..
                        {game.total_reviews * high_player_multiplier}
                    </h2>
                    <p><small>Estimated Owners</small></p>
                </Col>
                <Col>
                    <h2 className="data">
                        {currencyFormat(game.total_reviews * game.initial_price * low_player_multiplier)}
                        ..
                        {currencyFormat(game.total_reviews * game.initial_price * high_player_multiplier)}
                    </h2>
                    <p><small>Estimated Revenue</small></p>
                </Col>
                <Col>
                    <div id="game-metrics-percentile">
                        <div className="px-2">
                            <h2 className="data">{game.tier_percentile?.toFixed(2)}</h2>
                            <p><small><span className="text-uppercase secondary-data">{game.tier}</span> revenue percentile</small></p>
                        </div>
                        <div className="px-2">
                            <h2 className="data">{game.total_percentile?.toFixed(2)}</h2>
                            <p><small><span className="secondary-data">TOTAL</span> revenue percentile</small></p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default GameDetails;