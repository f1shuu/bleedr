import { Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import useFonts from './hooks/useFonts';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFonts = async () => {
      await useFonts({
        'ar': require('./assets/fonts/Arturo-Regular.ttf'),
        'ab': require('./assets/fonts/Arturo-Bold.ttf'),
      });
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
    };
    loadFonts();
  }, []);

  return (
    <>
      {isLoading ? (
        <View />
      ) : (
        <Text>Init</Text>
      )}
    </>
  );
}