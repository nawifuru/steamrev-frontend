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
                            <a className="search-results-item" key={item.appid} href={`/games/${item.appid}`}>
                                <img className="search-item-image" src={item.header_image} alt="" />
                                <span>{item.name}</span>
                            </a>
                        ))}
                    </div>
                }
            </Form>
        </div>
    );
}

export default SearchForm;