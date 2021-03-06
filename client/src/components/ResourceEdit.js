// @flow

import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FormattedMessage as T } from 'react-intl'
import { withRouter } from 'react-router'

import { fetchResources } from './../actions'
import Spinner from './Spinner'

type Props = {
  resource: ?Resource,
  id: string,
  loading: boolean,
  shouldLoad: boolean,
}

type State = {}

class ResourceForm extends Component<Props, State> {
  state = {}

  componentDidMount() {
    if (this.props.shouldLoad) {
      this.props.fetchResources()
    }
  }

  render() {
    return (
      <div className="ResourceForm">
        <h1>
          <T {...this.getTitle()} />
        </h1>
        {this.renderContent()}
      </div>
    )
  }

  getTitle() {
    const { resource, id, loading, shouldLoad } = this.props

    if (loading || shouldLoad) {
      return { id: 'resource-edit-loading', values: { id } }
    }

    if (!resource) {
      return { id: 'resource-not-found', values: { id } }
    }

    return { id: 'resource-edit', values: resource }
  }

  renderContent() {
    const { resource, loading, shouldLoad } = this.props

    if (loading || shouldLoad) {
      return <Spinner />
    }

    if (!resource) {
      return (
        <Link to="/resources">
          <T id="resources" />
        </Link>
      )
    }

    return (
      <Fragment>
        <table>
          <tbody>
            <tr>
              <th>id</th>
              <td>{resource.id}</td>
            </tr>
            <tr>
              <th>name</th>
              <td>{resource.name}</td>
            </tr>
            <tr>
              <th>type</th>
              <td>{resource.type}</td>
            </tr>
          </tbody>
        </table>
        <pre>{JSON.stringify(resource, null, '  ')}</pre>
      </Fragment>
    )
  }
}

export default withRouter(
  connect(
    ({ resources }, { match, history }) => {
      const id = match.params.id
      const loading = resources.loading
      const resource = resources.list.find(r => r.id === id)
      const shouldLoad = !resource && !resources.fetched

      return { loading, shouldLoad, id, resource }
    },
    { fetchResources },
  )(ResourceForm),
)
