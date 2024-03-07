import React from 'react';
import {Button, NativeModules} from 'react-native';

console.log('NativeModules', NativeModules.Counter);
NativeModules.Counter.increment((value: any) => {
  console.log('the counter is:' + value);
});
console.log('NativeModules 2', NativeModules.Counter.getConstants());

export const CounterSwift = () => {
  const decrement = async () => {
    try {
      const result = await NativeModules.Counter.decrement();
      console.log('decrement', result);
    } catch (error: any) {
      console.log('decrement error', error.message, 'error code', error.code);
    }
  };
  return <Button title="Decrement" onPress={decrement} />;
};
