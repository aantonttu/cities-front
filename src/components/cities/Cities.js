import './Cities.css';

import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from "react-router-dom"

function Cities() {
    const navigate = useNavigate();
    const [results, setResults] = useState({});
    const [isEmpty, setIsEmpty] = useState(true);
    const [searchParam, setSearchParam] = useState("");
    const [isSearchUsed, setIsSearchUsed] = useState(false);

    const { page: currentPage }  = useParams();

    window.scrollTo(0, 0)


    async function getResults() {
        const request = await axios.get(`http://localhost:8080/cities/${currentPage}`)
        const results = request.data
        if (results !== undefined && results !== {}) {
            setResults(results)
            setIsEmpty(false)
        }
    }

    useEffect(() => {
        if (isEmpty) {
            getResults()
        }
        console.log(results)
        console.log(isEmpty)
        console.log(currentPage)
    }, [results])

    function decreasePage() {
        if (currentPage > 1) {
            navigate(`/cities/${currentPage - 1}`)
        } else {
            return(alert("Page can't be 0!"))
        }
    }

    function increasePage() {
        if (currentPage * 9 < 1000) {
            navigate(`/cities/${parseInt(currentPage) + 1}`)
        } else {
            return(alert("No such page!"))
        }
    }

    async function goToCity(city) {
        navigate(`/cities/city/${parseInt(city.id)}`)
    }

    async function submitSearchParam() {
        if (searchParam !== undefined && searchParam !== "") {
            setIsSearchUsed(true)
            const request = await axios.get(`http://localhost:8080/cities/name/${searchParam}`)
            setResults(request.data)
            console.log(searchParam.toLowerCase())
        }
    }

    return (
    <div className = "main">
        <div className="header">
            <input type="text" placeholder="Search by name" value = {searchParam} onChange = {(e) => setSearchParam(e.target.value)}/>
            <button className="button-search" onClick={submitSearchParam}>Search</button>
        </div>
        <div className="cities">
            {Object.entries(results).map(([x, y]) => (
                <React.Fragment key={x}>
                <div className="city" onClick={() => {goToCity(y)}}>
                    <div className = "id"> <h1>{y.id}.</h1> </div>
                    <img className="pic" src={y.picture}/>
                    <h1>{y.name}</h1>
                </div>
                </React.Fragment>
            ))
            }
    </div>
        {isSearchUsed ?
        null
        :
        <div className="nav">
            <form onSubmit={decreasePage}>
                <button className="button" type="submit">Previous</button>
            </form>

            <h1 className="page">{currentPage}</h1>

            <form onSubmit={increasePage}>
                <button className="button" type="submit">Next</button>
            </form>
        </div>
        }
    </div>
    );
}

export default Cities