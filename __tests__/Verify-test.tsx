/**
 * @format
 */

import 'react-native';
import React from 'react';
const fs = require('fs')
const path = require('path')

import { validate } from '../src/services/qr'



it('Verifies incorrectly', async () => {
  expect.assertions(1);
  const data = await validate([""]);
  expect(data).toEqual(undefined);
});

// it('Verifies incorrectly', async () => {
//   expect.assertions(1);

//   const data = fs.readFileSync(path.join(__dirname, 'fixtures/correct_data.txt'), 'utf8')
//   const res = await validate([data]);
//   expect(res).toEqual(undefined);
// });
