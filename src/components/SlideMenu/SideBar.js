import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { selectGroups, selectIsDemoMode } from '../../selectors';
import { toggleDemoMode } from '../../actions';
import SideBarLink from './SideBarLink';
import SideBarLinkAlt from './SideBarLinkAlt';
import SideBarFooter from './SideBarFooter';
import { selectLoggedIn } from '../../selectors';
import styled from '@emotion/styled';

const StyledAside = styled.aside`
  background-color: var(--brand-grey);
  color: #fff;
  width: 244px;
  height: 100%;
  padding-top: 12px;
  text-transform: uppercase;
  font-weight: 700;

  a {
    color: #fff;
    text-decoration: none;
    padding: 22px 0;
    display: block;
    font-size: 1.125rem;
    padding-left: 25px;
    padding-right: 15px;
    widht: 100%;
    svg {
      float: right;
    }
  }
  .active {
    background: var(--brand-green);
    box-shadow: -1px 2px 3px 0 rgba(0, 0, 0, 0.27);
    margin-right: -5px;
    padding-right: 5px;
  }
`;
const GroupContainer = styled.div`
  border-top: 1px solid rgba(255,255,255,.23);
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255,255,255,.23);
  text-transform: none;
  font-weight: 500;
`;
const SideBar = (props) => {
  let groups = <FontAwesomeIcon icon={faSpinner} spin />;
  if (props.groups) {
    groups = props.groups.map((group) => (
      <SideBarLink
        key={group.id}
        name={group.name}
        linkPath={`/app/group/${group.id}`}
        rebalance={!!(group.rebalance)}
      />
    ));
  }
  if (props.loggedIn) {
  return (
    <StyledAside>
      <SideBarLink
        name="Dashboard"
        linkPath="/app/dashboard"
      />
      <GroupContainer>
        {groups}
      </GroupContainer>
      <SideBarLink
        name="Settings"
        linkPath="/app/settings"
      />

      {/*<button
        onClick={props.toggleDemo}
      >
        Demo Mode&nbsp;
        {props.demoMode && <FontAwesomeIcon icon={faToggleOn} />}
        {!props.demoMode && <FontAwesomeIcon icon={faToggleOff} />}
      </button> */}
      {/*<button onClick={this.openModal}>Open Modal</button> ? */}
      <SideBarFooter/>
    </StyledAside>
  );
  }
  return (
    <StyledAside>
      <SideBarLink
        name="Login"
        linkPath="/app/login"
      />
      <SideBarLink
        name="Sign Up"
        linkPath="/app/register"
      />
      <SideBarLinkAlt
        name="Reset Password"
        linkPath="/app/reset-password"
      />
      <SideBarFooter/>
    </StyledAside>
  );
}

const select = state => ({
  loggedIn: selectLoggedIn(state),
  groups: selectGroups(state),
  demoMode:  selectIsDemoMode(state),
});

const actions = { toggleDemo: toggleDemoMode };

export default connect(select, actions)(SideBar);
