import { useEffect, useState } from "react"
import "./Css/Card.css"

export default function Card({ pokemon }) {
    const [details, setDetails] = useState([])
    const [loading, setLoading] = useState(true);

    function capitalizeFirst(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    useEffect(() => {
        setLoading(true);
        async function getDetails() {
            const response = await fetch(pokemon.url)
            const json = await response.json()
            setLoading(false)
            setDetails(json.sprites);
        }
        getDetails()
    }, [])

    if (loading) {
        return <img src="src/assets/pokeball.png" className="pokeball" />
    }

    return (
        <div className="col-12 col-md-5 col-lg-3 my-5 d-flex justify-content-center">
            <div className="card bg-light d-flex align-items-center" style={{ width: "18rem" }}>
                <img src={details.other["official-artwork"].front_default} className="card-img-top" alt={pokemon.name} />
                <div className="card-body">
                    <h5 className="card-title">{capitalizeFirst(pokemon.name)}</h5>
                    <p className="card-text"></p>
                </div>
            </div>
        </div>
    )
}