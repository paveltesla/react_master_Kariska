import React,{Component} from "react";

class Form extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            errorMessage: ''
        };
        this.state = this.initialState;
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.editingCharacter && nextProps.editingCharacter.id !== prevState.id) {
            return nextProps.editingCharacter;
        }
        return null;
    }

    validateForm = () =>{
        const {firstName, lastName, email} =this.state;

        if(!firstName || !lastName || !email){
            this.setState({errorMessage: 'Все поля должны быть заполнены'})
        }
        this.setState({errorMessage: ''});
    }


    onFormSubmit = (event) => {
        event.preventDefault();

        if (this.validateForm()) {
            this.props.handleSubmit(this.state);
            this.setState(this.initialState)
        }

        // Присваиваем уникальный ID при добавлении
        const newCharacter = {
            ...this.state,
            id: Date.now() // Используем текущую метку времени как уникальный идентификатор
        };

        this.props.handleSubmit(newCharacter);
        this.setState(this.initialState);
    }

    handleChange = (event) => {
        const {firstName, value} = event.target;
        this.setState({
            [firstName]: value
        });
    }


    render() {
        const { firstName, lastName, email, errorMessage } = this.state;

        return (
            <form onSubmit={this.onFormSubmit}>
                <label htmlFor="name">First Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={firstName}
                    onChange={this.handleChange} />

                <label htmlFor="job">Last Name</label>
                <input
                    type="text"
                    name="job"
                    id="job"
                    value={lastName}
                    onChange={this.handleChange} />

                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    onChange={this.handleChange} />

                {/* Вывод простого сообщения об ошибке */}
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

                <button type="submit">{this.props.editingCharacter ? 'Update' : 'Submit'}</button>
            </form>
        );
    }
}

export default Form;
