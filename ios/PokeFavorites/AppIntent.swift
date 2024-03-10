//
//  AppIntent.swift
//  PokeFavorites
//
//  Created by Daniel Felipe on 6/03/24.
//

import WidgetKit
import AppIntents

struct ConfigurationAppIntent: WidgetConfigurationIntent {
  static var title: LocalizedStringResource = "Favorites Pokemons List"
  static var description = IntentDescription("Pick your favoretis pokemons since the app.")
  
  // An example configurable parameter.
  @Parameter(title: "Favorite Emoji", default: "😃")
  var favoriteEmoji: String
}

struct PokeFavData: Codable {
  let id: String
  let name: String
  let url: String
}

let samplePokeFav: [PokeFavData] = [
  PokeFavData(id: "6", name: "charizard", url: "dummy.con"),
  PokeFavData(id: "34", name: "nidoking", url: "dummy.con"),
  PokeFavData(id: "130", name: "gyarados", url: "dummy.con"),
  PokeFavData(id: "135", name: "jolteon", url: "dummy.con"),
  PokeFavData(id: "143", name: "snorlax", url: "dummy.con"),
  PokeFavData(id: "149", name: "dragonite", url: "dummy.con")
]

let samplePokeFavHalf: [PokeFavData] = [
  PokeFavData(id: "6", name: "charizard", url: "dummy.con"),
  PokeFavData(id: "130", name: "gyarados", url: "dummy.con"),
  PokeFavData(id: "143", name: "snorlax", url: "dummy.con")
]
