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
    _sensors.requestTemperatures();
    float currentTemp = _sensors.getTempCByIndex(0);

    Serial.println("Temperatura lida: " + String(currentTemp));

    return currentTemp;
}

