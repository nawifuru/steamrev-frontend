import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import mainLogo from '../images/mainLogo.png';
import SearchForm from './sub/SearchForm';
function NavigationBar() {
    return (
        <Navbar variant='dark' fixed="top" id="NavigationBar" expand="lg" collapseOnSelect>
            <Container fluid>
                <Navbar.Brand>
                    <Link className="navigation-links" to="/">
                        <span>STEAM REV</span>
                        <img id='brand-logo' src={mainLogo} alt="" />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <SearchForm></SearchForm>
                    <Nav.Item>
                        <Nav.Link eventKey={1} as={Link} className="navigation-links" to="/charts">
                            CHARTS
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={2} as={Link} className="navigation-links" to="/quality">
                            PERCENTILEVIEWER
                        </Nav.Link>
                    </Nav.Item>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;