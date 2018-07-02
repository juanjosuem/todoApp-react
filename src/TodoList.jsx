import React from 'react';
import axios from 'axios';

import ListItem from './ListItem';
import SummaryList from './SummaryList';
import CreateItemForm from './CreateItemForm';
import LoadingSpinner from './LoadingSpinner';

const CONST_API_URL =
  'https://5b391d33e1f26d0014569eed.mockapi.io/api/v1/items';

export default class TodoList extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      loading: false
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    axios.get(CONST_API_URL).then(r => {
      console.log('initial server data');
      this.setState({ items: r.data, loading: false });
    });
  }

  onChangeDone = (obj, event) => {
    this.setState({ loading: true });
    axios
      .put(CONST_API_URL + '/' + obj.id, {
        completed: event.target.checked
      })
      .then(r => {
        if (r.status === 200) {
          let udpatedStateItems = this.state.items.map(item => {
            return item.id !== obj.id
              ? item
              : { ...item, completed: r.data.completed };
          });

          this.setState({ items: udpatedStateItems, loading: false });
        }
      })
      .catch(er => console.log(er));
  };
  onRemoveItem = (obj, event) => {
    this.setState({ loading: true });
    axios.delete(CONST_API_URL + '/' + obj.id).then(r => {
      if (r.status === 200) {
        let udpatedStateItems = this.state.items.filter(
          item => item.id !== obj.id
        );

        this.setState({ items: udpatedStateItems, loading: false });
      }
    });
  };

  onCreateItem = newItem => {
    this.setState({ loading: true });
    axios.post(CONST_API_URL, newItem).then(r => {
      console.log('post response', r);
      if (r.status === 201) {
        this.setState({
          items: [...this.state.items, r.data],
          loading: false
        });
      }
    });
  };

  render() {
    const { items } = this.state;
    return (
      <React.Fragment>
        {this.state.loading && <LoadingSpinner />}
        <div className="col-sm-12">
          <SummaryList items={items} />
        </div>
        <div className="col-sm-6">
          <ul className="list-group">
            {items.map(el => (
              <ListItem
                key={'i-' + el.id}
                item={el}
                onChangeDone={this.onChangeDone}
                onRemoveItem={this.onRemoveItem}
              />
            ))}
          </ul>
        </div>
        <CreateItemForm onCreateItem={this.onCreateItem} />
      </React.Fragment>
    );
  }
}
