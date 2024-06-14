#ifndef HTTP_SERVER_FAN_H
#define HTTP_SERVER_FAN_H

#include <Arduino.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>

class HttpServerFan {
private:
   String  _host;
   String _secretKey;
   WiFiClient _client;

   HTTPClient setupHttp();

public:
    HttpServerFan(String secretKey, WiFiClient client);
    void sendFanStatusOn();
    void sendFanStatusOff();
};

#endif