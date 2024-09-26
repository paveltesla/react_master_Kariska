import React, {Component} from 'react';

class App extends Component {
    state = {
        data: []
    };

    componentDidMount() {
        fetch('https://api.example.com/characters')
            .then(response => response.json())
            .then(data => {
                this.setState({characters: data});
            })
            .catch(error => console.error('Ошибка при загрузке данных:', error));
    }

    render() {
        const {data} = this.state;

        const result = data.map((entry, index) => {
            console.log(entry);
            return <li key={index}>{entry}</li>;
        });

        return <div className="container">
            <ul>{result}</ul>
        </div>;
    }
}