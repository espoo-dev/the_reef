#include <sensor/Temperature.h>

SensorTemperature::SensorTemperature(int pin) : _pin(pin), _oneWire(OneWire()){};

void SensorTemperature::begin()
{
    _oneWire.begin(_pin);
    _sensors = DallasTemperature(&_oneWire);
    _sensors.begin();
}

float SensorTemperature::readCelsiusTemperature()
{
    if (!isSensorConnected())
    {
        return 0;
    }

    _sensors.requestTemperatures();
    float currentTemp = _sensors.getTempCByIndex(0);

    Serial.println("Temperatura lida: " + String(currentTemp));

    return currentTemp;
}

bool SensorTemperature::isSensorConnected()
{
    bool isConnected = _sensors.getDeviceCount() > 0;
    Serial.print("isConnected: ");
    Serial.println(isConnected);
    if (!isConnected)
    {
        Serial.println("Nenhum dispositivo DS18B20 encontrado! Verifique a conexão.");
        delay(1000);
    }

    return isConnected;
}
