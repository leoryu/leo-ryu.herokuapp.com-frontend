import React  from "react";
import PropTypes from "prop-types";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gruvboxDark as codeStyle } from "react-syntax-highlighter/dist/styles/hljs";

interface Props {
	value: string;
	language: string;
}

class CodeBlock extends React.PureComponent<Props> {
  static defaultProps = {
    language: '',
  };

  render() {
    const { language, value } = this.props;
    return (
      <SyntaxHighlighter language={language} style={codeStyle}>
        {value}
      </SyntaxHighlighter>
    );
  }
}

(CodeBlock as React.ComponentClass<Props>).propTypes = {
	value: PropTypes.string.isRequired,
	language: PropTypes.string,
} as any;

export default CodeBlock;

