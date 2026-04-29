import { usePlatform } from '@/lib/PlatformContext';
import BottomNavIOS from './BottomNavIOS';
import BottomNavAndroid from './BottomNavAndroid';

export default function BottomNavWrapper() {
  const platform = usePlatform();
  
  if (platform === 'ios') {
    return <BottomNavIOS />;
  }
  
  return <BottomNavAndroid />;
}