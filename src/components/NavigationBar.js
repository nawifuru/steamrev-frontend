import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SearchForm from './sub/SearchForm';
function NavigationBar() {
    return (
        <Navbar fixed="top" id="NavigationBar" expand="lg">
            <Container fluid>
                <Navbar.Brand>
                    <Link className="navigation-links" to="/">STEAM REV</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <SearchForm></SearchForm>
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Link className="navigation-links" to="/charts">CHARTS</Link>
                        <Link className="navigation-links" to="/quality">PERCENTILEVIEWER</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;