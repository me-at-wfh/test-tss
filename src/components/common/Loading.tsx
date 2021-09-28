import React from "react";
import ReactLoading from "react-loading";

class Loading extends React.PureComponent {
  render() {
    return <ReactLoading type={"bars"} color={"black"}></ReactLoading>;
  }
}

export default Loading;
