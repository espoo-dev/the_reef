#include <Arduino.h>
#include <ESP8266HTTPClient.h>
#include <LiquidCrystal_I2C.h>
#include <sensor/Temperature.h>
#include <sensor/Buoy.h>
#include <actuator/Fan.h>
#include <actuator/WaterPump.h>
#include <WiFiHandler.h>
#include <TemperatureManager.h>
#include <WaterLevelManager.h>
#include <http_server/HttpServerFan.h>
#include <http_server/HttpServerTemperature.h>
#include <http_server/HttpServerBuoy.h>
#include <LcdManager.h>

#define SECRET "****"

const char *secretKey = SECRET;

const float minTemperature = 23;
const float maxTemperature = 28;

String host = "https://myreef.fly.dev";

const int PIN_TEMPERATURE = D4;
const int PIN_BUOY = D5;
const int PIN_FAN = D7;
const int PIN_WATER_PUMP = D8;

SensorTemperature sensorTemperatureDS18B20(PIN_TEMPERATURE);
SensorBuoy sensorBuoy(PIN_BUOY);
ActuatorFan actuatorFan(PIN_FAN);
ActuatorWaterPump actuatorWaterPump(PIN_WATER_PUMP);

WiFiClient client;
WiFiHandler wiFiHandler;

TemperatureManager temperatureManager(minTemperature, maxTemperature);
WaterLevelManager waterLevelManager;

HttpServerFan httpServerFan(secretKey, client);
HttpServerTemperature httpServerTemperature(secretKey, client);
HttpServerBuoy httpServerBuoy(secretKey, client);

LcdManager lcdManager;

bool sended = false;

void setup()
{
  Serial.begin(115200);
  Serial.println();
  Serial.print("Connecting to ");

  // wiFiHandler.begin();

  Serial.println(host);

  // Start the DS18B20 sensor
  sensorTemperatureDS18B20.begin();
  sensorBuoy.begin();
  actuatorFan.begin();
  lcdManager.begin();
  actuatorWaterPump.begin();

  temperatureManager.setActuatorFan(&actuatorFan);
  temperatureManager.setTemperatureSensor(&sensorTemperatureDS18B20);
  temperatureManager.setHttpServerFan(&httpServerFan);
  temperatureManager.setHttpServerTemperature(&httpServerTemperature);
  temperatureManager.setLcdManager(&lcdManager);

  waterLevelManager.setActuatorWaterPump(&actuatorWaterPump);
  waterLevelManager.setSensorBuoy(&sensorBuoy);
  waterLevelManager.setHttpServerBuoy(&httpServerBuoy);
}

void loop()
{
  temperatureManager.handlerTemperature();
  temperatureManager.printCurrentTemperatureOnLcd();
  waterLevelManager.handlerWaterLevel();
  delay(1000);
}
