import React from 'react';

const TableHeader = () => {
    return (
        <thead>
        <tr>
            <th>Index</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
        </tr>
        </thead>
    );
}

const Table = (props) => {
    const {characterData, removeCharacter} = props;
    return (
        <table>
            <TableHeader/>
            <TableBody characterData={characterData} removeCharacter={removeCharacter}/>
        </table>
    );
}

const TableBody = (props) => {
    const rows = props.characterData.map((row, index) => {
        return (
            <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row.firstName}</td>
                <td>{row.lastName}</td>
                <td>{row.email}</td>
                <td>
                    <button onClick={() => props.editCharacter(index)}>Edit</button>
                    <button onClick={() => props.removeCharacter(row.id)}>Delete</button>
                </td>
            </tr>
        );
    });

    return <tbody>{rows}</tbody>;
}

export default TableBody;