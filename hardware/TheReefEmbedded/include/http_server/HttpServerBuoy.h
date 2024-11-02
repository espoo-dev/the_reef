#ifndef HTTP_SERVER_BUOY_H
#define HTTP_SERVER_BUOY_H

#include <http_server/HttpServerBase.h>

class HttpServerBuoy: public HttpServerBase {
private:
    String _buoyId;

public:
    HttpServerBuoy(String host, String secretKey, String buoyId, String path);
    void sendBuoyActive();
    void sendBuoyInactive();
};

#endif