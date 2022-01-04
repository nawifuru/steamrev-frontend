import { Container, Row } from 'react-bootstrap';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavigationBar';
import { Route, Routes } from 'react-router-dom';
import HomeView from './components/HomeView';
import Footer from './components/Footer';
import ChartView from './components/ChartView';
import GameView from './components/GameView';
import QualityView from './components/QualityView';
import AboutView from './components/AboutView';
import Page404 from './components/Page404';
function App() {
  return (
    <Container fluid id="App">
      <Row>
        <NavigationBar />
      </Row>
      <Row id="Content">
        <Routes>
          <Route path='*' element={<Page404 />}></Route>
          <Route path="/" element={<HomeView />}></Route>
          <Route path="/charts" element={<ChartView />}></Route>
          <Route path="/games/:appid" element={<GameView />}></Route>
          <Route path="/quality" element={<QualityView />}></Route>
          <Route path="/about" element={<AboutView />}></Route>
        </Routes>
      </Row>
      <Row>
        <Footer />
      </Row>
    </Container>
  );
}

export default App;
