import * as Font from "expo-font";
 
export default useFonts = async () =>
  await Font.loadAsync({
    'ar': require('../assets/fonts/Arturo-Regular.ttf'),
    'ab': require('../assets/fonts/Arturo-Bold.ttf'),
  });