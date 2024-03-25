//
//  ViewController.swift
//  PokeCard3D
//
//  Created by Daniel Felipe on 24/03/24.
//

import UIKit
import SceneKit
import ARKit

class ViewController: UIViewController, ARSCNViewDelegate {
  
  @IBOutlet var sceneView: ARSCNView!
  
  override func viewDidLoad() {
    super.viewDidLoad()
    
    // Set the view's delegate
    sceneView.delegate = self
    
    // Show statistics such as fps and timing information
    sceneView.showsStatistics = true
    
    sceneView.autoenablesDefaultLighting = true
    
    
  }
  
  override func viewWillAppear(_ animated: Bool) {
    super.viewWillAppear(animated)
    
    // Create a session configuration
    //single
    //    let configuration = ARImageTrackingConfiguration()
    let configuration = ARWorldTrackingConfiguration()
    
    guard let imgToTrack = ARReferenceImage.referenceImages(inGroupNamed: "Pokemon Cards", bundle: Bundle.main) else {
      let alertController = UIAlertController(title: "Error", message: "No reference images found for Pokemon tracking.", preferredStyle: .alert)
      let defaultAction = UIAlertAction(title: "OK", style: .default, handler: nil)
      alertController.addAction(defaultAction)
      self.present(alertController, animated: true, completion: nil)
      print("No reference images found for Pokemon tracking.")
      return
    }
    
    configuration.detectionImages = imgToTrack
    
    configuration.maximumNumberOfTrackedImages = 7
    
    print("Img Successfully Added")
    
    // Run the view's session
    sceneView.session.run(configuration)
  }
  
  override func viewWillDisappear(_ animated: Bool) {
    super.viewWillDisappear(animated)
    
    // Pause the view's session
    sceneView.session.pause()
  }
  
  // MARK: - ARSCNViewDelegate
  
  func renderer(_ renderer: SCNSceneRenderer, nodeFor anchor: ARAnchor) -> SCNNode? {
    
    let node = SCNNode()
    
    if let imgAnchor = anchor as? ARImageAnchor {
      
      print(imgAnchor.referenceImage.name)
      
      let plane = SCNPlane(width: imgAnchor.referenceImage.physicalSize.width, height: imgAnchor.referenceImage.physicalSize.height)
      
      plane.firstMaterial?.diffuse.contents = UIColor(white: 1.0, alpha: 0.5)
      
      let planeNode = SCNNode(geometry: plane)
      
      planeNode.eulerAngles.x = -.pi / 2
      
      node.addChildNode(planeNode)
      //reference dictionary
      let sceneMapping: [String: String] = [
        "aggron": "art.scnassets/Aggron.scn",
        "pikachu": "art.scnassets/Pikachu.scn",
        "raichu": "art.scnassets/Raichu.scn",
        "glaceon": "art.scnassets/Glaceon.scn",
        "darkrai": "art.scnassets/Darkrai.scn",
        "butterfree": "art.scnassets/Butterfree.scn",
        "shaymin": "art.scnassets/Shaymin.scn",
      ]
      
      if let sceneName = sceneMapping[imgAnchor.referenceImage.name!] {
        if let pokeScene = SCNScene(named: sceneName),
           let pokeNode = pokeScene.rootNode.childNodes.first {
          pokeNode.eulerAngles.x = .pi / 2
          planeNode.addChildNode(pokeNode)
        }
      }

    }
    
    return node
  }
}


