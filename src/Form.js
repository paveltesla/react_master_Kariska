import React, {Component} from "react";

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: Date.now(),
            firstName: '',
            lastName: '',
            email: '',
            errorMessage: ''
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.editingCharacter && nextProps.editingCharacter.id !== prevState.id) {
            return nextProps.editingCharacter;
        }
        return null;
    }

    validateForm = () => {
        const {firstName, lastName, email} = this.state;
        let formIsValidate = true;

        if (!firstName || !lastName || !email) {
            formIsValidate = false;
            this.setState({errorMessage: 'Заполните все поля!'});
        }
        const emailPattern = /\S+@\S+\.\S+/;
        if (email && !emailPattern.test(email)) {
            formIsValidate = false;
            this.setState({errorMessage: 'Введен не корректный формат электронной почты!'})
        }

        return formIsValidate;
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        if (this.validateForm()) {
            this.props.handleSubmit(this.state);
            this.setState({
                firstName: '',
                lastName: '',
                email: '',
                errorMessage: ''
            });
        }

        // Присваиваем уникальный ID при добавлении

    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value, errorMessage: ''
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
