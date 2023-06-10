#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <OneWire.h>
#include <DallasTemperature.h>

#ifndef STASSID
#define STASSID "****"
#define STAPSK  "****"
#define SECRET "****"
#endif

const char* ssid = STASSID;
const char* password = STAPSK;
const char* secretKey = SECRET;
const int minuteInMilis = 60000;
const int minutes = 5;

const float maxTemperature = 28 ;
const float idealTemperature = 27;

String host = "https://myreef.fly.dev";


// D4 = GPIO2
const int oneWireBus = 2;

// FAN CONFIG
// D7 = GPI13
const int fanPin = 13;

// D8 = GPI15
const int fanPinForce = 15;

bool fanOn = false;

// Setup a oneWire instance to communicate with any OneWire devices
OneWire oneWire(oneWireBus);

// Pass our oneWire reference to Dallas Temperature sensor 
DallasTemperature sensors(&oneWire);

bool sended = false;

void setup() {
  // preparing GPIOs
  pinMode(fanPin, OUTPUT);
  digitalWrite(fanPin, LOW);

  pinMode(fanPinForce, OUTPUT);
  digitalWrite(fanPinForce, LOW);
  
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

  // Start the DS18B20 sensor
  sensors.begin();
}

void sendPost(float temperature) {
    WiFiClientSecure client;
    client.setInsecure(); //the magic line, use with caution
    HTTPClient https;
    https.begin(client, "https://myreef.fly.dev/indicators/update");
    https.addHeader("Content-Type", "application/json");
    https.addHeader("authorization", secretKey);

    String requestBody = "{\"newValue\":\"" + String(temperature) + "\", \"indicatorId\":\"1\"}";
    
    int httpResponseCode = https.PUT(requestBody);
    Serial.print(requestBody);
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    https.end();
}

void changeFanStatus() {
    WiFiClientSecure client;
    client.setInsecure(); //the magic line, use with caution
    HTTPClient https;
    https.begin(client, "https://myreef.fly.dev/fans/update_on");
    https.addHeader("Content-Type", "application/json");
    https.addHeader("authorization", secretKey);

    char requestBody[50];  // Ajuste o tamanho do array conforme necessário

    strcpy(requestBody, "{\"on\":\"");
    strcat(requestBody, fanOn ? "true" : "false");  // Converter booleano em string
    strcat(requestBody, "\", \"fanId\":\"1\"}");
    
    int httpResponseCode = https.PUT(requestBody);
    Serial.print(requestBody);
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    https.end();
}

void checkToggleFan(float temperature) {

  if (fanOn) {
    Serial.println("FAN ON!");
  }
  
  if (fanOn && temperature <= idealTemperature) {
    digitalWrite(fanPin, LOW);
    digitalWrite(fanPinForce, LOW);
    fanOn = false;
    changeFanStatus();
    Serial.println("Desligou a fan");
    return;
  }

  if (temperature > maxTemperature) {
    digitalWrite(fanPin, HIGH);
    delay(5000);
    digitalWrite(fanPinForce, HIGH);
    fanOn = true;
    changeFanStatus();
    Serial.println("Ligou a fan");
    return;
  }
}

void loop() {

 sensors.requestTemperatures(); 
 float temperatureC = sensors.getTempCByIndex(0);
 Serial.print(temperatureC);
 Serial.println("ºC");

 if (WiFi.status() == WL_CONNECTED) {
  sendPost(temperatureC); 
 }

 checkToggleFan(temperatureC);

 delay(minutes * minuteInMilis);
}
