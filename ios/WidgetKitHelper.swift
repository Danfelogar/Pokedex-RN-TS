//
//  WidgetKitHelper.swift
//  PokeDex
//
//  Created by Daniel Felipe on 7/03/24.
//

import WidgetKit

@available(iOS 14, *)
@objcMembers final class WidgetKitHelper: NSObject {
  class func reloadAllTimelines(){
    WidgetCenter.shared.reloadAllTimelines()
  }
}
