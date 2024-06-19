#include "http_server/HttpServerTemperature.h"

HttpServerTemperature::HttpServerTemperature(String host, String secretKey, WiFiClient client) : HttpServerBase(host, secretKey, client) {}

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