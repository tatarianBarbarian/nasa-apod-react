import { Image } from 'antd';
import 'antd/es/image/style/index.css';


export function Viewer({data = {}}) {
    const {url, hdurl, media_type} = data;
  
    if (media_type === 'image') {
      return (
        <Image 
            src={url}
            style={{maxHeight: '80vh', objectFit: 'contain'}}
            preview={{
              src: hdurl
            }} 
          />
      )
    }
  
    else {
      return <p style={{color: 'white'}}>Unsupported media type, try another day</p>
    }
  }