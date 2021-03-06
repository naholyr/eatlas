// @flow

import React, { Component } from 'react'
import { FormattedMessage as T } from 'react-intl'

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUsers, _deleteUser } from './../actions'
import IconButton from './IconButton'
import Spinner from './Spinner'

type Props = {
  users: {
    loading: boolean,
    list: Array<User>,
  },
  // actions
  fetchUsers: typeof fetchUsers,
  _deleteUser: typeof _deleteUser,
}

class Users extends Component<Props> {
  componentDidMount() {
    this.props.fetchUsers()
  }

  deleteUser(id) {
    this.props._deleteUser(id)
  }

  render() {
    const { list, loading } = this.props.users
    return (
      <div className="Users">
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <h1 className="title">
                <T id="users" />
              </h1>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <Link className="button is-primary" to={`/users/new`}>
                <IconButton label="add" icon="plus" />
              </Link>
            </div>
          </div>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <table className="table is-striped is-bordered is-fullwidth">
            <thead>
              <tr>
                <th>
                  <T id="name" />
                </th>
                <th>email</th>
                <th>role</th>
                <th style={{ width: '1px' }} />
              </tr>
            </thead>
            <tbody>
              {list.map(u => (
                <tr key={u.email}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    <div className="field is-grouped">
                      <div className="control">
                        <Link
                          className="button is-primary"
                          to={`/users/${u.id}/edit`}>
                          <IconButton label="edit" icon="pencil" />
                        </Link>
                      </div>
                      <div className="control">
                        <button
                          className="button is-danger is-outlined"
                          onClick={() => this.deleteUser(u.id)}>
                          <IconButton label="delete" icon="times" />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    )
  }
}

export default connect(({ users }) => ({ users }), { fetchUsers, _deleteUser })(Users)
