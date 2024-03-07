//
//  Counter.swift
//  PokeDex
//
//  Created by Daniel Felipe on 6/03/24.
//

import Foundation

@objc(Counter)
class Counter: NSObject {
  
  private var count = 0;
  
  @objc
  func increment(_ callback:RCTResponseSenderBlock) {
    count += 1;
    //print(count)
    callback([count])
  }
  
  @objc
  static func requiresMainQueueSetup() ->Bool {
    return true;
  }
  
  @objc
  func constantsToExport() -> [String: Any]! {
    return ["initialCount": 0];
  }
  
  @objc
  func decrement(_ resolve: RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock){
    if(count == 0){
      let error = NSError(domain: "", code: 200, userInfo: nil);
      reject("ERROR_COUNT","count cannot be negative",error);
    } else {
      count -= 1;
      resolve("count is \(count)");
    }
  }
}
