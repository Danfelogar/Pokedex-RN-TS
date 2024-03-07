//
//  RNSharedWidget.h
//  PokeDex
//
//  Created by Daniel Felipe on 6/03/24.
//

#import <Foundation/Foundation.h>
#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif

@interface RNSharedWidget: NSObject<RCTBridgeModule>

@end
