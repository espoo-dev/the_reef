#ifndef HTTP_SERVER_BUOY_H
#define HTTP_SERVER_BUOY_H

#include <Arduino.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>

class HttpServerBuoy {
private:
   String  _host;
   String _secretKey;
   WiFiClient _client;

   HTTPClient setupHttp();

public:
    HttpServerBuoy(String secretKey, WiFiClient client);
    void sendBuoyStatusOn();
    void sendBuoyStatusOff();
};

#endif