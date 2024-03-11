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
  //MARK: - Properties
  var entry: Provider.Entry
  //MARK: - Functions
  
  func getRandomLvl() -> Int {
    return Int.random(in: 50...100)
  }
  
  //MARK: - Body
  var body: some View {
    GeometryReader { geometry in
      HStack(alignment: .top , spacing: 5) {
        VStack {
          ForEach(entry.data.indices.filter { $0 % 2 == 0 }, id: \.self) { index in
            let poke = entry.data[index]
            // Aquí va el contenido de tu HStack para los índices impares
            HStack(spacing: 2) {
              if let url = URL(string: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/\(poke.id).png"), let imageData = try? Data(contentsOf: url), let uiImage = UIImage(data: imageData) {
                Image(uiImage: uiImage)
                  .resizable()
                  .scaledToFit()
                  .frame(width: geometry.size.width * 0.12, height: geometry.size.width * 0.12)
                  .transition(.scale)
                  .padding(.leading, 2)
              }
              
              VStack(alignment: .leading, spacing: 0) {
                Text("\(poke.name.prefix(1).uppercased() + poke.name.dropFirst())")
                  .font(.system(size: geometry.size.width * 0.038))
                  .fontWeight(.medium)
                
                HStack{
                  Text("Lv. \(getRandomLvl())")
                    .font(.system(size: geometry.size.width * 0.03))
                    .fontWeight(.light)
                  
                  Spacer()
                  
                  getRandomGener()
                    .shadow(radius: 0)
                }//:HStack
                .padding(.trailing, 3)
              }//: VStack
              
              
              TriangleAndSquareShape()
                .fill(Color.blue)
                .frame(width: geometry.size.width * 0.1, height: geometry.size.height * 0.3)
                .shadow(radius: 0)
            }//: HStack
            .frame(width: geometry.size.width * 0.48, height: geometry.size.height * 0.3)
            .background(Color.gray.opacity(0.7).shadow(color: .black.opacity(0.5), radius: 5, x: 0, y: 5))
            .clipShape(RoundedRectangle(cornerRadius: 5))
          }//: Loop
        }//: VStack
        
        VStack {
          ForEach(entry.data.indices.filter { $0 % 2 != 0 }, id: \.self) { index in
            let poke = entry.data[index]
            // Aquí va el contenido de tu HStack para los índices impares
            HStack(spacing: 2) {
              if let url = URL(string: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/\(poke.id).png"), let imageData = try? Data(contentsOf: url), let uiImage = UIImage(data: imageData) {
                Image(uiImage: uiImage)
                  .resizable()
                  .scaledToFit()
                  .frame(width: geometry.size.width * 0.12, height: geometry.size.width * 0.12)
                  .transition(.scale)
                  .padding(.leading, 2)
              }
              
              VStack(alignment: .leading, spacing: 0) {
                Text("\(poke.name.prefix(1).uppercased() + poke.name.dropFirst())")
                  .font(.system(size: geometry.size.width * 0.038))
                  .fontWeight(.medium)
                
                HStack{
                  Text("Lv. \(getRandomLvl())")
                    .font(.system(size: geometry.size.width * 0.03))
                    .fontWeight(.light)
                  
                  Spacer()
                  
                  getRandomGener()
                    .shadow(radius: 0)
                }//:HStack
                .padding(.trailing, 3)
              }//: VStack
              
              
              TriangleAndSquareShape()
                .fill(Color.blue)
                .frame(width: geometry.size.width * 0.1, height: geometry.size.height * 0.3)
                .shadow(radius: 0)
            }//: HStack
            .frame(width: geometry.size.width * 0.48, height: geometry.size.height * 0.3)
            .background(Color.gray.opacity(0.7).shadow(color: .black.opacity(0.5), radius: 5, x: 0, y: 5))
            .clipShape(RoundedRectangle(cornerRadius: 5))
          }//: Loop
        }//: VStack
      }//: HStack
      .frame(width: geometry.size.width, height: geometry.size.height)
      .background(
        Image("pokeball-pokemon-minimal")
          .resizable()
          .scaledToFill()
          .padding(.horizontal, geometry.size.width * -0.06)
          .padding(.vertical, geometry.size.width * -0.055)
          .ignoresSafeArea(.all)
      )
      .ignoresSafeArea(edges: .all)
    }//:GeometryReader
    .ignoresSafeArea(edges: .all)
  }
}

struct getRandomGener: View {
  let randomNumber = Double.random(in: 0...1)
  var body: some View {
    ZStack {
      Circle()
        .fill(Color.white)
        .frame(width: 15, height: 15)
      
      Circle()
        .fill((randomNumber <= 0.5 ? Color.pink : Color.blue))
        .frame(width: 13, height: 13)
      
      Text("\(randomNumber <= 0.5 ? "♁" : "♂︎" )")
        .foregroundColor(.white)
        .font(.system(size: 12))
    }//:ZStack
  }
}

struct TriangleAndSquareShape: Shape {
  func path(in rect: CGRect) -> Path {
    var path = Path()
    
    // Parte del triángulo
    path.move(to: CGPoint(x: rect.minX, y: rect.maxY))
    path.addLine(to: CGPoint(x: rect.midX, y: rect.minY))
    path.addLine(to: CGPoint(x: rect.maxX, y: rect.maxY))
    path.closeSubpath()
    
    // Parte del cuadrado
    path.addRect(CGRect(x: rect.midX, y: rect.minY, width: rect.width / 2, height: rect.height))
    
    return path
  }
}

struct PokeFavorites: Widget {
  let kind: String = "PokeFavorites"
  
  var body: some WidgetConfiguration {
    AppIntentConfiguration(kind: kind, intent: ConfigurationAppIntent.self, provider: Provider()) { entry in
      PokeFavoritesEntryView(entry: entry)
        .containerBackground(.fill.tertiary, for: .widget)
    }
    .configurationDisplayName("Favorites Pokemons List")
    .description("Pick your favorite pokemons since the app.")
    .supportedFamilies([.systemMedium])
  }
}


extension ConfigurationAppIntent {
  fileprivate static var smiley: ConfigurationAppIntent {
    let intent = ConfigurationAppIntent()
    //    intent.favoriteEmoji = "😀"
    return intent
  }
  
  fileprivate static var starEyes: ConfigurationAppIntent {
    let intent = ConfigurationAppIntent()
    //    intent.favoriteEmoji = "🤩"
    return intent
  }
}

#Preview(as: .systemSmall) {
  PokeFavorites()
} timeline: {
  SimpleEntry(date: .now, configuration: .smiley, data: samplePokeFav)
  SimpleEntry(date: .now, configuration: .starEyes, data: samplePokeFavHalf)
}
