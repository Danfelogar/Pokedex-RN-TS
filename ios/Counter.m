//
//  Counter.m
//  PokeDex
//
//  Created by Daniel Felipe on 6/03/24.
//

#import <Foundation/Foundation.h>

#import <React/RCTBridgeModule.h>


@interface RCT_EXTERN_MODULE(Counter, NSObject);

RCT_EXTERN_METHOD(increment:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(decrement:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

@end
