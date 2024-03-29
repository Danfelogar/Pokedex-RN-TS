//
//  SimpleViewManager.m
//  PokeDex
//
//  Created by Daniel Felipe on 26/03/24.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>
@interface RCT_EXTERN_MODULE(SimpleViewManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(title, NSString)
RCT_EXPORT_VIEW_PROPERTY(onPressed, RCTBubblingEventBlock)
@end
