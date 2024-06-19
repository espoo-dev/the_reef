#ifndef HTTP_SERVER_TEMPERATURE_H
#define HTTP_SERVER_TEMPERATURE_H

#include <http_server/HttpServerBase.h>

class HttpServerTemperature: public HttpServerBase {

public:
    HttpServerTemperature(String host, String secretKey, WiFiClient client);
    void sendCurrentTemperature(float temperature);
};

#endif