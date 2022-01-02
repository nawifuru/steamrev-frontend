import { Col, Container, Row } from 'react-bootstrap';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import chartIcon from './images/chartIcon.png';
import fireIcon from './images/fireIcon.png';
import starIcon from './images/starIcon.png';
import searchIcon from './images/searchIcon.png';

import Footer from './components/Footer';
import SearchForm from './components/SearchForm';
import ChartView from "./components/ChartView";
import PopularGameView from "./components/PopularGameView";
import QualityViewer from "./components/QualityViewer";
import { createStore } from 'redux'

import { Provider } from 'react-redux';
import allReducers from './reducers/allReducers';
import NavigationBar from './components/NavigationBar';
function App() {
  const store = createStore(allReducers, {});
  return (
    <Provider store={store}>
      <Container fluid id="App">
        <Row id="HeaderRow">
          <NavigationBar />
        </Row>
        <Row id="AppContent">
          <Col sm={2}>
            <div id="NavigationSide">
              <a href="#SearchRow"><img className="images-mini" src={searchIcon} alt="" />Search</a>
              <a href="#QualityViewerRow"><img className="images-mini" src={starIcon} alt="" />QualityViewer</a>
              <a href="#PopularGameRow"><img className="images-mini" src={fireIcon} alt="" />Popular</a>
              <a href="#ChartRow"><img className="images-mini" src={chartIcon} alt="" />Charts</a>
            </div>
          </Col>
          <Col sm={8}>
            <Row id="SearchRow">
              <SearchForm></SearchForm>
            </Row>
            <Row id="QualityViewerRow">
              <QualityViewer />
            </Row>
            <Row id="PopularGameRow">
              <PopularGameView />
            </Row>
            <Row id="ChartRow">
              <ChartView />
            </Row>
          </Col>
          <Col sm={2}>
          </Col>
        </Row>
        <Row id="FooterRow">
          <Footer></Footer>
        </Row>
      </Container>
    </Provider>
  );
}

export default App;
