#ifndef HTTP_SERVER_BASE_H
#define HTTP_SERVER_BASE_H

#include <Arduino.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>

class HttpServerBase {
private:
   String  _host;
   String _secretKey;
   WiFiClient _client;

   virtual HTTPClient setupHttp(String path);

public:
    HttpServerBase(String host, String secretKey, WiFiClient client);
};

#endif