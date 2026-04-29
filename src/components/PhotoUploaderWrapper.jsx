import { usePlatform } from '@/lib/PlatformContext';
import PhotoUploaderIOS from './PhotoUploaderIOS';
import PhotoUploaderAndroid from './PhotoUploaderAndroid';

export default function PhotoUploaderWrapper(props) {
  const platform = usePlatform();
  
  if (platform === 'ios') {
    return <PhotoUploaderIOS {...props} />;
  }
  
  return <PhotoUploaderAndroid {...props} />;
}