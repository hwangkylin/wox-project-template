import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from './actions';
import { Table } from 'antd';

class UsersList extends Component {
  constructor(props) {
    super(props);

    this.columns = [{
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: 'name',
      dataIndex: 'login',
      key: 'login',
    }];
  }
  componentDidMount() {
    this.props.fetchList();
  }
  render() {

    return(
      <div>
        <Table dataSource={this.props.list} columns={this.columns} rowKey="id" />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
	return {
		list: state.list
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		fetchList: () => {
			dispatch( actions.featchList() );
		}
	}
}
const List = connect(
	  mapStateToProps,
  	mapDispatchToProps
  )( UsersList );

export default List;
