import React from 'react'

function Cube({height, width, depth, ref, xRotation, yRotation}) {
  return (
    <mesh ref={ref} rotation={[yRotation || 0, xRotation || 0, 0]}>
      <boxGeometry args={[height, width, depth]} />
      <meshBasicMaterial wireframe />
    </mesh>
  )
}

export default Cube
