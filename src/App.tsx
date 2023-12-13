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
      <div className='py-10 flex flex-row justify-center w-screen'>
        <div className='w-1/2 flex flex-col justify-center content-center'>
          <h1 className='text-luna text-4xl font-bold w-fit'>닮은 쌤 찾기</h1>
          <h2 className='text-xl w-fit mb-1'>In <span className='font-black'>DIMIGO</span></h2>
          <video ref={video} className='rounded-xl w-full' height="480" autoPlay></video>
          <button className='w-full my-2 bg-luna text-white rounded-xl py-2 font-bold' onClick={startOrStop}>
            {playing ? '나와 닮은 쌤 찾기!' : '나와 닮은 쌤 찾기'}
          </button>

          <div className='mt-20'></div>
          <div className='flex flex-row'>
            <img className='rounded-xl mr-5' width={300} src='https://luna.codes/img/member/profile/user/%EA%B9%80%ED%98%95%EC%84%9D.png'/>
            <div className='w-96'>
              <h1 className='text-3xl font-bold'>김형석쌤</h1>
              <p>푸근한 인상과 반전 몸매로 인기만점인 형석쌤! 김형석쌤은 친근하고 유쾌한 강의 스타일로 많은 학생들에게 사랑받고 있는 교육 전문가입니다. 그의 명쾌한 설명과 학습 방법은 수많은 학습자들에게 직관적이고 효과적으로 전해져, 그의 강의는 항상 만점 평가를 받고 있습니다. 김형석쌤은 자신만의 독특한 매력과 전문성으로 학문의 세계에서 돋보이고 있습니다.</p>
            </div>
          </div>
          
          {/* <div className='grid grid-cols-3 mt-1'>
            <div className=''>쌤 이미지</div>
            <div className=''>쌤 이미지</div>
            <div className=''>쌤 이미지</div>
          </div> */}
        </div>
      </div>
    </>
  )
}

export default App
