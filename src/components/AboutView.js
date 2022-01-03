import { Col, Container, Row } from 'react-bootstrap';
function AboutView() {
    return (
        <Container id="AboutView">
            <Row>
                <Col className="about-column">
                    <h2>SteamRev</h2>
                    <p>SteamRev is a hobby project and is not affiliated with Steam or Valve. All daa is powered by the Steam API.</p>
                    <p>The website is built with the React, Node, Express framework and the data is stored and managed with PostgreSQL.</p>
                    <h2>Technology</h2>
                    <p>
                        The estimated revenue is calculated using the Boxleiter or (NB) method, which uses the reviews of games to approximate the number of owners, and thus the revenue.
                    </p>
                    <p>
                        There might be some games that have missing information, games that are unlisted, etc..
                        Due to rate limitations of the Steam API, the dataset will need around 3 days to be fully updated.
                        Some datasets are also deemed too inaccurate (i.e. games that have lower than 10 reviews), and filtered.
                    </p>
                    <h2>References</h2>
                    <a href="https://newsletter.gamediscover.co/p/how-that-game-sold-on-steam-using">
                        https://newsletter.gamediscover.co/p/how-that-game-sold-on-steam-using
                    </a>
                    <a href="https://www.pcgamesn.com/steam/number-of-copies-sold">
                        https://www.pcgamesn.com/steam/number-of-copies-sold
                    </a>
                </Col>
                <Col className="about-column">
                    <h2>About Me</h2>
                    <p>I am a generalist programmer. This is a little side project of mine to learn more about web development.</p>
                    <p>You can contact me at <a href="mailto:nawifuru1@gmail.com">nawifuru1@gmail.com</a></p>
                </Col>
            </Row>
        </Container>
    );
}

export default AboutView;