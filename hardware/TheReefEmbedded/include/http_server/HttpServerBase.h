#ifndef HTTP_SERVER_BASE_H
#define HTTP_SERVER_BASE_H

#include <Arduino.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>
#include <WiFiHandler.h>

class HttpServerBase
{
private:
    String _host;
    String _secretKey;
    WiFiHandler* _wiFiHandler;

protected:
    HTTPClient setupHttps(String path);
    bool isConnected();

public:
    HttpServerBase(String host, String secretKey);
    void setWiFiHandler(WiFiHandler* wiFiHandler);
};

#endif