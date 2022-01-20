/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

//Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock("react-native-localize", () => {
  return {
    getLocales: jest.fn(),
    // you can add other functions mock here that you are using
  };
});

it('renders correctly', () => {
  renderer.create(<App />);
});

