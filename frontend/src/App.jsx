import { useState, useRef, useEffect} from 'react'
import './App.css'
import LoadingSpinner from './components/LoadingSpinner'
import { Canvas } from '@react-three/fiber'

import Cube from './components/Cube'

function App() {

  const [colorInputs, setColorInputs] = useState([])
  const [numColors, setNumColors] = useState(1)    
  const [isLoading, setIsLoading] = useState(false)
  const canvasRef = useRef()
  const [canvasDimensions, setCanvasDimensions] = useState(0)

  const [xValue, setXValue] = useState(0)
  const [yValue, setYValue] = useState(0)
  const cubeRef = useRef()
  const [cubeHeight, setCubeHeight] = useState(255)
  const [cubeWidth, setCubeWidth] = useState(255)
  const [cubeDepth, setCubeDepth] = useState(255)
  
  

  // handle colors arr
  function handleRangeChange(e){
    setNumColors(e.target.value)
    handleColorInputs(e.target.value)
  }

  function handleColorInputs(n){
    console.log(n)
    const diff = n-colorInputs.length
    if(diff > 0){
      // push color
      let tempArr = []
      for(let i=0; i<diff; i++){
        tempArr.push('#000000')
      }    
      
      setColorInputs( [...colorInputs, ...tempArr])

    }else{
      // pop color       
      console.log(colorInputs.slice(0,n))
      setColorInputs(colorInputs.slice(0,n))
    }
  }


  // Canvas Responsiveness
  useEffect(()=>{

    function updateCanvasSize(){
      const sideLength = Math.min(window.innerHeight /2, window.innerWidth /2)
      setCanvasDimensions(sideLength)
    }    
    updateCanvasSize()


    window.addEventListener('resize', updateCanvasSize)



    // add event listener
    return ()=>{
      window.removeEventListener(resizeBy, updateCanvasSize)
    }

  },[])


  return (
    <>
      {/* <h1>Color Reducer!</h1> */}

      <div className="p-0 sm:px-4 sm:py-8 min-h-screen flex flex-col justify-center items-center max-w-[70vw] mx-auto w-[90vw] sm:max-w-[70vw] sm:w-auto">
          <div className="p-4 sm:p-6 rounded-xl bg-white w-full shadow-lg">
            <form action="">

              <div className="mb-4">
                <label htmlFor="numColors" className="block text-sm sm:text-base mb-2">How many colors (1-10):</label>
                <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-1">
                  <p>1</p>
                  <p>10</p>
                </div>
                <div className="flex gap-3 justify-between items-center">
                  <input 
                  type="range" id="numColors" min="1" max="10" onChange={handleRangeChange} value={numColors} required
                  className="flex-1"
                  />
                  <span className="text-sm sm:text-base font-medium min-w-[2rem] text-center">{numColors}</span>
                </div>        
              </div>                         

              <div className="mb-4">
                <label className="block text-sm sm:text-base mb-2">Select Colors:</label>
                <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                  {
                    colorInputs.map((elm, ind)=>{
                      return(
                        <input type="color" 
                        key={ind}
                        id={ind}
                        value={elm} 
                        className="w-full h-10 sm:h-12 rounded-md cursor-pointer border border-gray-300"
                        onChange={(e)=>{
                          let newInputs = [...colorInputs ]
                          newInputs[ind] = e.target.value
                          setColorInputs(newInputs)
                        }}/>
                      )
                    })
                  }
                </div>
              </div>

                        
                  {/* submit btn */}
              
            </form>

            {/* canvas */}
            <Canvas 
              style={{backgroundColor: "rgba(0,0,0,1)", height: canvasDimensions}}
              camera={{position: [400,50,0], fov: 60}}
              > 


              <ambientLight intensity={0.1}/>
              
              <directionalLight color="red" position={[300, 300, 300]} />
              <Cube 
                  height={cubeHeight} 
                  width={cubeWidth} 
                  depth={cubeDepth} 
                  ref={cubeRef} 
                  xRotation={(xValue * Math.PI) / 180} 
                  yRotation={(yValue * Math.PI) / 180} />
              <meshStandardMaterial wireframe/>              
            </Canvas>  

            <div className="mb-4">
                <label htmlFor="xValue" className="block text-sm sm:text-base mb-2">X:</label>
                <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-1">
                  <p>0</p>
                  <p>360</p>
                </div>
                <div className="flex gap-3 justify-between items-center">
                  <input 
                  type="range" id="numColors" min="0" max="360" onChange={(e)=>{setXValue(e.target.value)}} value={xValue} required
                  className="flex-1"
                  />
                  <span className="text-sm sm:text-base font-medium min-w-[2rem] text-center">{xValue}</span>
                </div>        
              </div>       

              <div className="mb-4">
                <label htmlFor="numColors" className="block text-sm sm:text-base mb-2">Y:</label>
                <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-1">
                  <p>0</p>
                  <p>360</p>
                </div>
                <div className="flex gap-3 justify-between items-center">
                  <input 
                  type="range" id="numColors" min="0" max="360" onChange={(e)=>{setYValue(e.target.value)}} value={yValue} required
                  className="flex-1"
                  />
                  <span className="text-sm sm:text-base font-medium min-w-[2rem] text-center">{yValue}</span>
                </div>        
              </div>       
              
          </div>
      </div>
    </>
  )
}

export default App
