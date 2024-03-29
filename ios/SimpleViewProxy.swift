//
//  SimpleViewProxy.swift
//  PokeDex
//
//  Created by Daniel Felipe on 26/03/24.
//

import SwiftUI
@available(iOS 13.0, *)
class MyDataStore: ObservableObject {
  @Published var title: NSString = ""
  @Published var onPressed: RCTBubblingEventBlock = {_ in }
}
class SimpleViewProxy: UIView {
  
  var returningView: UIView?
  let dataStore: MyDataStore = .init()
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    let vc = UIHostingController(rootView: SimpleViewSWUI().environmentObject(dataStore))
    vc.view.frame = bounds
    self.addSubview(vc.view)
    self.returningView = vc.view
  }
  
  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  @objc var title: NSString = "" {
    didSet{
      dataStore.title = title
    }
  }
  
  @objc var onPressed: RCTBubblingEventBlock = {_ in} {
    didSet{
      dataStore.onPressed = onPressed
    }
  }
  
  override func layoutSubviews() {
    super.layoutSubviews()
    self.returningView?.frame = bounds
  }
  
}
