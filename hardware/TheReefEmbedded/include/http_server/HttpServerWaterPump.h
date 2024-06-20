#ifndef HTTP_SERVER_WATER_PUMP_H
#define HTTP_SERVER_WATER_PUMP_H

#include <http_server/HttpServerBase.h>

class HttpServerWaterPump: public HttpServerBase {

public:
    HttpServerWaterPump(String host, String secretKey);
    void sendWaterPumpStatusOn();
    void sendWaterPumpStatusOff();
};

#endif