#ifndef WIFI_HANDLER_H
#define WIFI_HANDLER_H

#include <ESP8266WiFi.h>
#include <WiFiManager.h>
#include "LcdManager.h"

class WiFiHandler {
private:
    WiFiManager _wifiManager;
    WiFiClientSecure _client;
    uint8_t _PIN_RESET_WIFI;
    LcdManager* _lcdManager;

public:
    WiFiHandler(uint8_t PIN_RESET_WIFI);
    void begin();
    void disconnect();
    bool isConnected();
    void process();
    void checkResetWifi();
    void printCurrentWifiStatusOnLcd();
    void setLcdManager(LcdManager *LcdManager);
    WiFiClientSecure& getClient();
};

#endif
