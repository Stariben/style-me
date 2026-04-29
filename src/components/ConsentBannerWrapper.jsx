import { usePlatform } from '@/lib/PlatformContext';
import ConsentBannerIOS from './ConsentBannerIOS';
import ConsentBannerAndroid from './ConsentBannerAndroid';

export default function ConsentBannerWrapper() {
  const platform = usePlatform();
  
  if (platform === 'ios') {
    return <ConsentBannerIOS />;
  }
  
  return <ConsentBannerAndroid />;
}