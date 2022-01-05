import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, FormControl, InputGroup, Spinner } from "react-bootstrap";
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
            const results = await axios.get(`${ipAddress}/games`);
            setGameList(results.data);
        }
        fetchData();
    }, []);

    const handleSearchFocused = (e) => {
        e.stopPropagation();
        setSearchFocused(true);
    }
    let delay = null;
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
        }, 1250)
    }
    const filteredGameList = gameList.filter(item => item.name.substring(0, filterText.length).toUpperCase() === filterText.toUpperCase());
    return (
        <div>
            <Form id="search-form" className="d-flex">
                <InputGroup
                    id="search-bar"
                    onClick={(e) => handleSearchFocused(e)}
                >
                    <img src={searchIcon} alt="" />
                    <FormControl
                        id="search-control"
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        onChange={(e) => handleChangeFilterText(e)}
                        autoComplete="off"
                    />
                </InputGroup>
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
                            <Button variant="primary" disabled className="search-results-loading">
                                <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                Loading...
                            </Button>
                        }
                    </div>
                }
            </Form>
        </div>
    );
}

export default SearchForm;