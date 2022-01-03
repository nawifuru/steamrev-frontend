import { Col, Container, Row } from 'react-bootstrap';
import githubLogo from '../images/githubLogo.png';
import linkedinLogo from '../images/linkedinLogo.png'
function Footer() {
    return (
        <Container id="Footer">
            <Row>
                <Col sm={6}>
                    <span>
                        SteamRev is a hobby project and is not affiliated with Steam or Valve. The website is built with the React framework and powered by the Steam API.
                    </span>
                </Col>
                <Col sm={6}>
                    <div id="footer-logos">
                        <a href="https://github.com/">
                            <img className="external-logos" src={githubLogo} alt="" />
                        </a>
                        <a href="https://www.linkedin.com/">
                            <img className="external-logos" src={linkedinLogo} alt="" />
                        </a>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Footer;