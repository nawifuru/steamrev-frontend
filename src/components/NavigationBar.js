import { Container, Navbar, Nav } from 'react-bootstrap';
import SearchForm from './sub/SearchForm';
function NavigationBar() {
    return (
        <Navbar fixed="top" id="NavigationBar" bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/">SteamRev</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <SearchForm></SearchForm>
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/charts">Charts</Nav.Link>
                        <Nav.Link href="/quality">Quality Viewer</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;