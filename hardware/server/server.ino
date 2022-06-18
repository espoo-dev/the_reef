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

#ifndef STASSID
#define STASSID "ssid"
#define STAPSK  "password"
#endif

const char* ssid = STASSID;
const char* password = STAPSK;
String host = "http://myreef2.herokuapp.com/";
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
}

void sendPost() {
  if (!sended) {
    WiFiClient client;
    HTTPClient http;
    http.begin(client, host + "/sensor/1/update");
    http.addHeader("Content-Type", "application/json");
    http.addHeader("Accept", "application/json");
    http.addHeader("Authorization", "Token token=f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8");
    int httpResponseCode = http.POST("{\"value\":\"20\"}");
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    http.end();
    sended = true;
  }
}

void loop() {

 if (WiFi.status() == WL_CONNECTED && !sended) {
  sendPost();
 }
  
}
