import { usePlatform } from '@/lib/PlatformContext';
import ResultCardIOS from './ResultCardIOS';
import ResultCardAndroid from './ResultCardAndroid';

export default function ResultCardWrapper(props) {
  const platform = usePlatform();
  
  if (platform === 'ios') {
    return <ResultCardIOS {...props} />;
  }
  
  return <ResultCardAndroid {...props} />;
}