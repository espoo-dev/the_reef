#ifndef WIFI_HANDLER_H
#define WIFI_HANDLER_H

#include <ESP8266WiFi.h>
#include <WiFiManager.h>

class WiFiHandler {
private:
    WiFiManager _wifiManager;
    WiFiClient _client;

public:
    WiFiHandler();
    bool begin();
    void disconnect();
    bool isConnected();
    String getLocalIp();
    WiFiClient& getClient();
};

#endif
