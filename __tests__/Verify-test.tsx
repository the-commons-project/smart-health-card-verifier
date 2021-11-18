/**
 * @format
 */

import 'react-native';
import React from 'react';

import { validate } from '../src/services/qr'


it('Verifies incorrectly', async () => {
  expect.assertions(1);
  const data = await validate([""]);
  expect(data).toEqual(undefined);
});
