//
//  SimpleViewManager.swift
//  PokeDex
//
//  Created by Daniel Felipe on 26/03/24.
//

import UIKit
@available(iOS 13.0, *)
@objc(SimpleViewManager)
class SimpleViewManager: RCTViewManager {
  
 override func view() -> SimpleViewProxy? {
   if #available(iOS 13.0, *) {
     return SimpleViewProxy()
   } else {
     return nil
   }
 }
  
 override class func requiresMainQueueSetup() -> Bool {
    return true
 }
}
