/*const MyComponent = props => {
    return (
        <div>
            안녕하세요 제 이름은 {props.name}입니다.<br/> {/!*기본이름*!/}
            children 값은 {props.children}입니다.  {/!*리액트*!/}
        </div>
);
};

MyComponent.defaultProps = {
    name: '기본 이름'
};*/

/*

import PropTypes from 'prop-types';
const MyComponent = ({name, children}) => {
    return (
        <div>
            안녕하세요 제 이름은 {name}입니다.<br/>
            children 값은 {children}입니다.
        </div>
    );
}

MyComponent.defaultProps = {
    name: '기본 이름'
};

MyComponent.propTypes = {
    name: PropType.string,
    favoriteNumber: PropTypes.number.isRequired
};
export default MyComponent;
*/

import { Component } from "react";
import PropTypes from 'prop-types';


class MyComponent extends Component {
    static defaultProps = {
        name: '기본이름'
    };
    static propTypes = {
        name: PropTypes.string,
        favoriteNumber: PropTypes.number.isRequired
    };
    render() {
        ...
    }

    /*
        render() {
            const { name, favoriteNumber, children } = this.props; //비구조화 할당
            return (
                <div>
                    안녕하세요, 제 이름은 {name} 입니다. <br />
                    children 값은 {children} 입니다. <br />
                    제가 좋아하는 숫자는 {favoriteNumber} 입니다.
                </div>
            );
        }
    }

    MyComponent.defaultProps = {
        name : '기본 이름'
    };

    MyComponent.propTypes = {
        name : PropTypes.string,
        favoriteNumber: PropTypes.number.isRequired
    };
    */
}

class
export default MyComponent;