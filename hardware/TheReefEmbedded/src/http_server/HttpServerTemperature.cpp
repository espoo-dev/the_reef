#include "http_server/HttpServerTemperature.h"

HttpServerTemperature::HttpServerTemperature(String secretKey, WiFiClient client)
{
    _host = "https://myreef.fly.dev/indicators/update";
}

HTTPClient HttpServerTemperature::setupHttp()
{
    HTTPClient https;
    https.begin(_client, _host);
    https.addHeader("Content-Type", "application/json");
    https.addHeader("authorization", _secretKey);

    return https;
}

void HttpServerTemperature::sendCurrentTemperature(float temperature)
{
    Serial.println("==================");
    Serial.println("Enviado temperatura: " + String(temperature));
    // HTTPClient https = setupHttp();

    // String requestBody = "{\"newValue\":\"" + String(temperature) + "\", \"indicatorId\":\"1\"}";

    // int httpResponseCode = https.PUT(requestBody);
    // Serial.print(requestBody);
    // Serial.print("HTTP Response code: ");
    // Serial.println(httpResponseCode);
    // https.end();
}