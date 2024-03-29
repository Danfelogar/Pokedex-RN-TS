//
//  NativeARViewManager.swift
//  PokeDex
//
//  Created by Daniel Felipe on 26/03/24.
//

import Foundation
import React
import ARKit

@objc(NativeARViewManager)
class NativeARViewManager: RCTViewManager {
  
  private var nativeARView: ARSCNView = NativeARView(frame: .zero)
     
     override func view() -> UIView! {
         return nativeARView
     }
  
  override class func requiresMainQueueSetup() -> Bool {
    return true
  }
}

