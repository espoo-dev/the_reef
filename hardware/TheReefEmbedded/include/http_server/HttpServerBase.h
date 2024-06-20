#ifndef HTTP_SERVER_BASE_H
#define HTTP_SERVER_BASE_H

#include <Arduino.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>
#include <WiFiManager.h>

class HttpServerBase
{
private:
    String _host;
    String _secretKey;
    WiFiClientSecure _client;


public:
    HTTPClient setupHttps(String path);
    HttpServerBase(String host, String secretKey);
    void setWiFiClientSecure(WiFiClientSecure client);
};

#endif