import "./Css/Card.css"

export default function Pagination({ goToNextPage, goToPrevPage }) {
    return (
        <div>
            {goToPrevPage && <button className="btn-custom" onClick={goToPrevPage}>Previous</button>}
            {goToNextPage && <button className="btn-custom" onClick={goToNextPage}>Next</button>}
        </div>
    )
}