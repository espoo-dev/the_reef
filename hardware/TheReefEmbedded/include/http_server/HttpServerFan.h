#ifndef HTTP_SERVER_FAN_H
#define HTTP_SERVER_FAN_H

#include <http_server/HttpServerBase.h>

class HttpServerFan: public HttpServerBase {

public:
    HttpServerFan(String host, String secretKey, WiFiClient client);
    void sendFanStatusOn();
    void sendFanStatusOff();
};

#endif