#include "http_server/HttpServerBase.h"

HttpServerBase::HttpServerBase(String host, String secretKey, String path)
    : _host(host), _secretKey(secretKey), _path(path) {}

HTTPClient HttpServerBase::setupHttps()
{   
    HTTPClient https;
    WiFiClientSecure client = _wiFiHandler->getClient();
    client.setInsecure();
    https.begin(client, _host + _path);
    https.addHeader("Content-Type", "application/json");
    https.addHeader("Authorization", _secretKey);
    return https;
}

bool HttpServerBase::isConnected()
{
    return _wiFiHandler->isConnected();
}

void HttpServerBase::setWiFiHandler(WiFiHandler *wiFiHandler)
{
    _wiFiHandler = wiFiHandler;
}