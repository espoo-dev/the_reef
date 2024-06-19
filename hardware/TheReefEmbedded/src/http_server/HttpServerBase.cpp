#include "http_server/HttpServerBase.h"

HttpServerBase::HttpServerBase(String host, String secretKey, WiFiClient client)
    : _host(host), _secretKey(secretKey), _client(client) {}

HTTPClient HttpServerBase::setupHttp(String path) {
    HTTPClient http;
    http.begin(_client, _host + path);
    http.addHeader("Content-Type", "application/json");
    http.addHeader("Authorization", "Bearer " + _secretKey);
    return http;
}