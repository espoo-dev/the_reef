#include "http_server/HttpServerTemperature.h"

HttpServerTemperature::HttpServerTemperature(String host, String secretKey) : HttpServerBase(host, secretKey) {}

void HttpServerTemperature::sendCurrentTemperature(float temperature)
{
    Serial.println("==================");
    Serial.println("Enviado temperatura: " + String(temperature));
    // HTTPClient https = setupHttps();

    // String requestBody = "{\"newValue\":\"" + String(temperature) + "\", \"indicatorId\":\"1\"}";

    // int httpResponseCode = https.PUT(requestBody);
    // Serial.print(requestBody);
    // Serial.print("HTTP Response code: ");
    // Serial.println(httpResponseCode);
    // https.end();
}