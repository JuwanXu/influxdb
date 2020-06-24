// Libraries
import React, {PureComponent} from 'react'
import {connect} from 'react-redux'

// Types
import {AppState, CommunityTemplate} from 'src/types'

// Components
import {
  Panel,
  FlexBox,
  ComponentSize,
  FlexDirection,
  AlignItems,
  Label,
} from '@influxdata/clockface'
import CommunityTemplateListItem from 'src/templates/components/CommunityTemplateListItem'
import CommunityTemplateListGroup from 'src/templates/components/CommunityTemplateListGroup'

interface StateProps {
  activeCommunityTemplate: CommunityTemplate
}

class CommunityTemplateContentsUnconnected extends PureComponent<StateProps> {
  private safelyAccessLength = collection => {
    if (Array.isArray(collection)) {
      return collection.length
    }
    return 0
  }

  render() {
    const {activeCommunityTemplate} = this.props
    if (!Object.keys(activeCommunityTemplate).length) {
      return (
        <Panel>
          <Panel.Header>Calculating template resource needs...</Panel.Header>
        </Panel>
      )
    }

    return (
      <FlexBox
        margin={ComponentSize.Small}
        direction={FlexDirection.Column}
        alignItems={AlignItems.Stretch}
        className="community-templates-installer"
      >
        <CommunityTemplateListGroup
          title="Dashboards"
          count={this.safelyAccessLength(activeCommunityTemplate.dashboards)}
        >
          {Array.isArray(activeCommunityTemplate.dashboards) &&
            activeCommunityTemplate.dashboards.map(dashboard => {
              return (
                <CommunityTemplateListItem
                  key={dashboard.pkgName}
                  title={dashboard.name}
                  description={dashboard.description}
                >
                  Charts: {dashboard.charts.length}
                </CommunityTemplateListItem>
              )
            })}
        </CommunityTemplateListGroup>
        <CommunityTemplateListGroup
          title="Telegraf Configurations"
          count={this.safelyAccessLength(
            activeCommunityTemplate.telegrafConfigs
          )}
        >
          {Array.isArray(activeCommunityTemplate.telegrafConfigs) &&
            activeCommunityTemplate.telegrafConfigs.map(telegrafConfig => {
              return (
                <CommunityTemplateListItem
                  key={telegrafConfig.pkgName}
                  title={telegrafConfig.pkgName}
                  description={telegrafConfig.description}
                />
              )
            })}
        </CommunityTemplateListGroup>
        <CommunityTemplateListGroup
          title="Buckets"
          count={this.safelyAccessLength(activeCommunityTemplate.buckets)}
        >
          {Array.isArray(activeCommunityTemplate.buckets) &&
            activeCommunityTemplate.buckets.map(bucket => {
              return (
                <CommunityTemplateListItem
                  key={bucket.pkgName}
                  title={bucket.name}
                  description={bucket.description}
                />
              )
            })}
        </CommunityTemplateListGroup>
        <CommunityTemplateListGroup
          title="Checks"
          count={this.safelyAccessLength(activeCommunityTemplate.checks)}
        >
          {Array.isArray(activeCommunityTemplate.checks) &&
            activeCommunityTemplate.checks.map(check => {
              return (
                <CommunityTemplateListItem
                  key={check.pkgName}
                  title={check.check.name}
                  description={check.description}
                />
              )
            })}
        </CommunityTemplateListGroup>
        <CommunityTemplateListGroup
          title="Variables"
          count={this.safelyAccessLength(activeCommunityTemplate.variables)}
        >
          {Array.isArray(activeCommunityTemplate.variables) &&
            activeCommunityTemplate.variables.map(variable => {
              return (
                <CommunityTemplateListItem
                  key={variable.pkgName}
                  title={variable.name}
                  description={variable.description}
                >
                  Type: {variable.arguments.type}
                </CommunityTemplateListItem>
              )
            })}
        </CommunityTemplateListGroup>
        <CommunityTemplateListGroup
          title="Notification Rules"
          count={this.safelyAccessLength(
            activeCommunityTemplate.notificationRules
          )}
        >
          {Array.isArray(activeCommunityTemplate.notificationRules) &&
            activeCommunityTemplate.notificationRules.map(notificationRule => {
              return (
                <CommunityTemplateListItem
                  key={notificationRule.pkgName}
                  title={notificationRule.name}
                  description={notificationRule.description}
                />
              )
            })}
        </CommunityTemplateListGroup>
        <CommunityTemplateListGroup
          title="Labels"
          count={this.safelyAccessLength(activeCommunityTemplate.labels)}
        >
          {Array.isArray(activeCommunityTemplate.labels) &&
            activeCommunityTemplate.labels.map(label => {
              return (
                <CommunityTemplateListItem key={label.pkgName}>
                  <Label
                    description={label.properties.description}
                    name={label.name}
                    id={label.name}
                    color={label.properties.color}
                  />
                </CommunityTemplateListItem>
              )
            })}
        </CommunityTemplateListGroup>
      </FlexBox>
    )
  }
}

const mstp = (state: AppState): StateProps => {
  const {activeCommunityTemplate} = state.resources.templates

  return {activeCommunityTemplate}
}

export const CommunityTemplateContents = connect<StateProps, {}, {}>(
  mstp,
  null
)(CommunityTemplateContentsUnconnected)
