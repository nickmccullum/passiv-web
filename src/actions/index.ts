import { getData, postData } from '../api';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

export const loginSucceeded: ActionCreator<Action> = payload => ({
  type: 'LOGIN_SUCCEEDED',
  payload,
});

export const logoutStartedAsync: ActionCreator<
  ThunkAction<void, any, any, Action<any>>
> = () => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, 1000);
  };
};

export const logout: ActionCreator<Action> = () => ({
  type: 'LOGOUT',
});

export const tokenExpired: ActionCreator<Action> = () => ({
  type: 'TOKEN_EXPIRED',
});

export const registerStartedAsync: ActionCreator<
  ThunkAction<void, any, any, any>
> = payload => {
  return dispatch => {
    dispatch(registerStarted());
  };
};

export const registerStarted: ActionCreator<Action> = payload => ({
  type: 'REGISTER_STARTED',
  payload,
});

export const registerFailed: ActionCreator<Action> = payload => ({
  type: 'REGISTER_FAILED',
  payload,
});

export const loadAuthorizations: ActionCreator<
  ThunkAction<void, any, any, Action<any>>
> = () => {
  return dispatch => {
    dispatch(fetchAuthorizationsStart());
    getData('/api/v1/authorizations')
      .then(response => dispatch(fetchAuthorizationsSuccess(response)))
      .catch(error => dispatch(fetchAuthorizationsError(error)));
  };
};

export const loadCurrencies: ActionCreator<
  ThunkAction<void, any, any, Action<any>>
> = () => {
  return dispatch => {
    dispatch(fetchCurrenciesStart());
    getData('/api/v1/currencies/')
      .then(response => dispatch(fetchCurrenciesSuccess(response)))
      .catch(error => dispatch(fetchCurrenciesError(error)));
  };
};

export const loadCurrencyRates: ActionCreator<
  ThunkAction<void, any, any, Action<any>>
> = () => {
  return dispatch => {
    dispatch(fetchCurrencyRatesStart());
    getData('/api/v1/currencies/rates/')
      .then(response => dispatch(fetchCurrencyRatesSuccess(response)))
      .catch(error => dispatch(fetchCurrencyRatesError(error)));
  };
};

export const loadGroups: ActionCreator<
  ThunkAction<void, any, any, Action<any>>
> = () => {
  return dispatch => {
    dispatch(fetchGroupsStart());
    getData('/api/v1/portfolioGroups/')
      .then(response => {
        response.data.forEach((group: any) => {
          dispatch(fetchGroupInfoStart(group.id));
          getData('/api/v1/portfolioGroups/' + group.id + '/info/')
            .then(r => dispatch(fetchGroupInfoSuccess(r, group.id)))
            .catch(e => dispatch(fetchGroupInfoError(e, group.id)));
        });
        return dispatch(fetchGroupsSuccess(response));
      })
      .catch(error => dispatch(fetchGroupsError(error)));
  };
};

export const loadGroupsList: ActionCreator<
  ThunkAction<void, any, any, Action<any>>
> = () => {
  return dispatch => {
    dispatch(fetchGroupsStart());
    getData('/api/v1/portfolioGroups/')
      .then(response => {
        return dispatch(fetchGroupsSuccess(response));
      })
      .catch(error => dispatch(fetchGroupsError(error)));
  };
};

export const loadBrokerages: ActionCreator<
  ThunkAction<void, any, any, Action<any>>
> = () => {
  return dispatch => {
    dispatch(fetchBrokeragesStart());
    getData('/api/v1/brokerages/')
      .then(response => dispatch(fetchBrokeragesSuccess(response)))
      .catch(error => dispatch(fetchBrokeragesError(error)));
  };
};

export const loadSettings: ActionCreator<
  ThunkAction<void, any, any, Action<any>>
> = () => {
  return dispatch => {
    dispatch(fetchSettingsStart());
    getData('/api/v1/settings/')
      .then(response => dispatch(fetchSettingsSuccess(response)))
      .catch(error => dispatch(fetchSettingsError(error)));
  };
};

export const loadSubscription: ActionCreator<
  ThunkAction<void, any, any, Action<any>>
