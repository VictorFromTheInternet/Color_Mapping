import React from 'react'

function Cube({height, width, depth, ref, xRotation, yRotation, colors=[]}) {
  
  function hexToRgb(str){
    let R = parseInt(str.slice(1,3), 16)
    let G = parseInt(str.slice(3,5), 16)
    let B = parseInt(str.slice(5), 16)
    
    // console.log(`${R}, ${G}, ${B}, ${A}`)
    return [R,G,B]
  }
  
  return (
    // add a group
    <group ref={ref} rotation={[0, xRotation || 0, yRotation || 0]}>
      <mesh >
        <boxGeometry args={[height, width, depth]} />
        <meshBasicMaterial wireframe />

        {/* colors.map */}
        {
          colors.map((color,index)=>{
            const position = hexToRgb(color)

            return(              
              <mesh key={index} position={position}>
                <sphereGeometry args={[5, 8, 6]} />
                <meshBasicMaterial color={color.replace('#','')}  opacity={1} />
              </mesh>
            )
          })
        }
      </mesh>
    </group>
    
  )
}

export default Cube
