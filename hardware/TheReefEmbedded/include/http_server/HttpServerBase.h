#ifndef HTTP_SERVER_BASE_H
#define HTTP_SERVER_BASE_H

#include <Arduino.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>
#include <WiFiHandler.h>
#include <ArduinoJson.h>

class HttpServerBase
{
private:
    String _host;
    String _secretKey;
    String _path;
    WiFiHandler* _wiFiHandler;

protected:
    HTTPClient setupHttps();
    bool isConnected();

public:
    HttpServerBase(String host, String secretKey, String path);
    void setWiFiHandler(WiFiHandler* wiFiHandler);
};

#endif