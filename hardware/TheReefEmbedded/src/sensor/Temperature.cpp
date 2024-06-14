#include <sensor/Temperature.h>

SensorTemperature::SensorTemperature(int pin) : _pin(pin), _oneWire(OneWire()), _sensors(DallasTemperature()){};

void SensorTemperature::begin()
{
    pinMode(_pin, INPUT);
    _oneWire.begin(_pin);
    _sensors.begin();
}

float SensorTemperature::readCelsiusTemperature()
{
    _sensors.requestTemperatures();
    return roundf(_sensors.getTempCByIndex(0));
}
