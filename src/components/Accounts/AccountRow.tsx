import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons';
import { selectBrokerages, selectAuthorizations } from '../../selectors';
import { selectGroups } from '../../selectors/groups';
import { loadAccounts, loadGroups } from '../../actions';
import { putData } from '../../api';
import PortfolioGroupPicker from '../PortfolioGroupPicker';
import { InputNonFormik } from '../../styled/Form';
import { Table, H3, P, Edit, A } from '../../styled/GlobalElements';
import { Button } from '../../styled/Button';
import { selectCanCrossAccountBalance } from '../../selectors/subscription';
import {
  AccountContainer,
  Brokerage,
  Name,
  InputContainer,
  Number,
  Type,
  PortfolioGroup,
} from './styles';
import { Account } from '../../types/account';

type Props = {
  account: Account;
};

export const AccountRow = ({ account }: Props) => {
  const [nameEditing, setNameEditing] = useState(false);
  const [groupEditing, setGroupEditing] = useState(false);
  const [name, setName] = useState(account.name);
  const [newGroupId, setNewGroupId] = useState();

  const brokerages = useSelector(selectBrokerages);
  const authorizations = useSelector(selectAuthorizations);
  const groups = useSelector(selectGroups);
  const canCrossAccountBalance = useSelector(selectCanCrossAccountBalance);

  const dispatch = useDispatch();

  if (!groups) {
    return null;
  }

  const group = groups.find(group => group.id === account.portfolio_group);
  if (group && !newGroupId) {
    setNewGroupId(group.id);
  }

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setAccountName();
    }
  };

  const setAccountName = () => {
    if (name !== account.name) {
      const newAccount = {
        ...account,
        name,
      };
      putData(`/api/v1/accounts/${account.id}`, newAccount)
        .then(() => {
          dispatch(loadAccounts());
          dispatch(loadGroups());
        })
        .catch(() => {
          dispatch(loadAccounts());
          dispatch(loadGroups());
        });
    }
    setNameEditing(false);
  };

  const setPortfolioGroup = () => {
    const newAccount = {
      ...account,
      portfolio_group: newGroupId,
    };
    putData(`/api/v1/accounts/${account.id}`, newAccount)
      .then(() => {
        dispatch(loadAccounts());
        dispatch(loadGroups());
      })
      .catch(() => {
        dispatch(loadAccounts());
        dispatch(loadGroups());
      });
    setGroupEditing(false);
  };

  let brokerageName = '';
  if (authorizations && brokerages) {
    if (authorizations.length === 0) {
      return null;
    }

    const authorization = authorizations.find(
      authorization => authorization.id === account.brokerage_authorization,
    );

    if (!authorization) {
      return null;
    }

    const brokerage = brokerages.find(
      brokerage => brokerage.id === authorization.brokerage.id,
    );

    if (brokerage) {
      brokerageName = brokerage.name;
    }
  }

  const formatAccountType = (account: any, brokerageName: any) => {
    let accountType = '';
    if (brokerageName === 'Questrade') {
      accountType = account.meta.client_account_type + ' ' + account.meta.type;
    } else {
      accountType = account.meta.type;
    }
    return accountType;
  };

  let editingFooter = (
    <React.Fragment>
      <H3>
        &nbsp; You're about to change the portfolio group your account is linked
        to. Do you want to continue? &nbsp;
      </H3>
      <Button onClick={() => setPortfolioGroup()}>Update</Button>
      <A onClick={() => setGroupEditing(false)}>Cancel</A>
    </React.Fragment>
  );
  if (!canCrossAccountBalance) {
    editingFooter = (
      <React.Fragment>
        <Button onClick={() => setGroupEditing(false)}>Cancel</Button>
        <React.Fragment>
          Modifying portfolio groups is only available to Elite subscribers.
          Upgrade your account to access this feature!
        </React.Fragment>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <AccountContainer>
        <Table>
          <Brokerage>
            <H3>Brokerage</H3>
            <P>{brokerageName}</P>
          </Brokerage>
          <Name>
            <H3>Name</H3>
            {!nameEditing ? (
              <P>
                {' '}
                {account.name}
                <Edit onClick={() => setNameEditing(true)}>
                  <FontAwesomeIcon icon={faPen} />
                  Edit
                </Edit>
              </P>
            ) : (
              <InputContainer>
                <InputNonFormik
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onKeyPress={onEnter}
                />
                <Edit onClick={() => setAccountName()}>
                  <FontAwesomeIcon icon={faCheck} />
                  Done
                </Edit>
              </InputContainer>
            )}
          </Name>
          <Number>
            <H3>Number</H3>
            <P> {account.number} </P>
          </Number>
          <Type>
            <H3>Type</H3>
            <P> {formatAccountType(account, brokerageName)} </P>
          </Type>
          <PortfolioGroup>
            <H3>Portfolio Group</H3>
            {!groupEditing ? (
              <P>
                {group && group.name}
                <Edit onClick={() => setGroupEditing(true)}>
                  <FontAwesomeIcon icon={faPen} />
                  Edit
                </Edit>
              </P>
            ) : (
              <PortfolioGroupPicker
                group={newGroupId}
                onChange={(e: any) => setNewGroupId(e.target.value)}
                disabled={!canCrossAccountBalance}
              />
            )}
          </PortfolioGroup>
        </Table>
        {groupEditing && editingFooter}
      </AccountContainer>
    </React.Fragment>
  );
};

export default AccountRow;