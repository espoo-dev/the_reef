#ifndef TEMPERATURE_SENSOR_H
#define TEMPERATURE_SENSOR_H

#include <Arduino.h>
#include <OneWire.h>
#include <DallasTemperature.h>

class SensorTemperature {
public:
    SensorTemperature(int pin);
    void begin();
    float readCelsiusTemperature();

private:
    int _pin;
    OneWire _oneWire;
    DallasTemperature _sensors;
};

#endif  // TEMPERATURE_SENSOR_H
