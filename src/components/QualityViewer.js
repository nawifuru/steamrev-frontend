import axios from "axios";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";

function QualityViewer() {
    const initialPercentile = 0.5;
    const [gameList, setGameList] = useState(null);
    const handleSearchGames = (percentile) => {
        async function fetchData() {
            const results = await axios.get(`http://192.168.50.87:5000/games/quality?percentile=${percentile}`);
            setGameList(results.data);
        }
        fetchData();
    }
    useEffect(() => {
        handleSearchGames(initialPercentile);
    }, []);
    const dispatch = useDispatch();
    return (
        gameList &&
        <div id="quality-viewer">
            <Form.Control
                id="quality-viewer-control"
                type="number"
                min={0}
                max={1}
                step={0.01}
                onBlur={(e) => handleSearchGames(e.target.value)}
                defaultValue={initialPercentile}
            />
            <div id="quality-viewer-results">
                {
                    gameList.map((item) => (
                        <div key={item.appid}>
                            <a href="#SearchRow" onClick={() => dispatch({ type: 'search', payload: item.appid })}>
                                <img src={item.header_image} alt=""></img>
                            </a>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default QualityViewer;