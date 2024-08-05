#include "WiFiHandler.h"

const unsigned long TIMEOUT_IN_SECOND = 60;

void saveConfigCallback()
{
    delay(100);
    ESP.restart();
}

WiFiHandler::WiFiHandler(uint8_t pin_reset) : _wifiManager(WiFiManager()), _client(WiFiClientSecure()), _PIN_RESET_WIFI(pin_reset) {}

void WiFiHandler::begin()
{
    _lcdManager->printTextAtTop("CONFIGURANDO WIFI...");
    delay(1000);
    pinMode(_PIN_RESET_WIFI, INPUT_PULLUP);
    checkResetWifi();

    _wifiManager.setConnectTimeout(TIMEOUT_IN_SECOND);
    _wifiManager.setConfigPortalBlocking(false);
    _wifiManager.setSaveConfigCallback(saveConfigCallback);
    _wifiManager.autoConnect("TheReefConnectAP", "password");
}

void WiFiHandler::disconnect()
{
    static bool disconnected = false;

    if (!disconnected)
    {
        _lcdManager->printTextAtTop("RESETANDO WIFI CONFIG!");
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

void WiFiHandler::printCurrentWifiStatusOnLcd()
{
    if (isConnected())
    {
        String wifiName = _wifiManager.getWiFiSSID();
        String localIp = WiFi.localIP().toString();
        _lcdManager->printTextAtTop("WIFI CONECTADA: " + wifiName);
        _lcdManager->printTextOnBottom("ENDERECO DE IP: " + localIp);
    }
    else
    {
        _lcdManager->printTextAtTop("WIFI NAO CONECTADA");
        _lcdManager->printTextAtTop("ACESSE A REDE TheReefConnectAP COM SENHA password E CONFIGURE SUA REDE");
    }
}

void WiFiHandler::setLcdManager(LcdManager *LcdManager)
{
    _lcdManager = LcdManager;
}

WiFiClientSecure &WiFiHandler::getClient()
{
    return _client;
}