> = () => {
  return dispatch => {
    dispatch(fetchSubscriptionStart());
    getData('/api/v1/subscriptions/')
      .then(response => dispatch(fetchSubscriptionSuccess(response)))
      .catch(error => dispatch(fetchSubscriptionError(error)));
  };
};

export const loadPlans: ActionCreator<
  ThunkAction<void, any, any, Action<any>>
> = () => {
  return dispatch => {
    dispatch(fetchPlansStart());
    getData('/api/v1/plans/')
      .then(response => dispatch(fetchPlansSuccess(response)))
      .catch(error => dispatch(fetchPlansError(error)));
  };
};

export const loadAccounts: ActionCreator<
  ThunkAction<void, any, any, Action<any>>
> = () => {
  return dispatch => {
    dispatch(fetchAccountsStart());
    getData('/api/v1/accounts/')
      .then(response => {
        response.data.forEach((account: any) => {
          dispatch(fetchAccountBalancesStart(account.id));
          getData('/api/v1/accounts/' + account.id + '/balances/')
            .then(r => dispatch(fetchAccountBalancesSuccess(r, account.id)))
            .catch(e => dispatch(fetchAccountBalancesError(e, account.id)));

          dispatch(fetchAccountPositionsStart(account.id));
          getData('/api/v1/accounts/' + account.id + '/positions/')
            .then(r => dispatch(fetchAccountPositionsSuccess(r, account.id)))
            .catch(e => dispatch(fetchAccountPositionsError(e, account.id)));
        });
        return dispatch(fetchAccountsSuccess(response));
      })
      .catch(error => dispatch(fetchAccountsError(error)));
  };
};

export const loadGroupDetails: ActionCreator<
  ThunkAction<void, any, any, Action<any>>
> = payload => {
  return dispatch => {
    payload.ids.forEach((id: string) => {
      dispatch(fetchGroupDetailsStart(id));
      getData(`/api/v1/portfolioGroups/${id}/`)
        .then(response => dispatch(fetchGroupDetailsSuccess(response, id)))
        .catch(error => dispatch(fetchGroupDetailsError(error, id)));
    });
  };
};

export const loadGroup: ActionCreator<
  ThunkAction<void, any, any, Action<any>>
> = payload => {
  return dispatch => {
    payload.ids.forEach((id: string) => {
      dispatch(fetchGroupInfoStart(id));
      getData(`/api/v1/portfolioGroups/${id}/info/`)
        .then(response => dispatch(fetchGroupInfoSuccess(response, id)))
        .catch(error => dispatch(fetchGroupInfoError(error, id)));
    });
  };
};

export const initialLoad: ActionCreator<
  ThunkAction<void, any, any, Action<any>>
> = () => {
  return dispatch => {
    dispatch(fetchAuthorizationsStart());
    getData('/api/v1/authorizations')
      .then(response => dispatch(fetchAuthorizationsSuccess(response)))
      .catch(error => dispatch(fetchAuthorizationsError(error)));

    dispatch(fetchCurrenciesStart());
    getData('/api/v1/currencies/')
      .then(response => dispatch(fetchCurrenciesSuccess(response)))
      .catch(error => dispatch(fetchCurrenciesError(error)));

    dispatch(fetchCurrencyRatesStart());
    getData('/api/v1/currencies/rates/')
      .then(response => dispatch(fetchCurrencyRatesSuccess(response)))
      .catch(error => dispatch(fetchCurrencyRatesError(error)));

    dispatch(fetchGroupsStart());
    getData('/api/v1/portfolioGroups/')
      .then(response => {
        response.data.forEach((group: any) => {
          dispatch(fetchGroupInfoStart(group.id));
          getData('/api/v1/portfolioGroups/' + group.id + '/info/')
            .then(r => dispatch(fetchGroupInfoSuccess(r, group.id)))
            .catch(e => dispatch(fetchGroupInfoError(e, group.id)));
        });
        return dispatch(fetchGroupsSuccess(response));
      })
      .catch(error => dispatch(fetchGroupsError(error)));

    dispatch(fetchBrokeragesStart());
    getData('/api/v1/brokerages/')
      .then(response => dispatch(fetchBrokeragesSuccess(response)))
      .catch(error => dispatch(fetchBrokeragesError(error)));

    dispatch(fetchSettingsStart());
    getData('/api/v1/settings/')
      .then(response => dispatch(fetchSettingsSuccess(response)))
      .catch(error => dispatch(fetchSettingsError(error)));

    dispatch(fetchSubscriptionStart());
    getData('/api/v1/subscriptions/')
      .then(response => dispatch(fetchSubscriptionSuccess(response)))
      .catch(error => dispatch(fetchSubscriptionError(error)));

    dispatch(fetchPlansStart());
    getData('/api/v1/plans/')
      .then(response => dispatch(fetchPlansSuccess(response)))
      .catch(error => dispatch(fetchPlansError(error)));

    dispatch(fetchAccountsStart());
    getData('/api/v1/accounts/')
      .then(response => dispatch(fetchAccountsSuccess(response)))
      .catch(error => dispatch(fetchAccountsError(error)));
  };
};

