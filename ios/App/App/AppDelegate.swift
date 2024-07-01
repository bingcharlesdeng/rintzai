import Capacitor
import CapacitorCordova

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
    var window: UIWindow?
    var bridgeViewController: CAPBridgeViewController?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        print("Application is launching")
        
        // Enable Capacitor logging
        CapacitorBridge.enableLogging(true)
        
        return true
    }
}
