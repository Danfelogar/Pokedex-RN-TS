import {FC, ReactElement, ReactNode} from 'react';
import {Provider} from 'react-redux';
import {store} from '../redux/store';
import {render} from '@testing-library/react-native';

type Options = Parameters<typeof render>[1];

const AllTheProviders: FC<{children: ReactNode}> = ({children}) => (
  <Provider store={store}>{children}</Provider>
);

const customRender = (ui: ReactElement, options?: Options) =>
  render(ui, {wrapper: AllTheProviders, ...options});

export * from '@testing-library/react-native';
export {customRender as render};
