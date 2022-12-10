/*
    HTTP over TLS (HTTPS) example sketch

    This example demonstrates how to use
    WiFiClientSecure class to access HTTPS API.
    We fetch and display the status of
    esp8266/Arduino project continuous integration
    build.

    Created by Ivan Grokhotkov, 2015.
    This example is in public domain.
*/

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <OneWire.h>
#include <DallasTemperature.h>

#ifndef STASSID
#define STASSID "****"
#define STAPSK  "****"
#endif

const char* ssid = STASSID;
const char* password = STAPSK;
String host = "https://myreef.fly.dev";

// D4 = GPIO2
const int oneWireBus = 2;

// Setup a oneWire instance to communicate with any OneWire devices
OneWire oneWire(oneWireBus);

// Pass our oneWire reference to Dallas Temperature sensor 
DallasTemperature sensors(&oneWire);

bool sended = false;

void setup() {
  Serial.begin(115200);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.println(host);

  // Set time via NTP, as required for x.509 validation
  configTime(3 * 3600, 0, "pool.ntp.org", "time.nist.gov");

  Serial.print("Waiting for NTP time sync: ");
  time_t now = time(nullptr);
  while (now < 8 * 3600 * 2) {
    delay(500);
    Serial.print(".");
    now = time(nullptr);
  }
  Serial.println("");
  struct tm timeinfo;
  gmtime_r(&now, &timeinfo);
  Serial.print("Current time: ");
  Serial.print(asctime(&timeinfo));

  // Start the DS18B20 sensor
  sensors.begin();
}

void sendPost(float temperature) {
//  if (!sended) {
    WiFiClientSecure client;
    client.setInsecure(); //the magic line, use with caution
    HTTPClient https;
    https.begin(client, "https://myreef.fly.dev/indicators/update");
    https.addHeader("Content-Type", "application/json");
//    http.addHeader("Accept", "application/json");
//    http.addHeader("Authorization", "Token token=f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8");

//    String requestBody = "{\"newValue\":\"22\", \"indicatorId\":\"1\"}";

    String requestBody = "{\"newValue\":\"" + String(temperature) + "\", \"indicatorId\":\"1\"}";
    
    int httpResponseCode = https.PUT(requestBody);
    Serial.print(requestBody);
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    https.end();
//    sended = true;
//  }
}

void loop() {

 sensors.requestTemperatures(); 
 float temperatureC = sensors.getTempCByIndex(0);
 float temperatureF = sensors.getTempFByIndex(0);
 Serial.print(temperatureC);
 Serial.println("ºC");

 if (WiFi.status() == WL_CONNECTED) {
  sendPost(temperatureC);
 }

 delay(120000);
  
}
