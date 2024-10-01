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
    const {characterData, removeCharacter, editCharacter} = props;  // Добавляем editCharacter
    return (
        <table>
            <TableHeader/>
            <TableBody
                characterData={characterData}
                removeCharacter={removeCharacter}
                editCharacter={editCharacter}  // Передаём функцию редактирования
            />
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
                    {/* Передаем id вместо index для editCharacter */}
                    <button onClick={() => props.editCharacter(row.id)}>Edit</button>
                    <button onClick={() => props.removeCharacter(row.id)}>Delete</button>
                </td>
            </tr>
        );
    });

    return <tbody>{rows}</tbody>;
}

export default Table;
