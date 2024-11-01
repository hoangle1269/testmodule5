import React from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import AddBook from './components/AddBook';
import BookList from "./components/BookList";
import SearchBook from "./components/SearchBook";

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">Trang chủ</Link></li>
                        <li><Link to="/add-book">Thêm sách</Link></li>
                        <li><Link to="/search-book">Tìm kiếm</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<BookList/>}/>
                    <Route path="/add-book" element={<AddBook/>}/>
                    <Route path="/search-book" element={<SearchBook/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;

