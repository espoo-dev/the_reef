#ifndef HTTP_SERVER_BUOY_H
#define HTTP_SERVER_BUOY_H

#include <http_server/HttpServerBase.h>

class HttpServerBuoy: public HttpServerBase {

public:
    HttpServerBuoy(String host, String secretKey);
    void sendBuoyActive();
    void sendBuoyInactive();
};

#endif