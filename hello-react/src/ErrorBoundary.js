import {Component} from 'react';

class ErrorBoundary extends Component {
  state = {
    error: false
  };
  //에러발생시 호출
  componentDidCatch(error, info) {
    this.setState({
      error: true
    });
    console.log({error, info});
  }
  render() {
    if (this.state.error) return <div>에러가 발생했습니다!</div>;
    return this.props.children;
  }
}

export default ErrorBoundary;
