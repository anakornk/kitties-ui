// Copyright 2017-2019 @polkadot/apps-routing authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Routes } from './types';

import Kitties from '@polkadot/app-kitties';

export default ([
  {
    Component: Kitties,
    display: {
      needsApi: [
        'tx.balances.transfer'
      ]
    },
    i18n: {
      defaultValue: 'Kitties'
    },
    icon: 'th',
    name: 'kitties'
  }
] as Routes);
