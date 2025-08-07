import React from 'react'

function Cube({height, width, depth, ref, xRotation, yRotation}) {
  return (
    <mesh ref={ref} rotation={[0, xRotation || 0, yRotation || 0]}>
      <boxGeometry args={[height, width, depth]} />
      <meshBasicMaterial wireframe />
    </mesh>
  )
}

export default Cube
