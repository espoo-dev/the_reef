#include "http_server/HttpServerBase.h"

HttpServerBase::HttpServerBase(String host, String secretKey)
    : _host(host), _secretKey(secretKey) {}

HTTPClient HttpServerBase::setupHttps(String path)
{   
    HTTPClient https;
    WiFiClientSecure client = _wiFiHandler->getClient();
    client.setInsecure();
    https.begin(client, _host + path);
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