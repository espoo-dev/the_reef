#ifndef HTTP_SERVER_TEMPERATURE_H
#define HTTP_SERVER_TEMPERATURE_H

#include <Arduino.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>

class HttpServerTemperature {
private:
   String  _host;
   String _secretKey;
   WiFiClient _client;

   HTTPClient setupHttp();

public:
    HttpServerTemperature(String secretKey, WiFiClient client);
    void sendCurrentTemperature(float temperature);
};

#endif