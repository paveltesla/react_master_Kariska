import React, { Component } from 'react';
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
    
        this.setState({
            characters: characters.filter((character) => character.id !==id)
        });
    }

    componentDidMount() {
        const storedCharacters = JSON.parse(localStorage.getItem('characters'));
        if (storedCharacters) {
            this.setState({ characters: storedCharacters });
        }
    }

    componentDidUpdate() {
        localStorage.setItem('characters', JSON.stringify(this.state.characters));
    }


    handleSubmit = (character) => {
        this.setState({characters: [...this.state.characters, character]});
    }


    render() {
        const { characters } = this.state;
        
        return (
            <div className="container">
                <h1>React Tutorial</h1>
                <p>Add a character with a name and a job to the table.</p>
                <Table
                    characterData={characters}
                    removeCharacter={this.removeCharacter}
                />
                <h3>Add New</h3>
                <Form handleSubmit={this.handleSubmit} />
            </div>
        );
    }
}

export default App;