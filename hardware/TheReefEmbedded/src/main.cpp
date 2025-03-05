#include <Arduino.h>
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
#include <http_server/HttpServerWaterPump.h>
#include <LcdManager.h>

#define SECRET "iuryreefsecretkey"

const char *secretKey = SECRET;
/*
aquario de agua doce:
minTemperature = 26;
maxTemperature = 29;

aquario de agua salgada?
minTemperature = 27;
maxTemperature = 28;
*/
const float minTemperature = 27;
const float maxTemperature = 28;

const String HOST = "https://myreef.onrender.com";

const int PIN_TEMPERATURE = D4;
const int PIN_BUOY = D5;
const int PIN_BUTTON_RESET_WIFI = D6;
const int PIN_FAN = D7;
// const int PIN_WATER_PUMP = D8;

SensorTemperature sensorTemperatureDS18B20(PIN_TEMPERATURE);
SensorBuoy sensorBuoy(PIN_BUOY);
ActuatorFan actuatorFan(PIN_FAN);
// ActuatorWaterPump actuatorWaterPump(PIN_WATER_PUMP);

WiFiHandler wiFiHandler(PIN_BUTTON_RESET_WIFI);

TemperatureManager temperatureManager(minTemperature, maxTemperature);
WaterLevelManager waterLevelManager;

HttpServerFan httpServerFan(HOST, secretKey, "14", "/fans/update_on");
HttpServerTemperature httpServerTemperature(HOST, secretKey, "5", "/indicators/update");
HttpServerBuoy httpServerBuoy(HOST, secretKey, "15", "/buoys/update");
HttpServerWaterPump httpServerWaterPump(HOST, secretKey, "15", "/fans/update_on"); // no sevidor aparece como boia, pois é o sensor da boia que envia para o  servidor da bomba

LcdManager lcdManager;

bool sended = false;

void setup()
{

  Serial.begin(115200);
  Serial.println();
  Serial.print("Connecting to ");
  lcdManager.begin();

  wiFiHandler.setLcdManager(&lcdManager);
  wiFiHandler.begin();
  wiFiHandler.printCurrentWifiStatusOnLcd();

  httpServerBuoy.setWiFiHandler(&wiFiHandler);
  httpServerFan.setWiFiHandler(&wiFiHandler);
  httpServerTemperature.setWiFiHandler(&wiFiHandler);
  httpServerWaterPump.setWiFiHandler(&wiFiHandler);

  // Start the DS18B20 sensor
  sensorTemperatureDS18B20.begin();
  sensorBuoy.begin();
  actuatorFan.begin();
  // actuatorWaterPump.begin();

  lcdManager.printTextAtTop("Configurando temperatura");
  temperatureManager.setActuatorFan(&actuatorFan);
  temperatureManager.setTemperatureSensor(&sensorTemperatureDS18B20);
  temperatureManager.setHttpServerFan(&httpServerFan);
  temperatureManager.setHttpServerTemperature(&httpServerTemperature);
  temperatureManager.setLcdManager(&lcdManager);
  temperatureManager.begin();

  lcdManager.printTextAtTop("Configurando nivel");
  // waterLevelManager.setActuatorWaterPump(&actuatorWaterPump); não ta sendo usado por hora
  waterLevelManager.setSensorBuoy(&sensorBuoy);
  // waterLevelManager.setHttpServerBuoy(&httpServerBuoy); não ta sendo usado por hora
  waterLevelManager.setHttpServerWaterPump(&httpServerWaterPump);

  waterLevelManager.begin();
  lcdManager.printTextAtTop("Finalizado");
}

void loop()
{
  wiFiHandler.process();
  wiFiHandler.checkResetWifi();
  temperatureManager.handlerTemperature();
  temperatureManager.printCurrentTemperatureOnLcd();
  waterLevelManager.handlerWaterLevel();
}
