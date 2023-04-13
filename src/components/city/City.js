import './City.css';

import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from "react-router-dom"

function Cities() {
    const navigate = useNavigate();
    const [results, setResults] = useState({});
    const [isEmpty, setIsEmpty] = useState(true);

    const { id: currentCity }  = useParams();

    const [name, setName] = useState("");
    const [picture, setPicture] = useState("");

    async function getResults() {
        const request = await axios.get(`http://localhost:8080/cities/city/${currentCity}`);
        const results = request.data
        if (results !== undefined && results !== {}) {
            setName(results.name)
            setPicture(results.picture)
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
        console.log(currentCity)
    }, [results])

    function submitInput() {
        const obj = {"name":name,"picture":picture}
        axios.put(`http://localhost:8080/cities/city/${currentCity}/update`,obj);
        setResults({});
        setIsEmpty(true)
        getResults();
    }

    function returnToCities() {
    console.log(parseInt(currentCity/9) + 1)
        navigate(`/cities/${parseInt(currentCity/9) + 1}`)
    }

    return (
    <div className = "main">
        <div className = "city">
            <h1 className = "id">{results.id}.</h1>
            <img className = "pic" src={results.picture}/>
            <h1>{results.name}</h1>
        </div>
        <div>


                <label className = "form">
                        Name: <input defaultValue={results.name} name="name" type = "text" value = {name} onChange = {(e) => setName(e.target.value)} />
                </label>

                <label className = "form">
                        Link: <input defaultValue={results.picture} name="link" type = "text" value = {picture} onChange = {(e) => setPicture(e.target.value)} />
                </label>

                <button className = "button-submit" onClick={submitInput}>Submit</button>

        </div>
        <button className = "button-return" onClick={returnToCities}>Return</button>
    </div>
    );
}

export default Cities