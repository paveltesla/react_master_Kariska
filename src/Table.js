import React from 'react';

const TableHeader = () => { 
    return (
        <thead>
            <tr>
                <th>index</th>
                <th>firstName</th>
                <th>lastName</th>
                <th>Email</th>
            </tr>
        </thead>
    );
}

const TableBody = (props) => {
    const rows = props.characterData.map((row, index) => {
        return (
            <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row.name}</td>
                <td>{row.job}</td>
                <td>{row.email}</td>
                <td>
                    <button onClick={() => props.removeCharacter(row.id)}>Delete</button>
                </td>
            </tr>
        );
    });

    return <tbody>{rows}</tbody>;
}

const Table = (props) => {
    const { characterData, removeCharacter } = props;
        return (
            <table>
                <TableHeader />
                <TableBody characterData={characterData} removeCharacter={removeCharacter} />
            </table>
        );
}

export default Table;