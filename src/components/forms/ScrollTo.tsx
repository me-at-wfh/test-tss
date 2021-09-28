import React from "react";

interface IProps {
  location?: "top" | "element";
  scrollType?: "auto" | "smooth";
}
export default class ScrollTo extends React.Component<IProps> {
  elementRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    if (this.props.location && this.props.location === "element") {
      if (this.elementRef.current !== null) {
        this.elementRef.current.scrollIntoView({
          behavior: this.props.scrollType || "auto"
        });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return <div ref={this.elementRef}></div>;
  }
}
