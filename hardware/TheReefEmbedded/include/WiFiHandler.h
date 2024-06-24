#ifndef WIFI_HANDLER_H
#define WIFI_HANDLER_H

#include <ESP8266WiFi.h>
#include <WiFiManager.h>

class WiFiHandler {
private:
    WiFiManager _wifiManager;
    WiFiClientSecure _client;
    uint8_t _PIN_RESET_WIFI;

public:
    WiFiHandler(uint8_t PIN_RESET_WIFI);
    bool begin();
    void disconnect();
    bool isConnected();
    void process();
    void checkResetWifi();
    WiFiClientSecure& getClient();
};

#endif
