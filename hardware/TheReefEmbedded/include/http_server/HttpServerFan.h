#ifndef HTTP_SERVER_FAN_H
#define HTTP_SERVER_FAN_H

#include <http_server/HttpServerBase.h>

class HttpServerFan: public HttpServerBase {
private:
    String _fanId;

public:
    HttpServerFan(String host, String secretKey,  String fanId, String path);
    void sendFanStatusOn();
    void sendFanStatusOff();
};

#endif