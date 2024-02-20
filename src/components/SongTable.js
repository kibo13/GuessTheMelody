import React from 'react';
import { Table } from 'react-bootstrap';

function SongTable() {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Категория</th>
                    <th>Заголовок 1</th>
                    <th>Заголовок 2</th>
                    <th>Заголовок 3</th>
                    <th>Заголовок 4</th>
                    <th>Заголовок 5</th>
                </tr>
            </thead>
            <tbody>
                {[...Array(6)].map((_, rowIndex) => (
                    <tr key={rowIndex}>
                        {rowIndex === 0 ? (
                            <td>Категория</td>
                        ) : (
                            <td>{`Значение ${rowIndex}`}</td>
                        )}
                        {[...Array(5)].map((_, colIndex) => (
                            <td key={colIndex}>{`Ячейка (${rowIndex}, ${
                                colIndex + 1
                            })`}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default SongTable;
