import { Component } from "react";
import './ValidationSample.css';

class ValidationSample extends Component {
    state = {
        password: '',
        clicked: false,
        validated: false
    }

    handleChange = (e) => {
        this.setState( {
            password: e.target.value
        });
    }
    handleButtonClick = () => {
        this.setState({
            clicked:true,
            validated: this.state.password === '0000'
        });
        this.input.focus(); //onClick 이벤트 발생시 input에 포커스를 줌
    }

    render() {
        return (
            <div>
                <input
                    ref={(ref) => this.input=ref}   //this.input이 컴포넌트 내부의 input요소를 가리키도록 함
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    className={this.state.clicked ? (this.state.validated ? 'success' : 'failure'): ''}
                />
                <button onClick={this.handleButtonClick}>검증하기</button>
            </div>
        );
    }
}
export default ValidationSample;