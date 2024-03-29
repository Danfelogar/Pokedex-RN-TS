import {FC, useEffect, useState} from 'react';
import {SafeAreaView, ViewStyle, requireNativeComponent} from 'react-native';
import {PERMISSIONS, request} from 'react-native-permissions';

const NativeComponent = requireNativeComponent(
  'NativeARView',
) as unknown as FC<{
  style: ViewStyle;
}>;

const SimpleNativeView = requireNativeComponent(
  'SimpleView',
) as unknown as React.FC<{
  title?: string;
  onPressed?: (event: any) => void;
  style: ViewStyle;
}>;

export function Poke3DModels() {
  const [hasCameraPermission, setHasCameraPermission] = useState(false);

  const getPermission = async () => {
    const status = await request(PERMISSIONS.IOS.CAMERA);

    if (status === 'granted') {
      console.log('Permission granted');
      setHasCameraPermission(true);
    } else {
      console.log('Permission denied');
      setHasCameraPermission(false);
    }
  };

  useEffect(() => {
    getPermission();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {hasCameraPermission && <NativeComponent style={{flex: 1}} />}
      {/* <SimpleNativeView
        title="test2"
        onPressed={e => {
          console.log('pressed', e.nativeEvent.data);
        }}
        style={{
          flex: 1,
        }}
      /> */}
    </SafeAreaView>
  );
}

export default Poke3DModels;
