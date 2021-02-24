import React from "react";
import { Form } from "react-final-form";
import ActionBar from "./ActionBar";
import SubmitButton from "./SubmitButton";
import BackLink from "./BackLink";

class Wizard extends React.Component {
  static Page = ({ children }) => children;

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      values: props.initialValues || {},
    };
  }

  next = (values) =>
    this.setState((state) => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values,
    }));

  previous = () =>
    this.setState((state) => ({
      page: Math.max(state.page - 1, 0),
    }));

  getActivePage = () =>
    React.Children.toArray(this.props.children)[this.state.page];

  validate = (values) => {
    const activePage = this.getActivePage();
    return activePage.props.validate ? activePage.props.validate(values) : {};
  };

  handleSubmit = (values) => {
    const { children, onSubmit } = this.props;
    const { page } = this.state;

    let pass = true;
    const activePage = this.getActivePage();
    if (activePage.props.onSubmit) {
      pass = activePage.props.onSubmit(values);
    }

    if (!pass) return;

    const isLastPage = page === React.Children.count(children) - 1;
    if (isLastPage) {
      return onSubmit(values);
    } else {
      this.next(values);
    }
  };

  render() {
    const { children, showActionBar = true } = this.props;
    const { page, values } = this.state;
    const activePage = React.Children.toArray(children)[page];
    const isLastPage = page === React.Children.count(children) - 1;

    return (
      <Form
        initialValues={values}
        validate={this.validate}
        onSubmit={this.handleSubmit}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            {activePage}
            <ActionBar visible={showActionBar}>
              {page > 0 && <BackLink action={this.previous} />}
              {!isLastPage && <SubmitButton caption="Next" />}
              {isLastPage && <SubmitButton caption="Submit" />}
            </ActionBar>
          </form>
        )}
      </Form>
    );
  }
}

export default Wizard;
