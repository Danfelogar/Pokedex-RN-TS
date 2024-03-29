//
//  SimpleViewSWUI.swift
//  PokeDex
//
//  Created by Daniel Felipe on 26/03/24.
//

import SwiftUI
@available(iOS 13.0, *)
struct SimpleViewSWUI: View {
  @EnvironmentObject var dataStore: MyDataStore
  
  var body: some View {
    VStack{
      Button(action: {
        dataStore.onPressed(["data": "some data by native side"])
      }, label: {
        Text("\(dataStore.title)")
      })
    }
  }
}
