#import "AppDelegate.h"
#import <Firebase.h>
#import <React/RCTBundleURLProvider.h>

// para la certificacion ssl
#import <TrustKit/TrustKit.h>
#import <TrustKit/TSKPinningValidator.h>
#import <TrustKit/TSKPinningValidatorCallback.h>

@implementation AppDelegate

// Define the loggerBlock outside of any method
void (^loggerBlock)(NSString *) = ^void(NSString *message) {
  NSLog(@"TrustKit log: %@", message);
};

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions

{

  [FIRApp configure];
  self.moduleName = @"PokeDex";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  
  NSDictionary *trustKitConfig =
  @{
    kTSKSwizzleNetworkDelegates: @YES,
    kTSKPinnedDomains : @{
      @"pokeapi.co" : @{
        kTSKIncludeSubdomains: @YES,
        kTSKEnforcePinning: @YES,
        kTSKDisableDefaultReportUri: @YES,
        kTSKPublicKeyHashes : @[
          @"eVr/eyROosdTqxrORu3/RD5wbJcsquAF6L2Qj4Q2cRw=",
          @"BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB=",
        ],
      },
    }
  };
  [TrustKit initSharedInstanceWithConfiguration:trustKitConfig];
  [TrustKit setLoggerBlock:loggerBlock];
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end

