import React, {Component} from "react";

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,  // Изначально id null, чтобы его устанавливать при создании нового персонажа
            firstName: '',
            lastName: '',
            email: '',
            errorMessage: ''
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // Проверяем, не совпадают ли id, чтобы обновить state только при редактировании
        if (nextProps.editingCharacter && nextProps.editingCharacter.id !== prevState.id) {
            return nextProps.editingCharacter;
        }
        return null;
    }

    validateForm = () => {
        const {firstName, lastName, email} = this.state;
        let formIsValid = true;

        if (!firstName || !lastName || !email) {
            formIsValid = false;
            this.setState({errorMessage: 'Заполните все поля!'});
        }
        const emailPattern = /\S+@\S+\.\S+/;
        if (email && !emailPattern.test(email)) {
            formIsValid = false;
            this.setState({errorMessage: 'Введен некорректный формат электронной почты!'})
        }

        return formIsValid;
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        if (this.validateForm()) {
            // Если это новый персонаж, добавляем ему уникальный id
            const characterWithId = {
                ...this.state,
                id: this.state.id || Date.now()  // Присваиваем id только если его нет (для новых персонажей)
            };

            this.props.handleSubmit(characterWithId);
            this.setState({
                id: null,
                firstName: '',
                lastName: '',
                email: '',
                errorMessage: ''
            });
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value,
            errorMessage: ''  // Очищаем ошибку при изменении
        });
    }

    render() {
        const {firstName, lastName, email, errorMessage} = this.state;

        return (
            <form onSubmit={this.onFormSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={firstName}
                    onChange={this.handleChange}/>

                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={lastName}
                    onChange={this.handleChange}/>

                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    onChange={this.handleChange}/>

                {errorMessage && <div style={{color: 'red'}}>{errorMessage}</div>}

                <button type="submit">{this.props.editingCharacter ? 'Update' : 'Submit'}</button>
            </form>
        );
    }
}

export default Form;
