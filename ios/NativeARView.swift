//
//  NativeARView.swift
//  PokeDex
//
//  Created by Daniel Felipe on 26/03/24.
//
import Foundation
import UIKit
import SceneKit
import ARKit

final class NativeARView: ARSCNView, ARSCNViewDelegate {
  override init(frame: CGRect) {
    super.init(frame: frame, options: [:])
    self.delegate = self
    setupView()
  }
  
  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  private func setupView() {
    let configuration = ARImageTrackingConfiguration()
    
    guard let referenceImages = ARReferenceImage.referenceImages(inGroupNamed: "Pokemon Cards", bundle: Bundle.main) else {
      fatalError("No reference images found for Pokemon tracking.")
    }
    
    configuration.trackingImages = referenceImages
    configuration.maximumNumberOfTrackedImages = 7
    
    self.session.run(configuration)
  }
  
  func renderer(_ renderer: SCNSceneRenderer, nodeFor anchor: ARAnchor) -> SCNNode? {
    guard let imageAnchor = anchor as? ARImageAnchor else { return nil }
    
    let node = SCNNode()
    let plane = SCNPlane(width: imageAnchor.referenceImage.physicalSize.width, height: imageAnchor.referenceImage.physicalSize.height)
    plane.firstMaterial?.diffuse.contents = UIColor(white: 1.0, alpha: 0.5)
    
    let planeNode = SCNNode(geometry: plane)
    planeNode.eulerAngles.x = -.pi / 2
    node.addChildNode(planeNode)
    
    let sceneMapping: [String: String] = [
      "aggron": "art.scnassets/Aggron.scn",
      "pikachu": "art.scnassets/Pikachu.scn",
      "raichu": "art.scnassets/Raichu.scn",
      "glaceon": "art.scnassets/Glaceon.scn",
      "darkrai": "art.scnassets/Darkrai.scn",
      "butterfree": "art.scnassets/Butterfree.scn",
      "shaymin": "art.scnassets/Shaymin.scn",
      "dracozolt": "art.scnassets/Dracozolt.scn"
    ]
    
    if let sceneName = sceneMapping[imageAnchor.referenceImage.name!] {
      if let pokeScene = SCNScene(named: sceneName),
         let pokeNode = pokeScene.rootNode.childNodes.first {
        pokeNode.eulerAngles.x = .pi / 2
        planeNode.addChildNode(pokeNode)
      }
    }
    
    return node
  }
}
