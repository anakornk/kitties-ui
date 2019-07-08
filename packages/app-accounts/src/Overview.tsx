// Copyright 2017-2019 @polkadot/app-staking authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { I18nProps } from '@polkadot/ui-app/types';
import { SubjectInfo } from '@polkadot/ui-keyring/observable/types';
import { ComponentProps } from './types';

import React from 'react';
import accountObservable from '@polkadot/ui-keyring/observable/accounts';
import { withMulti, withObservable } from '@polkadot/ui-api';
import { Button, CardGrid } from '@polkadot/ui-app';

import CreateModal from './modals/Create';
import ImportModal from './modals/Import';
import Account from './Account';
import translate from './translate';

type Props = ComponentProps & I18nProps & {
  accounts?: SubjectInfo[]
};

type State = {
  isCreateOpen: boolean,
  isImportOpen: boolean
};

class Overview extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props);

    const { state : { isCreateOpen = false } = {} } = this.props.location;

    this.state = {
      isCreateOpen,
      isImportOpen: false
    };
  }

  render () {
    const { accounts, t } = this.props;
    const { isCreateOpen, isImportOpen } = this.state;
    const emptyScreen = !isCreateOpen && !isImportOpen && (!accounts || Object.keys(accounts).length === 0);

    return (
      <CardGrid
        buttons={
          <Button.Group>
            <Button
              isPrimary
              label={t('Add account')}
              onClick={this.toggleCreate}
            />
            <Button.Or />
            <Button
              isPrimary
              label={t('Restore JSON')}
              onClick={this.toggleImport}
            />
          </Button.Group>
        }
        isEmpty={emptyScreen}
        emptyText={t('No account yet?')}
      >
        {this.renderCreate()}
        {this.renderImport()}
        {accounts && Object.keys(accounts).map((address) => (
          <Account
            address={address}
            key={address}
          />
        ))}
      </CardGrid>
    );
  }

  private renderCreate () {
    const { isCreateOpen } = this.state;
    const { onStatusChange } = this.props;

    if (!isCreateOpen) {
      return null;
    }

    return (
      <CreateModal
        onClose={this.toggleCreate}
        onStatusChange={onStatusChange}
      />
    );
  }

  private renderImport () {
    const { isImportOpen } = this.state;
    const { onStatusChange } = this.props;

    if (!isImportOpen) {
      return null;
    }

    return (
      <ImportModal
        onClose={this.toggleImport}
        onStatusChange={onStatusChange}
      />
    );
  }

  private toggleCreate = (): void => {
    this.setState(({ isCreateOpen }) => ({
      isCreateOpen: !isCreateOpen
    }));
  }

  private toggleImport = (): void => {
    this.setState(({ isImportOpen }) => ({
      isImportOpen: !isImportOpen
    }));
  }
}

export default withMulti(
  Overview,
  translate,
  withObservable(accountObservable.subject, { propName: 'accounts' })
);