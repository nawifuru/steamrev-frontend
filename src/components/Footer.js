import { Col, Container, Row } from 'react-bootstrap';
import githubLogo from '../images/githubLogo.png';
import linkedinLogo from '../images/linkedinLogo.png'
function Footer() {
    return (
        <Container id="Footer">
            <Row>
                <Col sm={6}>
                    <a className="navigation-links" href="/about">{'FAQ & Help'}</a>
                    <small>
                        <p>
                            SteamRev is a hobby project and is not affiliated with Steam or Valve.
                            Steam and the Steam logo are trademarks of Valve Corporation. All other trademarks are property of their respective owners.
                        </p>
                        <p>The website is built with the React framework and powered by the Steam API.</p>
                        <p>Copyright 2022 SteamRev. All rights reserved.</p>
                    </small>
                </Col>
                <Col sm={6}>
                    <div className='text-end'>
                        <a href="https://github.com/nawifuru/">
                            <img className="external-logos" src={githubLogo} alt="" />
                        </a>
                        <a href="https://www.linkedin.com/in/nawi-furu-31975b229/">
                            <img className="external-logos" src={linkedinLogo} alt="" />
                        </a>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Footer;