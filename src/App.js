import React, {Component} from 'react';
import Table from './Table';
import Form from './Form';

class App extends Component {
    state = {
        characters: [],
        editingIndex: null,
        editingCharacter: null
    };

    removeCharacter = id => {
    const { characters } = this.state;
    
    // Обновляем состояние, удаляя персонажа с переданным id
    this.setState({
        characters: characters.filter(character => character.id !== id)
    });
}


    editCharacter = (index) => {
        const character = this.state.characters[index];
        this.setState({
            editingIndex: index,
            editingCharacter: character
        });
    }

    componentDidMount() {
        const storedCharacters = JSON.parse(localStorage.getItem('characters'));
        if (storedCharacters) {
            this.setState({characters: storedCharacters});
        }
    }

    componentDidUpdate() {
        localStorage.setItem('characters', JSON.stringify(this.state.characters));
    }

    handleSubmit = (character) => {
        const {editingIndex, characters} = this.state;

        // Если есть редактируемый персонаж, обновляем его
        if (editingIndex !== null) {
            const updatedCharacters = characters.map((item, index) =>
                index === editingIndex ? character : item
            );
            this.setState({
                characters: updatedCharacters,
                editingIndex: null,
                editingCharacter: null
            });
        } else {
            // Если добавляем нового персонажа
            this.setState({characters: [...this.state.characters, character]});
        }
    }

    render() {
        const {characters, editingCharacter} = this.state;

        return (
            <div className="container">
                <h1>React Tutorial</h1>
                <p>Add a character with a name and a job to the table.</p>
                <Table
                    characterData={characters}
                    removeCharacter={this.removeCharacter}
                    editCharacter={this.editCharacter}  // Передаем функцию редактирования в Table
                />
                <h3>{this.state.editingIndex !== null ? 'Edit Character' : 'Add New'}</h3>
                <Form
                    handleSubmit={this.handleSubmit}
                    editingCharacter={editingCharacter}  // Передаем данные редактируемого персонажа
                />
            </div>
        );
    }
}

export default App;
