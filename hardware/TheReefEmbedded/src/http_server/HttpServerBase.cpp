#include "http_server/HttpServerBase.h"

HttpServerBase::HttpServerBase(String host, String secretKey)
    : _host(host), _secretKey(secretKey) {}

HTTPClient HttpServerBase::setupHttps(String path)
{
    HTTPClient https;
    _client.setInsecure();
    https.begin(_client, _host + path);
    https.addHeader("Content-Type", "application/json");
    https.addHeader("Authorization", _secretKey);
    return https;
}
void HttpServerBase::setWiFiClientSecure(WiFiClientSecure client)
{
    _client = client;
}