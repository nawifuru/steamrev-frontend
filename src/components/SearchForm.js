import axios from "axios";
import { useEffect, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import searchIcon from '../images/searchIcon.png';
import GameDetails from "./sub/GameDetails";
function SearchForm() {
    const [gameList, setGameList] = useState([]);
    const [searchFocused, setSearchFocused] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [selectedGame, setSelectedGame] = useState(null);

    useEffect(() => {
        document.addEventListener('click', () => {
            setSearchFocused(false);
        });
        async function fetchData() {
            const results = await axios.get('http://192.168.50.87:5000/games');
            setGameList(results.data);
        }
        fetchData();

    }, []);

    const dispatch = useDispatch();
    const appid = useSelector((state) => state.search);
    useEffect(() => {
        async function fetchData() {
            const results = await axios.get(`http://192.168.50.87:5000/games/${appid}`);
            setSelectedGame(results.data);
        }
        fetchData();
    }, [appid]);

    const handleSearchFocused = (e) => {
        e.stopPropagation();
        setSearchFocused(true);
    }

    const filteredGameList = gameList.filter(item => item.name.substring(0, filterText.length).toUpperCase() === filterText.toUpperCase());
    return (
        <div>
            <Form id="search-form" className="d-flex">
                <div id="search-bar">
                    <img src={searchIcon} alt="" />
                    <FormControl
                        id="search-control"
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        onClick={(e) => handleSearchFocused(e)}
                        onChange={(e) => setFilterText(e.target.value)}
                        autoComplete="off"
                    />
                </div>
                {
                    searchFocused &&
                    gameList &&
                    filterText.length >= 3 &&
                    <div id="search-results">
                        {filteredGameList.map((item) => (
                            <div className="search-results-item" key={item.appid} onClick={() => dispatch({ type: 'search', payload: item.appid })}>
                                <img className="search-item-image" src={item.header_image} alt="" />
                                <span>{item.name}</span>
                            </div>
                        ))}
                    </div>
                }
            </Form>
            {
                selectedGame &&
                <GameDetails selectedGame={selectedGame} />
            }
        </div>
    );
}

export default SearchForm;