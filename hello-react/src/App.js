import {Component} from 'react';
import LifeCycleSample from './LifeCycleSample';
import ErrorBoundary from './ErrorBoundary';

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 1677215).toString(16);
}

class App extends Component {
  state = {
    color: '#000000'
  };

  handleClick = () => {
    this.setState({
      color: getRandomColor()
    });
  };
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>랜덤 색상</button>
        <ErrorBoundary>
          {' '}
          {/* error 발생시 처리 컴포넌트*/}
          <LifeCycleSample color={this.state.color} />;
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
