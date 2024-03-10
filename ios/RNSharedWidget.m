//
//  RNSharedWidget.m
//  PokeDex
//
//  Created by Daniel Felipe on 6/03/24.
//

#import <Foundation/Foundation.h>
#import "RNSharedWidget.h"
#import "PokeDex-Swift.h"

@implementation RNSharedWidget

NSUserDefaults *sharedDefaults;
NSString *appGroup = @"group.pokeFavorites";

-(dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE(RNSharedWidget)

//Exportar un Método: RCT_EXPORT_METHOD(setData: (NSString * )key: (NSString * )data:(RCTResponseSenderBlock)callback) define un método llamado setData que puede ser llamado desde JavaScript. Este método toma dos argumentos de tipo NSString (clave y datos) y un bloque de callback (RCTResponseSenderBlock), que se utiliza para enviar una respuesta de vuelta al código JavaScript. La macro RCT_EXPORT_METHOD hace que este método esté disponible para ser invocado desde el código JavaScript, permitiendo que el código nativo y el código JavaScript interactúen entre sí

RCT_EXPORT_METHOD(setData: (NSString *)key: (NSString * )data: (RCTResponseSenderBlock)callback) {
  sharedDefaults = [[NSUserDefaults alloc]initWithSuiteName:appGroup];
  
  if(sharedDefaults == nil) {
    callback(@[@0]);
    return;
  }

  [sharedDefaults setValue:data forKey:key];

  if(@available(iOS 14, *)) {
    [WidgetKitHelper reloadAllTimelines];
  }else {
    //Fallback on earlier versions
  }
  callback(@[[NSNull null]]);
}

@end

