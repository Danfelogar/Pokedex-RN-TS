package com.pokedexdevdanfelogar; // your domain here its the same name of the folder MainApplication.java

import com.facebook.react.modules.network.OkHttpClientFactory;
import com.facebook.react.modules.network.OkHttpClientProvider;
import okhttp3.CertificatePinner;
import okhttp3.OkHttpClient;

public class SSLPinningFactory implements OkHttpClientFactory {
   private static String hostname = "pokeapi.co";

   public OkHttpClient createNewNetworkModuleClient() {

      CertificatePinner certificatePinner = new CertificatePinner.Builder()
        .add(hostname, "sha256/eVr/eyROosdTqxrORu3/RD5wbJcsquAF6L2Qj4Q2cRw=")
        .build();

      OkHttpClient.Builder clientBuilder = OkHttpClientProvider.createClientBuilder();
      return clientBuilder.certificatePinner(certificatePinner).build();
  }
}