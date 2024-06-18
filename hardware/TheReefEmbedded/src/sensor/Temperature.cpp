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
    return roundf(_sensors.getTempCByIndex(0));
}

bool SensorTemperature::isSensorConnected()
{
    bool isConected = _sensors.getDeviceCount() > 0;
    Serial.print("isConected");
    Serial.println(isConected);
    if (!isConected)
    {
        Serial.println("Nenhum dispositivo DS18B20 encontrado! Verifique a conexão.");
        delay(1000);
    }

    return isConected;
}
