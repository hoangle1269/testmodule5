import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function BookList() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/books').then(response => {
            const sortedBooks = response.data.sort((a, b) => a.title.localeCompare(b.title));
            setBooks(sortedBooks);
        });
    }, []);

    return (
        <div>
            <h1>Danh sách Sách</h1>
            <table className="table table-hover">
                <thead className="theah-dark">
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Mã sách</th>
                    <th scope="col">Tên sách</th>
                    <th scope="col">Thể loại</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Ngày nhập</th>
                </tr>
                </thead>
                <tbody>
                {books.map((book, index) => (
                    <tr key={book.id}>
                        <td>{index + 1}</td>
                        <td>{book.id}</td>
                        <td>{book.title}</td>
                        <td>{book.category}</td>
                        <td>{book.quantity}</td>
                        <td>{book.price}</td>
                        <td>{book.entryDate}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default BookList;
