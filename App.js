import Loader from './Loader';

import SettingsProvider from './SettingsProvider';

export default function App() {
  return (
    <SettingsProvider>
      <Loader />
    </SettingsProvider>
  )
}

