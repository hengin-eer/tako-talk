// @ts-nocheck
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
"use client";

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function OctopusModel(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/model/tako.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="アーマチュア" position={[0, 0.971, 0]} scale={0.204}>
          <group name="球002">
            <skinnedMesh
              name="球"
              geometry={nodes.球.geometry}
              material={materials.skin}
              skeleton={nodes.球.skeleton}
            />
            <skinnedMesh
              name="球_1"
              geometry={nodes.球_1.geometry}
              material={materials.skin_white}
              skeleton={nodes.球_1.skeleton}
            />
            <skinnedMesh
              name="球_2"
              geometry={nodes.球_2.geometry}
              material={materials.mouth}
              skeleton={nodes.球_2.skeleton}
            />
            <skinnedMesh
              name="球_3"
              geometry={nodes.球_3.geometry}
              material={materials.eye}
              skeleton={nodes.球_3.skeleton}
            />
            <skinnedMesh
              name="球_4"
              geometry={nodes.球_4.geometry}
              material={materials.eye_white}
              skeleton={nodes.球_4.skeleton}
            />
          </group>
          <primitive object={nodes.spine} />
          <primitive object={nodes.ikL001} />
          <primitive object={nodes.ikR001} />
          <primitive object={nodes.ikL002} />
          <primitive object={nodes.ikR002} />
          <primitive object={nodes.ikL004} />
          <primitive object={nodes.ikR004} />
          <primitive object={nodes.ikL005} />
          <primitive object={nodes.ikR005} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/model/tako.glb')
