import React from 'react';

export default class CreateItemForm extends React.Component {
  constructor() {
    super();
    this.formInput = React.createRef();
    this.formCheckbox = React.createRef();
  }
  handleCreate = e => {
    e.preventDefault();
    if (!this.formInput.current.value) {
      alert('please enter a value');
      return;
    }

    const newItem = {
      title: this.formInput.current.value,
      completed: this.formCheckbox.current.checked
    };

    this.props.onCreateItem(newItem);

    this.formInput.current.value = '';
    this.formCheckbox.current.checked = false;
    this.formInput.current.focus();
  };

  render() {
    return (
      <div className="col-sm-6">
        <form onSubmit={this.handleCreate}>
          <p>
            <input
              type="text"
              placeholder="Title"
              ref={this.formInput}
              className="form-control"
            />
          </p>
          <p>
            <label>
              <input type="checkbox" ref={this.formCheckbox} />
              Completed
            </label>
          </p>
          <input type="submit" className="btn btn-primary" value="Agregar" />
        </form>
      </div>
    );
  }
}
