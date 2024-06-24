#include "WiFiHandler.h"

WiFiHandler::WiFiHandler(uint8_t pin_reset) : _wifiManager(WiFiManager()), _client(WiFiClientSecure()), _PIN_RESET_WIFI(pin_reset) {}

bool WiFiHandler::begin()
{
    _wifiManager.setConnectTimeout(60000);
    _wifiManager.setConfigPortalBlocking(false);
    bool res = _wifiManager.autoConnect("TheReefConnectAP", "password");

    pinMode(_PIN_RESET_WIFI, INPUT_PULLUP);

    if (res)
    {
        Serial.println("connected...");
    }

    return res;
}

void WiFiHandler::disconnect()
{
    static bool disconnected = false;

    if (!disconnected)
    {
        Serial.println("Desconectando");
        _wifiManager.resetSettings();
        disconnected = true;
        delay(100);
        ESP.restart();
    }
}

bool WiFiHandler::isConnected()
{
    return WiFi.status() == WL_CONNECTED;
}

void WiFiHandler::process()
{
    _wifiManager.process();
}

void WiFiHandler::checkResetWifi()
{
    int pinState = digitalRead(_PIN_RESET_WIFI);

    if (pinState == LOW)
    {
        delay(100); // debounce
        int pinStateAfterDelay = digitalRead(_PIN_RESET_WIFI);
        if (pinStateAfterDelay == LOW)
        {
            disconnect();
        }
    }
}

WiFiClientSecure &WiFiHandler::getClient()
{
    return _client;
}
