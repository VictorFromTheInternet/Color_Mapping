import React from 'react'

function Cube({height, width, depth, ref, xRotation, yRotation, colors=[]}) {
  
  function hexToRgb(str){
    // let R = parseInt(str.slice(1,3), 16) - (255/2)
    // let G = parseInt(str.slice(3,5), 16) - (255/2)
    // let B = parseInt(str.slice(5), 16) - (255/2)
    let R = parseInt(str.slice(1,3), 16) 
    let G = parseInt(str.slice(3,5), 16) 
    let B = parseInt(str.slice(5), 16) 
    // console.log(`${R}, ${G}, ${B}, ${A}`)
    return [R,G,B]
  }

  function colorToPercent(color){
    // interpolate, 0-255 -> 0-100
    const conversion = (100 / 255)

    let R = Math.floor((color[0] * 100) / 255)
    let G = Math.floor((color[1] * 100) / 255)
    let B = Math.floor((color[2] * 100) / 255)
        
    return `rgb(${R}%,${G}%,${B}%)`
  }
  
  return (
    // add a group
    <group ref={ref} rotation={[0, xRotation || 0, yRotation || 0]}>
      <mesh position={[0,0,0]}>
        <boxGeometry args={[height, width, depth]} />
        <meshBasicMaterial wireframe />

        {/* colors.map */}
        {
          colors.map((color,index)=>{            
            const pos = hexToRgb(color)
            console.log(pos)
            // const colorPercent = colorToPercent(color)

            return(              
              <mesh key={index} position={pos}>
                <sphereGeometry args={[10, 25, 6]} />
                {/* <meshBasicMaterial color={color.replace('#','')}  opacity={1} /> */}
                {/* <meshBasicMaterial color={`rgb(${pos[0]}%,${pos[1]}%,${pos[2]}%)`}  opacity={1} /> */}
                <meshBasicMaterial color={`rgb(${pos[0]},${pos[1]},${pos[2]})`}  opacity={1} />
              </mesh>
            )
          })
        }
      </mesh>
    </group>
    
  )
}

export default Cube
