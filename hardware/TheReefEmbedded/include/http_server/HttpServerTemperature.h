#ifndef HTTP_SERVER_TEMPERATURE_H
#define HTTP_SERVER_TEMPERATURE_H

#include <http_server/HttpServerBase.h>

class HttpServerTemperature : public HttpServerBase
{
private:
    String _sensorId;

public:
    HttpServerTemperature(String host, String secretKey, String sensorId, String path);
    void sendCurrentTemperature(float temperature);
};

#endif