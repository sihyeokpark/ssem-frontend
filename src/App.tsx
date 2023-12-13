import { useState, useRef, useEffect } from 'react'

function App() {
  const [playing, setPlaying] = useState(false);
  const video = useRef<HTMLVideoElement>(null)

  function getWebcam(callback: (stream: MediaProvider) => void) {
    let constraints = { audio: false, video: true }
    navigator.mediaDevices.getUserMedia(constraints).then(callback)
  }

  useEffect(() => {
    getWebcam((stream => {
      setPlaying(true);
      video.current!.srcObject = stream;
    }));
    startOrStop();
  }, []);

  const startOrStop = () => {
    if (playing) {
      const mediaStream = video.current!.srcObject as MediaStream;
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    } else {
      getWebcam((stream) => {
        setPlaying(true);
        video.current!.srcObject = stream;
      });
    }
    setPlaying(!playing);
  }

  

  return (
    <>
      <div className='py-10 flex flex-row justify-center w-full'>
        <div className='w-auto flex flex-col justify-center content-center'>
          <h1 className='text-luna text-4xl font-bold w-fit'>닮은 쌤 찾기</h1>
          <h2 className='text-xl w-fit mb-5'>In <span className='font-black'>DIMIGO</span></h2>
          <video ref={video} className='rounded-xl' width="640" height="480" autoPlay></video>
        </div>
      </div>
    </>
  )
}

export default App