export const fetchAuthorizationsStart: ActionCreator<Action> = () => ({
  type: 'FETCH_AUTHORIZATIONS_START',
});

export const fetchAuthorizationsSuccess: ActionCreator<Action> = payload => ({
  type: 'FETCH_AUTHORIZATIONS_SUCCESS',
  payload,
});

export const fetchAuthorizationsError: ActionCreator<Action> = payload => ({
  type: 'FETCH_AUTHORIZATIONS_ERROR',
  payload,
});

export const fetchCurrenciesStart: ActionCreator<Action> = () => ({
  type: 'FETCH_CURRENCIES_START',
});

export const fetchCurrenciesSuccess: ActionCreator<Action> = payload => ({
  type: 'FETCH_CURRENCIES_SUCCESS',
  payload,
});

export const fetchCurrenciesError: ActionCreator<Action> = payload => ({
  type: 'FETCH_CURRENCIES_ERROR',
  payload,
});

export const fetchCurrencyRatesStart: ActionCreator<Action> = () => ({
  type: 'FETCH_CURRENCY_RATES_START',
});

export const fetchCurrencyRatesSuccess: ActionCreator<Action> = payload => ({
  type: 'FETCH_CURRENCY_RATES_SUCCESS',
  payload,
});

export const fetchCurrencyRatesError: ActionCreator<Action> = payload => ({
  type: 'FETCH_CURRENCY_RATES_ERROR',
  payload,
});

export const fetchGroupsStart: ActionCreator<Action> = () => ({
  type: 'FETCH_GROUPS_START',
});

export const fetchGroupsSuccess: ActionCreator<Action> = payload => ({
  type: 'FETCH_GROUPS_SUCCESS',
  payload,
});

export const fetchGroupsError: ActionCreator<Action> = payload => ({
  type: 'FETCH_GROUPS_ERROR',
  payload,
});

export const fetchBrokeragesStart: ActionCreator<Action> = () => ({
  type: 'FETCH_BROKERAGES_START',
});

export const fetchBrokeragesSuccess: ActionCreator<Action> = payload => ({
  type: 'FETCH_BROKERAGES_SUCCESS',
  payload,
});

export const fetchBrokeragesError: ActionCreator<Action> = payload => ({
  type: 'FETCH_BROKERAGES_ERROR',
  payload,
});

export const fetchSettingsStart: ActionCreator<Action> = () => ({
  type: 'FETCH_SETTINGS_START',
});

export const fetchSettingsSuccess: ActionCreator<Action> = payload => ({
  type: 'FETCH_SETTINGS_SUCCESS',
  payload,
});

export const fetchSettingsError: ActionCreator<Action> = payload => ({
  type: 'FETCH_SETTINGS_ERROR',
  payload,
});

export const fetchSubscriptionStart: ActionCreator<Action> = () => ({
  type: 'FETCH_SUBSCRIPTION_START',
});

export const fetchSubscriptionSuccess: ActionCreator<Action> = payload => ({
  type: 'FETCH_SUBSCRIPTION_SUCCESS',
  payload,
});

