#ifndef HTTP_SERVER_WATER_PUMP_H
#define HTTP_SERVER_WATER_PUMP_H

#include <http_server/HttpServerBase.h>

class HttpServerWaterPump : public HttpServerBase
{
private:
    String _waterPumpId;

public:
    HttpServerWaterPump(String host, String secretKey, String waterPumpId, String path);
    void sendWaterPumpStatusOn();
    void sendWaterPumpStatusOff();
};

#endif