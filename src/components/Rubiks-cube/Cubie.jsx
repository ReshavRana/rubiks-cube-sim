import React from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const CubieBody = ({ geometry }) => (
  <mesh geometry={geometry}>
    <meshStandardMaterial color="#050505" roughness={0.2} metalness={0.8} side={THREE.DoubleSide} />
  </mesh>
);

export const CornerCubie = ({ colors, position = [0, 0, 0], rotation = [0, 0, 0], x=0 , y=0 ,z=0 ,...props }) => {
  const { nodes } = useGLTF('/corner-cubie.glb')
  return (
    <group position={position} rotation={rotation} {...props}>
      <group position={[0, 0, 0]} scale={100}>
        <CubieBody geometry={nodes['3_Black_0001_1'].geometry} />
        <mesh geometry={nodes['3_Black_0001_2'].geometry}>
          <meshStandardMaterial color={colors?.top || colors?.bottom || 'black'} side={THREE.DoubleSide} polygonOffset polygonOffsetFactor={-1} />
        </mesh>
        <mesh geometry={nodes['3_Black_0001_3'].geometry}>
          <meshStandardMaterial color={colors?.front || colors?.back || 'black'} side={THREE.DoubleSide} polygonOffset polygonOffsetFactor={-1} />
        </mesh>
        <mesh geometry={nodes['3_Black_0001_4'].geometry}>
          <meshStandardMaterial color={colors?.left || colors?.right || 'black'} side={THREE.DoubleSide} polygonOffset polygonOffsetFactor={-1} />
        </mesh>
      </group>
    </group>
  )
}

export const EdgeCubie = ({ colors, position = [0, 0, 0], rotation = [0, 0, 0], x=0 , y=0 ,z=0 , ...props }) => {
  const { nodes } = useGLTF('/edge-cubie.glb')
  return (
    <group position={position} rotation={rotation} {...props}>
      <group position={[0, 0, 0]} scale={100}>
        <CubieBody geometry={nodes['24_Black_0001_1'].geometry} />
        <mesh geometry={nodes['24_Black_0001_2'].geometry}>
          <meshStandardMaterial color={colors?.top || colors?.bottom || colors?.left || colors?.right || 'black'} side={THREE.DoubleSide} polygonOffset polygonOffsetFactor={-1} />
        </mesh>
        <mesh geometry={nodes['24_Black_0001_3'].geometry}>
          <meshStandardMaterial color={colors?.front || colors?.back || 'black'} side={THREE.DoubleSide} polygonOffset polygonOffsetFactor={-1} />
        </mesh>
      </group>
    </group>
  )
}

const getCenterCubieColor = (x,y,z,colors)=>{
  // console.log("reshav center cubie color",{x,y,z,colors})
  if(x === -1){
    return colors.back;
  }
  else if(x === 1){
    return colors.front;
  }
  else if( y === 1){
    return colors.left;
  }
  else if( y === -1){
    return colors.right;
  }
  else if( z === 1){
    return colors.top;
  }
  else if( z === -1){
    return colors.bottom;
  }
}

export const CenterCubie = ({ colors, position = [0, 0, 0], rotation = [0, 0, 0], x=0 , y=0 ,z=0 , ...props }) => {
  const { nodes } = useGLTF('/center-cubie.glb')
  const cubieColor = getCenterCubieColor(x,y,z,colors);
  console.log("Reshav ",{cubieColor})
  
  // Extract the single color value from the object (e.g., "white" or "red")
  const activeColor = cubieColor;

  return (
    <group position={position} rotation={rotation} {...props}>
      <group position={[0, 0, 0]} scale={100}>
        <CubieBody geometry={nodes['22_Black_0003'].geometry} />
        <mesh geometry={nodes['22_Black_0003_1'].geometry}>
          <meshStandardMaterial 
            color={activeColor} 
            side={THREE.DoubleSide} 
            polygonOffset 
            polygonOffsetFactor={-1} 
          />
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload(['/center-cubie.glb', '/edge-cubie.glb', '/corner-cubie.glb'])