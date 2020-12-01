import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { BookContext } from '../context/books';
import { FredContext } from '../context/fred';

const Books = () => {
    const { books,loading } = useContext(BookContext);
    const { fred3 } = useContext(FredContext);

    if (!books.length) {
        return (
          <section className="hero">
          <h1>No Books Available</h1>
          <h1>No Books Available {fred3}</h1>
          </section>
        )
    }

    return (
        <section className="books">
            <h1>No Books Available {fred3}</h1>
            {books.map(({ image: image, id, title }) => (
                <article key={id} className="book">
                    <div className="book-image">
                        <img src={image} alt={title} />
                    </div>
                    <Link to={`books/${id}`} className="btn book-link">details</Link>
                </article>
            ))}
        </section>
    )
}

export default Books