export const fetchSubscriptionError: ActionCreator<Action> = payload => ({
  type: 'FETCH_SUBSCRIPTION_ERROR',
  payload,
});

export const fetchPlansStart: ActionCreator<Action> = () => ({
  type: 'FETCH_PLANS_START',
});
export const fetchPlansSuccess: ActionCreator<Action> = payload => ({
  type: 'FETCH_PLANS_SUCCESS',
  payload,
});
export const fetchPlansError: ActionCreator<Action> = payload => ({
  type: 'FETCH_PLANS_ERROR',
  payload,
});

export const fetchAccountsStart: ActionCreator<Action> = () => ({
  type: 'FETCH_ACCOUNTS_START',
});

export const fetchAccountsSuccess: ActionCreator<Action> = payload => ({
  type: 'FETCH_ACCOUNTS_SUCCESS',
  payload,
});

export const fetchAccountsError: ActionCreator<Action> = payload => ({
  type: 'FETCH_ACCOUNTS_ERROR',
  payload,
});

export const fetchAccountBalancesStart: ActionCreator<Action> = id => ({
  type: 'FETCH_ACCOUNT_BALANCES_START',
  id,
});

export const fetchAccountBalancesSuccess: ActionCreator<Action> = (
  payload,
  id,
) => ({
  type: 'FETCH_ACCOUNT_BALANCES_SUCCESS',
  payload,
  id,
});

export const fetchAccountBalancesError: ActionCreator<Action> = (
  payload,
  id,
) => ({
  type: 'FETCH_ACCOUNT_BALANCES_ERROR',
  payload,
  id,
});

export const fetchAccountPositionsStart: ActionCreator<Action> = id => ({
  type: 'FETCH_ACCOUNT_POSITIONS_START',
  id,
});

export const fetchAccountPositionsSuccess: ActionCreator<Action> = (
  payload,
  id,
) => ({
  type: 'FETCH_ACCOUNT_POSITIONS_SUCCESS',
  payload,
  id,
});

export const fetchAccountPositionsError: ActionCreator<Action> = (
  payload,
  id,
) => ({
  type: 'FETCH_ACCOUNT_POSITIONS_ERROR',
  payload,
  id,
});

export const fetchGroupDetailsStart: ActionCreator<Action> = id => ({
  type: 'FETCH_GROUP_DETAILS_START',
  id,
});

export const fetchGroupDetailsSuccess: ActionCreator<Action> = (
  payload,
  id,
) => ({
  type: 'FETCH_GROUP_DETAILS_SUCCESS',
  payload,
  id,
});

export const fetchGroupDetailsError: ActionCreator<Action> = (payload, id) => ({
  type: 'FETCH_GROUP_DETAILS_ERROR',
  payload,
  id,
});

export const fetchGroupInfoStart: ActionCreator<Action> = id => ({
  type: 'FETCH_GROUP_INFO_START',
  id,
});

export const fetchGroupInfoSuccess: ActionCreator<Action> = (payload, id) => ({
  type: 'FETCH_GROUP_INFO_SUCCESS',
  payload,
  id,
});

export const fetchGroupInfoError: ActionCreator<Action> = (payload, id) => ({
  type: 'FETCH_GROUP_INFO_ERROR',
  payload,
  id,
});

export const importTargetStart: ActionCreator<Action> = payload => ({
  type: 'IMPORT_TARGET_START',
  payload,
});

export const importTargetSuccess: ActionCreator<Action> = payload => ({
  type: 'IMPORT_TARGET_SUCCESS',
  payload,
});

export const importTargetError: ActionCreator<Action> = payload => ({
  type: 'IMPORT_TARGET_ERROR',
  payload,
});

export const importTarget: ActionCreator<
  ThunkAction<void, any, any, Action<any>>
> = groupId => {
  return dispatch => {
    dispatch(importTargetStart);
    postData('/api/v1/portfolioGroups/' + groupId + '/import/', {})
      .then(response => dispatch(importTargetSuccess(response)))
      .catch(error => dispatch(importTargetError(error)));
  };
};

export const updateServiceWorker: ActionCreator<Action> = () => ({
  type: 'UPDATE_SERVICE_WORKER',
});