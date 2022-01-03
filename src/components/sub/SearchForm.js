import axios from "axios";
import { useEffect, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { ipAddress } from "../../AppSettings";
import searchIcon from '../../images/searchIcon.png';
function SearchForm() {
    const [gameList, setGameList] = useState([]);
    const [searchFocused, setSearchFocused] = useState(false);
    const [filterText, setFilterText] = useState('');

    useEffect(() => {
        document.addEventListener('click', () => {
            setSearchFocused(false);
        });
        async function fetchData() {
            const results = await axios.get(`http://${ipAddress}/games`);
            setGameList(results.data);
        }
        fetchData();
    }, []);

    const handleSearchFocused = (e) => {
        e.stopPropagation();
        setSearchFocused(true);
    }
    const delay = null;
    const [loading, setLoading] = useState(null);
    const handleChangeFilterText = (e) => {
        if (e.target.value.length < 3) {
            setFilterText(e.target.value)
            return;
        }
        if (delay) {
            clearTimeout(delay);
        }
        setLoading(true);
        delay = setTimeout(function () {
            setFilterText(e.target.value);
            setLoading(false);
        }, 1500)
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
                        onChange={(e) => handleChangeFilterText(e)}
                        autoComplete="off"
                    />
                </div>
                {
                    searchFocused &&
                    gameList &&
                    filterText.length >= 3 &&
                    <div id="search-results">
                        {filteredGameList.slice(0, 10).map((item) => (
                            <a className="search-results-item navigation-links" key={item.appid} href={`/games/${item.appid}`}>
                                <img className="search-item-image" src={item.header_image} alt="" />
                                <span>{item.name}</span>
                            </a>
                        ))}
                        {
                            loading &&
                            <span className="search-results-loading">Loading...</span>
                        }
                    </div>
                }
            </Form>
        </div>
    );
}

export default SearchForm;