import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function SearchBook() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [results, setResults] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/categories').then(response => setCategories(response.data));
    }, []);

    const handleSearch = () => {
        axios.get('http://localhost:3001/books').then(response => {
            const filteredResults = response.data.filter(
                book => book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                    (!selectedCategory || book.category === selectedCategory)
            );
            setResults(filteredResults);
        });
    };

    return (
        <div className="row mb-3 col-md-6">
            <input
                type="text"
                placeholder="Tên sách"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <select onChange={e => setSelectedCategory(e.target.value)} value={selectedCategory}>
                <option value="">Tất cả thể loại</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                        {cat.name}
                    </option>
                ))}
            </select>
            <button onClick={handleSearch} className="btn btn-primary">Tìm kiếm</button>
            {results.length > 0 ? (
                <ul>
                    {results.map(book => (
                        <li key={book.id}>{book.title} - {book.category}</li>
                    ))}
                </ul>
            ) : (
                <p>Không có kết quả</p>
            )}
        </div>
    );
}

export default SearchBook;
