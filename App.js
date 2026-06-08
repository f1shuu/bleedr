import { SafeAreaProvider } from 'react-native-safe-area-context';

import Loader from './Loader';

import SettingsProvider from './SettingsProvider';

export default function App() {
  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <Loader />
      </SettingsProvider>
    </SafeAreaProvider>
  )
}
