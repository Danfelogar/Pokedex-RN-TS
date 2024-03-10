//
//  PokeFavorites.swift
//  PokeFavorites
//
//  Created by Daniel Felipe on 6/03/24.
//

import WidgetKit
import SwiftUI

struct Provider: AppIntentTimelineProvider {
  func placeholder(in context: Context) -> SimpleEntry {
    SimpleEntry(date: Date(), configuration: ConfigurationAppIntent(), data: samplePokeFav)
  }
  
  func snapshot(for configuration: ConfigurationAppIntent, in context: Context) async -> SimpleEntry {
    SimpleEntry(date: Date(), configuration: configuration, data: samplePokeFav)
  }
  
  func timeline(for configuration: ConfigurationAppIntent, in context: Context) async -> Timeline<SimpleEntry> {
    var entries: [SimpleEntry] = []
    
    //parsing custom data
    let userDefaults = UserDefaults.init(suiteName: "group.pokeFavorites")
    guard let jsonText = userDefaults?.value(forKey: "pokeFavoriteList") as? String,
          let jsonData = jsonText.data(using: .utf8) else {
        // Handle the case where JSON data is not available or cannot be converted to Data
        return Timeline(entries: entries, policy: .atEnd)
    }
    
    // Attempt to decode the JSON data
    do {
        let valuesData = try JSONDecoder().decode([PokeFavData].self, from: jsonData)
        
        // Generate a timeline consisting of five entries an hour apart, starting from the current date.
        let currentDate = Date()
        for hourOffset in 0 ..< 5 {
            let entryDate = Calendar.current.date(byAdding: .hour, value: hourOffset, to: currentDate)!
            let entry = SimpleEntry(date: entryDate, configuration: configuration, data: valuesData)
            entries.append(entry)
        }
    } catch {
        // Log the error or handle it as appropriate
        print("Failed to decode JSON: \(error)")
    }
    
    return Timeline(entries: entries, policy: .atEnd)
  }
}
//: Protocol name TimelineEntry needed indentify if someone variable is update or not
struct SimpleEntry: TimelineEntry {
  let date: Date
  let configuration: ConfigurationAppIntent
  let data: [PokeFavData]
}

struct PokeFavoritesEntryView : View {
  var entry: Provider.Entry
  
  var body: some View {
    VStack {
      Text("Time:")
      Text(entry.date, style: .time)
      ForEach(entry.data, id: \.id ) { poke in
        Text("\(poke.name)")
      }
//      Text("Favorite Emoji: 2")
//      Text(entry.configuration.favoriteEmoji)
    }
  }
}

struct PokeFavorites: Widget {
  let kind: String = "PokeFavorites"
  
  var body: some WidgetConfiguration {
    AppIntentConfiguration(kind: kind, intent: ConfigurationAppIntent.self, provider: Provider()) { entry in
      PokeFavoritesEntryView(entry: entry)
        .containerBackground(.fill.tertiary, for: .widget)
    }
  }
}

extension ConfigurationAppIntent {
  fileprivate static var smiley: ConfigurationAppIntent {
    let intent = ConfigurationAppIntent()
    intent.favoriteEmoji = "😀"
    return intent
  }
  
  fileprivate static var starEyes: ConfigurationAppIntent {
    let intent = ConfigurationAppIntent()
    intent.favoriteEmoji = "🤩"
    return intent
  }
}

#Preview(as: .systemSmall) {
  PokeFavorites()
} timeline: {
  SimpleEntry(date: .now, configuration: .smiley, data: samplePokeFav)
  SimpleEntry(date: .now, configuration: .starEyes, data: samplePokeFav)
}
