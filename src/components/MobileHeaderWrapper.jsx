import { usePlatform } from '@/lib/PlatformContext';
import MobileHeaderIOS from './MobileHeaderIOS';
import MobileHeaderAndroid from './MobileHeaderAndroid';

export default function MobileHeaderWrapper({ title }) {
  const platform = usePlatform();
  
  if (platform === 'ios') {
    return <MobileHeaderIOS title={title} />;
  }
  
  return <MobileHeaderAndroid title={title} />;
}